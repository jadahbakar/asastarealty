const promise = require('bluebird')

// Initialization Options
const initOption = {
  promiseLib: promise
}

const pgp = require('pg-promise')(initOption)
// const pgp = require('pg-promise')();

// config variables
const config = require('../config/config.js')

// const connectionString = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// }

// const connectionString = {
//   host: `${global.gConfig.db_host}`,
//   port: `${global.gConfig.db_port}`,
//   database: `${global.gConfig.db_name}`,
//   user: `${global.gConfig.db_user}`,
//   password: `${global.gConfig.db_pass}`
// }
const connectionString = {
  host: `${config.db_host}`,
  port: `${config.db_port}`,
  database: `${config.db_name}`,
  user: `${config.db_user}`,
  password: `${config.db_pass}`
}

const db = pgp(connectionString)

module.exports = db
