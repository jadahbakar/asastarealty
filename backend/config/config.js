
// requires
const _ = require('lodash')

// module variables
const config = require('./config.json')
const defaultConfig = config.development_home
console.log('TCL: defaultConfig', defaultConfig)

const environment = process.env.NODE_ENV || 'development_home'
console.log('TCL: environment', environment)
const environmentConfig = config[environment]

console.log('TCL: environmentConfig', environmentConfig)
const finalConfig = _.merge(defaultConfig, environmentConfig)
console.log('TCL: finalConfig', finalConfig)
// console.log('TCL: finalConfig', finalConfig)

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig

// log global.gConfig
// console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`)
