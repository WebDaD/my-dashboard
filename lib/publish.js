module.exports = async function (log, config, data, fs, path) {
  if (typeof log === 'undefined') {
    throw new Error('Must give a Instance of lib-log')
  }
  if (typeof config === 'undefined') {
    throw new Error('Must give a Config')
  }
  if (typeof data === 'undefined') {
    throw new Error('Must give data')
  }
  fs = (typeof fs === 'undefined') ? require('fs') : fs
  path = (typeof path === 'undefined') ? require('path') : path
  let publisher = {}
  let publisherFiles = fs.readdirSync(path.join(__dirname, '..', 'publishing'))
  for (let index = 0; index < publisherFiles.length; index++) {
    const publisherFile = publisherFiles[index]
    publisher[publisherFile.replace('.js', '')] = require(path.join(__dirname, '..', 'publishing', publisherFile))
  }
  log.info('Starting to publish data')
  for (let index = 0; index < config.publishing.length; index++) {
    const element = config.publishing[index]
    try {
      await publisher[element.type](element.options, data, config.dropbox)
      log.info('Publishing to ' + element.type + ' done.')
    } catch (error) {
      log.error('Error on Publish to ' + element.type + ': ' + error)
    }
  }
  log.info('Publishing Done')
  return true
}
