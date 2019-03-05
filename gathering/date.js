module.exports = async function (options, moment) {
  moment = (typeof moment === 'undefined') ? require('moment') : moment
  return {
    content: moment().format(options.format),
    link: undefined
  }
}
