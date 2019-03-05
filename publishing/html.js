module.exports = async function (options, data, fs) {
  fs = (typeof fs === 'undefined') ? require('fs') : fs
  let html = ''
  html += '<html>'
  html += ' <head>'
  html += ' <title>' + options.title + '</title>'
  html += ' <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">'
  html += ' </head>'
  html += ' <body>'
  html += '   <div class="container">'
  html += '     <h1>' + options.title + '</h1>'
  html += '     <div class="card-columns">'
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    html += '<div class="card text-center">'
    html += ' <div class="card-header">' + element.title + '</div>'
    if (Array.isArray(element.content)) {
      html += '<ul class="list-group list-group-flush">'
      for (let index = 0; index < element.content.length; index++) {
        const el = element.content[index]
        if (typeof el.link !== 'undefined') {
          html += '<li class="list-group-item"><a href="' + el.link + '" target="_blank">' + el.content + '</a></li>'
        } else {
          html += '<li class="list-group-item">' + el.content + '</li>'
        }
      }
      html += '</ul>'
    } else {
      html += ' <div class="card-body">'
      if (typeof element.content.link !== 'undefined') {
        html += '<li class="card-text"><a href="' + element.content.link + '" target="_blank">' + element.content.content + '</a></li>'
      } else {
        html += '<li class="card-text">' + element.content.content + '</li>'
      }
      html += ' </div>'
    }
    html += '</div>'
  }
  html += '     </div>'
  html += '   </div>'
  html += ' </body>'
  html += '</html>'
  try {
    fs.writeFileSync(options.target, html)
  } catch (error) {
    throw error
  }
}
