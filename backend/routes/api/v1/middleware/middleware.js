// File ini dibutuhkan oleh ./auth dan digunakan oleh proses Authentikasi

const auth = require('../authentication')
const config = require('@root/config/config')

function verifyJWTMW (request, response, next) {
  // var token = request.method === "POST" ? request.body.token : request.query.token;
  var token =
    request.body.token || request.query.token || request.headers.authorization // mengambil token di antara requestuest
  auth
    .verifyJWTToken(token)
    .then(decodedToken => {
      if (
        decodedToken.data.initial !== config.init_startup ||
        decodedToken.data.granted === undefined
      ) {
        response.status(403).json({ message: 'Invalid auth token provided.' })
      } else {
        next()
      }
    })
    .catch(err => {
      if (err) {
        response.status(403).json({ message: 'Invalid auth token provided.' })
      }
    })
}

module.exports = {
  verifyJWTMW
}
