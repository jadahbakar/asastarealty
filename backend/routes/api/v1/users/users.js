const db = require('@db/db')
const middleware = require('../middleware')
const router = require('express').Router()

const getUsers = async (request, response, next) => {
  const allUser = await db.any(
    `SELECT user_id, user_nama, user_sts, user_email, roles_name 
    FROM sec.userid 
    INNER JOIN sec.roles ON user_role = roles_id `
  )
  response.status(200).json({ allUser })
}

router.get('*', middleware.verifyJWTMW)
router.get('/', getUsers)

module.exports = router
