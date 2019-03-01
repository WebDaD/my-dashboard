module.exports = async function (options, moment) {
  moment = (typeof moment === 'undefined') ? require('moment') : moment
  return moment().format(options.format)
}
