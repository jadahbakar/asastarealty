var auth = require('../authentication')

var redis = require('redis')
var clientRedis = redis.createClient()

async function createRedis (token) {
  clientRedis.set(token, token)
}

const getLogin = async (request, response, next) => {
  const payload = {
    initial: process.env.INIT_STARTUP,
    reqIp: request.connection.remoteAddress // ---ambil ip Address client
  }
  const token = auth.createJWToken({
    sessionData: payload,
    maxAge: process.env.MAX_AGE_LOGIN
  })
  createRedis(token)
  response.json({ token })
}

module.exports = {
  getLogin: getLogin
}
