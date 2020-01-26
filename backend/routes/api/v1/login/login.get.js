var auth = require('../authentication')
// config variables
require('@root/config/config.js')

var redis = require('redis')
var clientRedis = redis.createClient()

async function createRedis (token) {
  clientRedis.set(token, token)
}

const getLogin = async (request, response, next) => {
  const payload = {
    // initial: process.env.INIT_STARTUP,
    initial: `${global.gConfig.init_startup}`,

    reqIp: request.connection.remoteAddress // ---ambil ip Address client
  }
  const token = auth.createJWToken({
    sessionData: payload,
    // maxAge: process.env.MAX_AGE_LOGIN
    maxAge: `${global.gConfig.max_age_login}`

  })
  createRedis(token)
  response.json({ token })
}

module.exports = {
  getLogin: getLogin
}
