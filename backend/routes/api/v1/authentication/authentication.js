var jwt = require('jsonwebtoken')
var _ = require('lodash')
const fs = require('fs')
const path = require('path')
var appRoot = require('app-root-path')

const locationKeySecret = path.join(appRoot.path, '/key/ecdsa_private_key.pem')
const locationkeyPublic = path.join(appRoot.path, '/key/ecdsa_public_key.pem')
var keySecret = fs.readFileSync(locationKeySecret, 'utf8')
var keyPublic = fs.readFileSync(locationkeyPublic, 'utf8')

var db = require('@db/db')

function createJWToken (details) {
  if (typeof details !== 'object') {
    details = {}
  }
  details.sessionData = _.reduce(
    details.sessionData || {},
    (memo, val, key) => {
      if (typeof val !== 'function' && key !== 'password') {
        memo[key] = val
      }
      return memo
    },
    {}
  )
  const token = jwt.sign(
    {
      data: details.sessionData
    },
    keySecret,
    {
      expiresIn: details.maxAge,
      algorithm: 'ES256'
    }
  )

  return token
}

function verifyJWTToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      keyPublic,
      (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err)
        }
        resolve(decodedToken)
      }
      // , algorithms: ['ES256'],
    )
  })
}

async function actionToken (action, token) {
  console.log('TCL: actionToken -> token', token)
  console.log('TCL: actionToken -> action', action)

  const data = db.one('SELECT log.token_action($(action), $(token))', { action, token })
  return data
}

module.exports = {
  verifyJWTToken: verifyJWTToken,
  createJWToken: createJWToken,
  actionToken
}
