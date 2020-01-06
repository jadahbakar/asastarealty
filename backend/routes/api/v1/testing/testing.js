var router = require('express').Router()
var asyncro = require('../asyncro')
var middleware = require('../middleware')

const getTesting = asyncro.asyncHandler(async (request, response, next) => {
  response.status(200).json({
    message: 'Masuk Mas'
  })
})

router.get('*', middleware.verifyJWTMW)
// router.all("*", middleware.verifyJWT_MW);
// router.post("*", middleware.verifyJWT_MW);
router.get('/', getTesting)

module.exports = router
