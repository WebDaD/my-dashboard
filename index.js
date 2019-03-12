const express = require('express')
const app = express()
const server = require('http').createServer(app)

const fs = require('fs')

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

server.listen(config.port)
console.log('Dashboard Service running on ' + config.port)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', function (req, res) { // TODO: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
  res.json(devices.data)
})

// TODO: read /write Files from Dropbox or local system

// TODO: add crontimer to gather/publish data