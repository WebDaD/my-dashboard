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
        if (typeof el.link !== 'undefined') {
          html += '<li><a href="' + el.link + '" target="_blank">' + el.content + '</a></li>'
        } else {
          html += '<li>' + el.content + '</li>'
        }
      }
      html += '</ul>'
    } else {
      if (typeof element.content.link !== 'undefined') {
        html += '<p><a href="' + element.content.link + '" target="_blank">' + element.content.content + '</a></p'
      } else {
        html += '<p>' + element.content.content + '</p>'
      }
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
