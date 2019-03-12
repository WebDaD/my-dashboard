const express = require('express')
const app = express()
const server = require('http').createServer(app)

const fs = require('fs')
const path = require('path')
const util = require('util')
let dfs
let dfsReadFile

// TODO: Add dropbox Info to readme

let configFile = ''
// TODO: first try is config.json in this folder

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

let config = require(configFile)

if (config.dropbox.active) { // use dropbox-fs
  dfs = require('dropbox-fs/')({
    apiKey: config.dropbox.apiKey
  })
  dfsReadFile = util.promisify(dfs.readFile).bind(dfs)
  console.log('Using Dropbox as Filesystem')
}

server.listen(config.port)
console.log('Dashboard Service running on ' + config.port)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', async function (req, res) { 
  try {
    if (config.dropbox.active) {
      let html = await dfsReadFile(path.join(config.dataFolder, 'dashboard.html'), { encoding: 'utf8' })
      res.send(html)
    } else {
      res.sendFile(path.join(config.dataFolder, 'dashboard.html'))
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

// TODO: JSON / RSS / OLD (paths)

// TODO: add crontimer to gather/publish data