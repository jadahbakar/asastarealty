const router = require('express').Router()
// const middleware = require('../middleware/middleware')
const auth = require('../authentication/authentication')

const postLogout = async (request, response, next) => {
  // ---ambil nilai token dari reactjs / client
  const token = request.body.token || request.query.token || request.headers.authorization // mengambil token di antara request
  const action = 'expired'
  const result = await auth.actionToken(action, token)
  console.log('TCL: postLogout -> result', result)

  response.status(200).json({
    message: result
  })
}

// router.get('/', middleware.verifyJWTMW)
router.post('/', postLogout)

module.exports = router
