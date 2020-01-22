const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const appRoot = require('app-root-path')
const locationkeyPublic = path.join(appRoot.path, '/key/ecdsa_public_key.pem')

const keyPublic = fs.readFileSync(locationkeyPublic, 'utf8')

const extractJWToken = token => {
  // console.log(token)
  const data = jwt.verify(token, keyPublic)
  return data
}

module.exports = {
  extractJWToken: extractJWToken
}
