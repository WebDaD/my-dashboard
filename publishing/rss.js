module.exports = async function (options, data, fs, moment, parser) {
  fs = (typeof fs === 'undefined') ? require('fs') : fs
  moment = (typeof moment === 'undefined') ? require('moment') : moment
  parser = (typeof parser === 'undefined') ? require('fast-xml-parser') : parser

  // D, d M Y H:i:s O
  let dateFormat = 'ddd, DD MMM YYYY HH:mm:ss ZZ'

  try {
    fs.accessSync(options.target, fs.constants.R_OK | fs.constants.W_OK)
  } catch (error) {
    let rss = '<rss xmlns:content="http://purl.org/rss/1.0/modules/content/"  xmlns:webfeeds="http://webfeeds.org/rss/1.0" version="2.0">'
    rss += '  <channel>'
    rss += '  <title>' + options.title + '</title>'
    rss += '  <link>' + options.link + '</link>'
    rss += '  <description>' + options.title + '</description>'
    rss += '  <category>' + options.category + '</category>'
    rss += '  <language>' + options.language + '</language>'
    rss += '  <pubDate>' + options.pubDate + '</pubDate>'
    rss += '  <lastBuildDate>' + moment().format(dateFormat) + '</lastBuildDate>'
    rss += '  <image>'
    rss += '    <url>' + options.image + '</url>'
    rss += '    <title>' + options.title + '</title>'
    rss += '    <link>' + options.link + '</link>'
    rss += '  </image>'
    rss += '  <webfeeds:cover image="' + options.image + '" />'
    rss += '  <webfeeds:icon>' + options.icon + '</webfeeds:icon>'
    rss += '  <webfeeds:logo>' + options.icon + '</webfeeds:logo>'
    rss += '  <webfeeds:accentColor>' + options.color + '</webfeeds:accentColor>'
    rss += '  <webfeeds:related layout="card" target="browser"/>'
    rss += '  </channel>'
    rss += '</rss>'
    fs.writeFileSync(options.target, rss)
  }
  let xmlData = fs.readFileSync(options.target, 'utf8')
  var jsonRSS = parser.parse(xmlData, {
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    cdataTagName: 'description'
  })

  jsonRSS.rss.channel.lastBuildDate = moment().format(dateFormat)

  let description = '<![CDATA[ '
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    description += '<h2>' + element.title + '</h2>'
    if (Array.isArray(element.content)) {
      description += '<ul>'
      for (let index = 0; index < element.content.length; index++) {
        const el = element.content[index]
        if (el.link) {
          description += '<li><a href="' + el.link + '" target="_blank">' + el.content + '</a></li>'
        } else {
          description += '<li>' + el + '</li>'
        }
      }
      description += '</ul>'
    } else {
      if (element.content.link) {
        description += '<p><a href="' + element.content.link + '" target="_blank">' + element.content.content + '</a></p'
      } else {
        description += '<p>' + element.content + '</p>'
      }
    }
    description += '<hr/>'
  }
  description += ' ]]>'
  if (!jsonRSS.rss.channel.item) {
    jsonRSS.rss.channel.item = []
  }

  // if item is not an array, save the item and push it to an array
  if (!Array.isArray(jsonRSS.rss.channel.item)) {
    let itemtmp = jsonRSS.rss.channel.item
    jsonRSS.rss.channel.item = []
    itemtmp.description = '<![CDATA[ ' + itemtmp.description.description + ' ]]>'
    jsonRSS.rss.channel.item.push(itemtmp)
  } else {
    for (let index = 0; index < jsonRSS.rss.channel.item.length; index++) {
      jsonRSS.rss.channel.item[index].description = '<![CDATA[ ' + jsonRSS.rss.channel.item[index].description.description + ' ]]>'
    }
  }

  jsonRSS.rss.channel.item.push({
    title: options.itemTitle.replace('%DATE%', moment().format('DD.MM.YYYY')),
    link: options.link,
    description: description,
    pubDate: moment().format(dateFormat)
  })

  var Parser = require('fast-xml-parser').j2xParser
  var xmlparser = new Parser({
    ignoreAttributes: false,
    allowBooleanAttributes: true
  })
  var xml = xmlparser.parse(jsonRSS)
  try {
    fs.writeFileSync(options.target, xml)
  } catch (error) {
    throw error
  }
}
