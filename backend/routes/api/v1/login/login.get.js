var auth = require('../authentication')
// config variables
const config = require('@root/config/config.js')

var redis = require('redis')
var clientRedis = redis.createClient()

async function createRedis (token) {
  clientRedis.set(token, token)
}

const getLogin = async (request, response, next) => {
  const payload = {
    initial: config.init_startup,
    reqIp: request.connection.remoteAddress // ---ambil ip Address client
  }
  const token = auth.createJWToken({
    sessionData: payload,
    maxAge: config.max_age_login

  })
  createRedis(token)
  response.json({ token })
}

module.exports = {
  getLogin: getLogin
}
