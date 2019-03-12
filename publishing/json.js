module.exports = async function (options, data, dropbox, fs, dfs, util) {
  if (dropbox.active) {
    const dfs = require('dropbox-fs/')({
      apiKey: dropbox.apiKey
    })
    util = (typeof util === 'undefined') ? require('util') : util
    await util.promisify(dfs.writeFile.bind(dfs))(options.target, JSON.stringify(data))
  } else {
    fs = (typeof fs === 'undefined') ? require('fs') : fs
    try {
      fs.writeFileSync(options.target, JSON.stringify(data))
    } catch (error) {
      throw error
    }
  }
}
