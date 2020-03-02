var db = require('@db/db')
var router = require('express').Router()
var auth = require('../authentication')
const middleware = require('../middleware')
var asyncro = require('../asyncro')
// const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
var appRoot = require('app-root-path')
const ext = require('../extracttoken')

// config variables
const config = require('@root/config/config.js')

// const locationKeySecret = path.join(appRoot.path, '/key/ecdsa_private_key.pem')
const locationkeyPublic = path.join(appRoot.path, '/key/ecdsa_public_key.pem')

// var keySecret = fs.readFileSync(locationKeySecret, 'utf8')
var keyPublic = fs.readFileSync(locationkeyPublic, 'utf8')
var redis = require('redis')
var clientRedis = redis.createClient(config.redis_port, config.redis_host)
const { promisify } = require('util')
const getAsync = promisify(clientRedis.get).bind(clientRedis)

// function decrypt (transitmessage, pass) {
//   var keySize = 256
//   // var ivSize = 128
//   var iterations = 100
//   var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32))
//   var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
//   var encrypted = transitmessage.substring(64)

//   var key = CryptoJS.PBKDF2(pass, salt, {
//     keySize: keySize / 32,
//     iterations: iterations
//   })

//   var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
//     iv: iv,
//     padding: CryptoJS.pad.Pkcs7,
//     mode: CryptoJS.mode.CBC
//   })
//   return decrypted
// }

async function createRedis (token) {
  clientRedis.set(token, token)
}

const getRegistrasi = asyncro.asyncHandler(async (request, response, next) => {
  // console.log('get')
  const payload = {
    // initial: 'teknotama_',
    initial: config.init_startup,
    reqIp: request.connection.remoteAddress // ---ambil ip Address client
  }
  const token = auth.createJWToken({
    sessionData: payload,
    maxAge: config.max_age_registration
  })
  createRedis(token)
  response.json({ token })
})

const postRegistrasi = asyncro.asyncHandler(async (request, response, next) => {
  // ---ambil nilai dari body
  const {
    regNama,
    regPribadi,
    regAlamat,
    regAlamatKtp,
    regEmail,
    regPassword
  } = request.body
  // console.log(regPassword);

  // ---ambil nilai token dari reactjs / client
  const token =
    request.body.token || request.query.token || request.headers.authorization // mengambil token di antara request

  // ---Opsi JWT-Token
  const verifyOptions = {
    expiresIn: config.max_age,
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
    pesan = 'rInvalidSource'
    response.status(401).json({ message: pesan })
  } else {
    // ---pengecekan jwt-token apakah masih OK / sudah Expired
    if (responseAuth.name === 'TokenExpiredError') {
      clientRedis.del(token)
      pesan = 'TokenExpiredError'
      response.status(401).json({ message: pesan })
    } else {
      if (responseAuth.data !== null) {
        // pengecekan payload --> teknotama_ dan IP sumber harus sama
        if (
          responseAuth.data.initial === config.init_startup &&
          responseAuth.data.reqIp === request.connection.remoteAddress
        ) {
          clientRedis.del(token)
          pesan = 'TokenOK'
          // var decrypted = decrypt(regPassword, token)
          // var stringPass = decrypted.toString(CryptoJS.enc.Utf8)

          // sanitasi inputan -> clear whitespace & dash
          const regexSpace = new RegExp(' ', 'g')
          const regexMinus = new RegExp('-', 'g')
          // Generate customer id
          const awal = regNama.replace(regexSpace, '').slice(0, 7)
          const obj = JSON.parse(regPribadi)
          const tgl = obj.tanggalLahir.replace(regexMinus, '').slice(2, 8)
          const idUser = awal.toLowerCase() + tgl

          const namaUser = regNama.toUpperCase()
          // Save To DB
          // const procReg = await db.any(
          //   `INSERT INTO mst.registrasi(reg_id, reg_nama, reg_pribadi, reg_alamat, reg_alamat_ktp, reg_email, reg_password)
          //               VALUES ( $(idUser), $(namaUser), $(regPribadi), $(regAlamat), $(regAlamatKtp), $(regEmail), $(regPassword)) RETURNING  reg_id`,
          //   {
          //     idUser,
          //     namaUser,
          //     regPribadi,
          //     regAlamat,
          //     regAlamatKtp,
          //     regEmail,
          //     regPassword
          //   }
          // )
          // try {
          //   return response.status(201).send(procReg)
          // } catch (error) {
          //   return response.status(400).send(error)
          // }
          const procReg = await db.one(
            'SELECT mst.registrasi_w($(idUser), $(namaUser), $(regPribadi), $(regAlamat), $(regAlamatKtp), $(regEmail), $(regPassword)) AS resutFunc',
            {
              idUser,
              namaUser,
              regPribadi,
              regAlamat,
              regAlamatKtp,
              regEmail,
              regPassword
            }
          )
          try {
            if (JSON.parse(procReg.resutFunc).status !== 'error') {
            //   console.log('TCL: JSON.parse(procReg.status)', JSON.parse(procReg.resutFunc  ))
              return response.status(201).send(JSON.parse(procReg.resutFunc))
            } else {
              return response.status(201).send(JSON.parse(procReg.resutFunc))
            }
          } catch (error) {
            return response.status(400).send(error)
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

const getRegistrasiAll = async (request, response, next) => {
  const allRegistrasi = await db.any(
    'SELECT regall FROM mst.registrasi_get_all()'
  )
  response.status(200).send(allRegistrasi[0].regall)
}

const getRegistrasiDetail = async (request, response, next) => {
  const id = request.params.id
  const detailReg = await db.any(
    'SELECT regdetail FROM mst.registrasi_get_detail($(id))',
    { id }
  )
  response.status(200).send(detailReg[0].regdetail)
}

const postRegistrasiDetail = async (request, response, next) => {
  const { regID, regReferal } = request.body
  const token = request.headers.authorization
  const data = ext.extractJWToken(token)
  const regApprove = data.data.userId

  const procReg = await db.any(
    'SELECT mst.registrasi_to_user_customer($(regID), $(regReferal), $(regApprove)) AS status',
    { regID, regReferal, regApprove }
  )
  try {
    if (procReg !== 'error') {
      return response.status(201).send(procReg[0].status)
    } else {
      return response.status(400).send(procReg)
    }
  } catch (error) {
    return response.status(400).send(error)
  }
}

router.get('/all', middleware.verifyJWTMW)
router.get('/detail/*', middleware.verifyJWTMW)
router.post('/detail/*', middleware.verifyJWTMW)

router.get('/all', getRegistrasiAll)
router.get('/detail/:id', getRegistrasiDetail)
// Approval Registrasi User
router.post('/detail', postRegistrasiDetail)

router.get('/', getRegistrasi)
router.post('/', postRegistrasi)

module.exports = router
