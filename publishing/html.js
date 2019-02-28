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
    html += ' <div class="card-body">'
    html += '   <h5 class="card-title">' + element.title + '</h5>'
    html += '   <p class="card-text">' + element.content + '</p>'
    html += ' </div>'
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
