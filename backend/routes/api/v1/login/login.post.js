const db = require('@db/db')
const auth = require('../authentication')
const asyncro = require('../asyncro')
// const router = require('express').Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const appRoot = require('app-root-path')

// const locationKeySecret = path.join(appRoot.path, '/key/ecdsa_private_key.pem')
const locationkeyPublic = path.join(appRoot.path, '/key/ecdsa_public_key.pem')

// config variables
const config = require('@root/config/config.js')

// var keySecret = fs.readFileSync(locationKeySecret, 'utf8')
const keyPublic = fs.readFileSync(locationkeyPublic, 'utf8')
const redis = require('redis')
const clientRedis = redis.createClient(config.redis_port, config.redis_host)
const { promisify } = require('util')
const getAsync = promisify(clientRedis.get).bind(clientRedis)

function decrypt (transitmessage, pass) {
  var keySize = 256
  var ivSize = 128
  var iterations = 100
  var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32))
  var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
  var encrypted = transitmessage.substring(64)

  var key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations: iterations
  })

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC

  })
  return decrypted
}

// async function createRedis (token) {
//   clientRedis.set(token, token)
// }

const postLogin = asyncro.asyncHandler(async (request, response, next) => {
  // ---ambil nilai dari body
  const { userid, userpass } = request.body
  // console.log('TCL: userid', userid)
  // console.log('TCL: request.body', request.body)
  // ---ambil nilai token dari reactjs / client
  const token =
    request.body.token || request.query.token || request.headers.authorization // mengambil token di antara request

  // ---Opsi JWT-Token
  const verifyOptions = {
    expiresIn: config.max_age_token,
    algorithm: 'ES256'
  }
  // ---Verify JWT
  let responseAuth
  try {
    responseAuth = jwt.verify(token, keyPublic, verifyOptions)
  } catch (err) {
    responseAuth = err
  }
  let pesan
  const checkRedis = await getAsync(token)
  // ---pengecekan apakah token ada di Redis

  if (checkRedis === null) {
    pesan = 'r-Invalid Source'
    response.status(401).json({ message: pesan })
  } else {
    // ---pengecekan jwt-token apakah masih OK / sudah Expired
    if (responseAuth.name === 'TokenExpiredError') {
      clientRedis.del(token)
      pesan = 'Token Expired Error'
      response.status(401).json({ message: pesan })
    } else {
      if (responseAuth.data !== null) {
        // pengecekan payload --> teknotama_ dan IP sumber harus sama
        if (
          responseAuth.data.initial === config.init_startup &&
          responseAuth.data.reqIp === request.connection.remoteAddress
        ) {
          clientRedis.del(token)
          // console.log('TCL: token', token)
          pesan = 'TokenOK'
          var decrypted = decrypt(userpass, token)
          var stringPass = decrypted.toString(CryptoJS.enc.Utf8)

          // ---Check user di DB
          const getUser = await db.oneOrNone(
            'SELECT sec.userid_login($(userid), $(stringPass))',
            { userid, stringPass }
          )

          // ---Check respon dari DB
          if (getUser === null) {
            response.status(403).json({
              message: 'Data Not Found'
            })
          } else {
            const {
              user_id: userId,
              user_nama: userNama,
              user_email: userEmail,
              user_role: userRole
            } = getUser.userid_login
            // ---Get Menu
            // let getMenu = await db.any(
            //     "SELECT sec.generate_parent(${user_role}) AS menu",
            //     { user_role }
            // );

            // if (getMenu === null) {
            //     response.status(403).json({
            //         message: 'Menu Not Found'
            //     })
            // } else {
            // ---Prepare payload for token
            const payload = {
              initial: config.init_startup,
              reqIp: request.connection.remoteAddress, // ---ambil ip Address client
              granted: 'OK',
              userId,
              userNama,
              userEmail,
              userRole
            }
            // ---Penambahan proses authentikasi token
            const createToken = auth.createJWToken({ sessionData: payload, maxAge: config.max_age_token })
            const action = 'insert'
            await auth.actionToken(action, createToken)
            // ---Create token & response to user
            response.status(200).json({
              // token: auth.createJWToken({
              //   sessionData: payload,
              //   maxAge: config.max_age_token
              // }),
              token: createToken,
              getUser
              // getMenu
            })
            // }
          }
        } else {
          pesan = 'invalid Token'
          response.status(401).json({ message: pesan })
        }
      } else {
        pesan = 'null Data'
        response.status(204).json({ message: pesan })
      }
    }
  }
})

module.exports = {
  postLogin: postLogin
}
