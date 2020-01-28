var router = require('express').Router()
var db = require('@db/db')
var asyncro = require('../asyncro')
var middleware = require('../middleware')

const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
var appRoot = require('app-root-path')
// config variables
const config = require('@root/config/config.js')

// const locationKeySecret = path.join(appRoot.path, '/key/ecdsa_private_key.pem')
const locationkeyPublic = path.join(appRoot.path, '/key/ecdsa_public_key.pem')

// var keySecret = fs.readFileSync(locationKeySecret, 'utf8')
var keyPublic = fs.readFileSync(locationkeyPublic, 'utf8')

const getHome = asyncro.asyncHandler(async (request, response, next) => {
  response.status(200).json({
    message: 'authorized'
  })
})

// const getMenu = asyncro.asyncHandler(async (request, response, next) => {
//   const userRole = request.params.userrole
//   console.log(userRole)
//   const menu = await db.any('SELECT sec.generate_parent(${userRole}) AS menu', {
//     userRole
//   })

//   menu.forEach((element, index) => {
//     if (element.menu.children === null && element.menu.name !== 'Dashboard') {
//       menu.splice(index, 1)
//     }
//   })

//   try {
//     response.json(menu)
//   } catch (error) {
//     return response.status(400).send(error)
//   }
// })

const getUserMenu = asyncro.asyncHandler(async (request, response, next) => {
  // ---ambil nilai token dari reactjs / client
  const token = request.body.token || request.query.token || request.headers.authorization // mengambil token di antara request

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
  if (responseAuth.name === 'TokenExpiredError') {
    pesan = 'TokenExpiredError'
    response.status(401).json({ message: pesan })
  } else {
    if (responseAuth.data !== null) {
      const { userRole } = responseAuth.data
      const getMenu = await db.any(
        'SELECT sec.generate_parent($(userRole)) AS menu',
        { userRole }
      )
      if (getMenu === null) {
        response.status(403).json({
          message: 'menuNotFound'
        })
      } else {
        response.status(200).json({ getMenu })
      }
    } else {
      pesan = 'nullData'
      response.status(401).json({ message: pesan })
    }
  }
})

router.get('/', middleware.verifyJWTMW)
// router.all("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);

router.get('/', getHome)
router.get('/usermenu/', getUserMenu)

module.exports = router
