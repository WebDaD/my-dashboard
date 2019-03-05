module.exports = async function (options, RssParser) {
  RssParser = (typeof RssParser === 'undefined') ? require('rss-parser') : RssParser
  let parser = new RssParser()

  let output = []

  let feed = await parser.parseURL(options.url)

  for (let index = 0; index < options.count; index++) {
    const item = feed.items[index]
    output.push({
      content: item.title,
      link: item.link
    })
  }
  return output
}
