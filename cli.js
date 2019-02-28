const fs = require('fs')
const path = require('path')
const moment = require('moment')
const now = moment()
const homedir = require('os').homedir()

main()

async function main () {
  let configFile = ''
  if (process.argv && process.argv.length > 2) {
    try {
      fs.accessSync(process.argv[2], fs.constants.R_OK)
      configFile = process.argv[2]
    } catch (error) {
      console.error(process.argv[2] + ' does not exist or is not readable')
      process.exit(2)
    }
  } else {
    try {
      fs.accessSync(path.join(homedir, '.my-dashboard'), fs.constants.R_OK)
      configFile = path.join(homedir, '.my-dashboard')
    } catch (error) {
      try {
        fs.accessSync('/etc/my-dashboard.json', fs.constants.R_OK)
        configFile = '/etc/my-dashboard.json'
      } catch (error) {
        try {
          fs.accessSync(process.env.MYDASHBOARD, fs.constants.R_OK)
          configFile = process.env.MYDASHBOARD
        } catch (error) {
          console.error('No Config Found!')
        }
      }
    }
  }

  let config = require(configFile)

  const Log = require('lib-log')
  const l = new Log(config.log)

  l.info('Using Config ' + configFile)

  let dataFile = path.join(path.resolve(config.dataFolder), now.format('YYYYMMDD') + '.json')
  try {
    fs.accessSync(dataFile, this.fs.constants.R_OK | this.fs.constants.W_OK)
  } catch (err) {
    try {
      fs.writeFileSync(dataFile, '[]')
    } catch (err) {
      l.error('Cannot write File ' + dataFile)
      process.exit(4)
    }
  }
  l.debug('Using dataFile ' + dataFile)

  let gatherer = {}
  let gatheringFiles = fs.readdirSync('./gathering/')
  for (let index = 0; index < gatheringFiles.length; index++) {
    const gatheringFile = gatheringFiles[index]
    gatherer[gatheringFile.replace('.js', '')] = require('./gathering/' + gatheringFile)
  }

  let publisher = {}
  let publisherFiles = fs.readdirSync('./publishing/')
  for (let index = 0; index < publisherFiles.length; index++) {
    const publisherFile = publisherFiles[index]
    publisher[publisherFile.replace('.js', '')] = require('./publishing/' + publisherFile)
  }

  l.info('Starting Data Collection')
  let data = []
  for (let index = 0; index < config.data.length; index++) {
    const element = config.data[index]
    try {
      data.push({
        title: element.title,
        content: gatherer[element.type](element.options)
      })
      l.info('Gathering of "' + element.title + '" (' + element.type + ') done')
    } catch (error) {
      l.error('Error Gathering of "' + element.title + '" (' + element.type + '): ' + error)
    }
  }
  l.info('Data Done')
  fs.writeFileSync(dataFile, JSON.stringify(data))

  l.info('Starting to publish data')

  for (let index = 0; index < config.publishing.length; index++) {
    const element = config.publishing[index]
    try {
      await publisher[element.type](element.options, data)
      l.info('Publishing to ' + element.type + ' done.')
    } catch (error) {
      l.error('Error on Publish to ' + element.type + ': ' + error)
    }
  }
  l.info('Publishing Done')
  process.exit(0)
}
