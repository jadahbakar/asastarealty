
// requires
const _ = require('lodash')
// module variables
const configJson = require('./config.json')
const defaultConfig = configJson.development_home
const environment = process.env.NODE_ENV || 'development_home'
const environmentConfig = configJson[environment]
const config = _.merge(defaultConfig, environmentConfig)
module.exports = config
