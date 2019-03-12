const fs = require('fs')
const path = require('path')
const moment = require('moment')
const util = require('util')
const now = moment()
let dfs
let dfsWriteFile
let dfsReadFile
const homedir = require('os').homedir()

const gather = require('./lib/gather.js')
const publish = require('./lib/publish.js')

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
      fs.accessSync(path.join(homedir, '.my-dashboard.json'), fs.constants.R_OK)
      configFile = path.join(homedir, '.my-dashboard.json')
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

  if (config.dropbox.active) { // use dropbox-fs
    dfs = require('dropbox-fs/')({
      apiKey: config.dropbox.apiKey
    })
    dfsWriteFile = util.promisify(dfs.writeFile).bind(dfs)
    dfsReadFile = util.promisify(dfs.readFile).bind(dfs)
    l.info('Using Dropbox as Filesystem')
  }

  let dataFile = path.join(config.dataFolder, now.format('YYYYMMDD') + '.json')

  try {
    if (config.dropbox.active) { // use dropbox-fs
      await dfsReadFile(dataFile, { encoding: 'utf8' })
    } else {
      fs.accessSync(dataFile, this.fs.constants.R_OK | this.fs.constants.W_OK)
    }
  } catch (err) {
    try {
      if (config.dropbox.active) { // use dropbox-fs
        await dfsWriteFile(dataFile, '[]', { encoding: 'utf8' })
      } else {
        fs.writeFileSync(dataFile, '[]')
      }
    } catch (err) {
      l.error('Cannot write File ' + dataFile)
      process.exit(4)
    }
  }
  l.debug('Using dataFile ' + dataFile)

  let data = await gather(l, config)

  if (config.dropbox.active) { // use dropbox-fs
    await dfsWriteFile(dataFile, JSON.stringify(data), { encoding: 'utf8' })
  } else {
    fs.writeFileSync(dataFile, JSON.stringify(data))
  }

  await publish(l, config, data)

  process.exit(0)
}
