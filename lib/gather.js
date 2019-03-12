module.exports = async function (log, config, fs, path) {
  if (typeof log === 'undefined') {
    throw new Error('Must give a Instance of lib-log')
  }
  if (typeof config === 'undefined') {
    throw new Error('Must give a Config')
  }
  fs = (typeof fs === 'undefined') ? require('fs') : fs
  path = (typeof path === 'undefined') ? require('path') : path
  let gatherer = {}
  let gatheringFiles = fs.readdirSync(path.join(__dirname, '..', 'gathering'))
  for (let index = 0; index < gatheringFiles.length; index++) {
    const gatheringFile = gatheringFiles[index]
    gatherer[gatheringFile.replace('.js', '')] = require(path.join(__dirname, '..', 'gathering', gatheringFile))
  }
  log.info('Starting Data Collection')
  let data = []
  for (let index = 0; index < config.data.length; index++) {
    const element = config.data[index]
    try {
      let output = await gatherer[element.type](element.options)
      data.push({
        title: element.title,
        content: output
      })
      log.info('Gathering of "' + element.title + '" (' + element.type + ') done')
    } catch (error) {
      log.error('Error Gathering of "' + element.title + '" (' + element.type + '): ' + error)
    }
  }
  log.info('Data Done')
  return data
}
