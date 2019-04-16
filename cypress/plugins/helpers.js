const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('common', 'cypress', 'config', `${file}.json`)
  console.log('loading cypress config file: ', pathToConfigFile)
  return fs.readJson(pathToConfigFile)
}

export function getConfiguration (config) {
  const file = config.env.configFile || 'development'
  return getConfigurationByFile(file)
}
