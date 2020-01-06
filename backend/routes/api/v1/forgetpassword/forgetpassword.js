var db = require('@db/db')
var router = require('express').Router()
var asyncro = require('../asyncro')

const postForgetPassword = asyncro.asyncHandler(
  async (request, response, next) => {
    console.log('testing')
    const { action, status, user, jenis } = request.body
    const postActivity = await db.any(
      'SELECT trx.activity_wud($(action), $(status), $(user), $(jenis))',
      { action, status, user, jenis }
    )
    response.json(postActivity)
  }
)

router.post('/', postForgetPassword)

module.exports = router
