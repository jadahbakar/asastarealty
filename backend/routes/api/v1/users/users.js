const db = require('@db/db')
const asyncro = require('../asyncro/asyncro')
const middleware = require('../middleware')
const router = require('express').Router()

const getUsers = asyncro.asyncHandler(async (request, response, next) => {
  const allUser = await db.any(
    `SELECT user_id, user_nama, user_sts, user_email, roles_name 
    FROM sec.userid 
    INNER JOIN sec.roles ON user_role = roles_id `
  )
  response.status(200).json({ allUser })
})

router.get('*', middleware.verifyJWTMW)
router.get('/', getUsers)
// router.post("/", postUsers);

module.exports = router
