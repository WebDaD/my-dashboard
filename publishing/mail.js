module.exports = async function (options, data, nodemailer, moment) {
  nodemailer = (typeof nodemailer === 'undefined') ? require('nodemailer') : nodemailer
  moment = (typeof moment === 'undefined') ? require('moment') : moment

  var transporter = nodemailer.createTransport(options.mailOptions)

  let title = options.subject.replace('%DATE%', moment().format('DD.MM.YYYY'))

  let html = ''
  html += '<h1>' + title + '</h1>'
  html += '<hr/>'
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    html += '<h2>' + element.title + '</h2>'
    if (Array.isArray(element.content)) {
      html += '<ul>'
      for (let index = 0; index < element.content.length; index++) {
        const el = element.content[index]
        html += '<li>' + el + '</li>'
      }
      html += '</ul>'
    } else {
      html += '<p>' + element.content + '</p>'
    }
    html += '<hr/>'
  }

  var mailOptions = {
    from: options.from,
    to: options.to,
    subject: title,
    html: html
  }
  let info = await transporter.sendMail(mailOptions)
  return info
}
