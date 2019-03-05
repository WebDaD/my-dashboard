module.exports = async function (options, data, fs) {
  fs = (typeof fs === 'undefined') ? require('fs') : fs
  try {
    fs.writeFileSync(options.target, JSON.stringify(data))
  } catch (error) {
    throw error
  }
}
