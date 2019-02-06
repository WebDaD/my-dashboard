/* global $, moment, btoa */
$(document).ready(function () {
  moment.locale('de')
  getData()
  // TODO: pull to reload
})
function getData () {
  getDatum()
  getKontostand()
  getWetter()
  getWasser()
  getKantine()
  getAzubis()
  getTermine()
  getTodos()
  getMails()
  getServer()
  getLauf()
  getSegen()
  getRandomVerse()
  getLosung()
  getPhotos()
  getSport1860()
  getSportBucs()
  getSportEHC()
  getWWEPPV()
  getNews()
  getOldNews()
  getFeeds()
}
function getDatum () {
  $('#datum .card-body').text(moment().format('dddd, DD.MM.YYYY'))
}
function getKontostand () {
  // get Last Email with Subject Kontowecker, parse for Money and add date from mail
  // https://developers.google.com/gmail/api/
  // Also calc money per day until new money (28.)
}
function getWetter () {
  // Tagesverlauf für heute
  // https://openweathermap.org/api
}
function getKantine () {
  $.getJSON('https://cp.webdad.eu/?url=http://br-speiseplan.br.de:8080/mahlzeit/data/dishes_fh.json', function (data) {
    var html = '<ul class="list-group list-group-flush">'
    for (var index = 0; index < data.gerichte.length; index++) {
      var element = data.gerichte[index]
      if (element.datum === moment().format('DD.MM.YYYY')) {
        if (element.name.startsWith('Gericht ')) {
          html += '<li class="list-group-item">' + element.untertitel + '</li>'
        }
      }
    }
    html += '</ul>'
    $('#kantine .card-body').replaceWith(html)
  })
}
function getAzubis () {
  // Heute
  // von azubis.webdad.eu
}
function getWasser () {
  // Heute, Gestern, Durchschnitt, Link
  // https://stackoverflow.com/questions/45671606/google-sheets-api-read-single-cell-value-from-public-sheet
  // https://docs.google.com/spreadsheets/d/11LyoQAO5gA_fJhtlrHi1-qef9Ovb87per920Go5osHQ/edit?usp=drive_web&ouid=103997154640833261218
}
function getTermine () {
  // Next 5, Link
  // https://developers.google.com/calendar/
}
function getTodos () {
  $.ajax({
    type: 'GET',
    url: 'https://todo.webdad.eu/top10.json',
    dataType: 'json',
    headers: {
      'token': '7405e62IDYV6euz2tRhHP38dXF'
    },
    success: function (data) {
      var html = '<ul class="list-group list-group-flush">'
      for (var index = 0; index < data.length; index++) {
        var element = data[index]
        html += '<li class="list-group-item">(' + element.priority + ')' + element.text + '</li>'
      }
      html += '</ul>'
      $('#todos .card-body').replaceWith(html)
    }
  })
}
function getMails () {
  // Anzahl, Link
  // https://developers.google.com/gmail/api/
}
function getServer () {
  // Ping HEAD 200 (see vrsts)
}
function getLauf () {
  // Runtastic API https://www.npmjs.com/package/runtastic-unofficial-api

}
function getSegen () {
  // segen des Tages
  // heute
}
function getRandomVerse () {
  // http://getbible.net/api
}
function getLosung () {
  // losung des tages aus XML
}
function getPhotos () {
  // Neuestes Foto
  // http://developers.googleblog.com/2018/09/build-new-experiences-with-google.html
}
function getSport1860 () {
  // Tabelle, Letztes Spiel, Nächstes Spiel
  // https://github.com/OpenLigaDB/OpenLigaDB-Samples
  // https://www.openligadb.de/api/getnextmatchbyleagueteam/4281/125
}
function getSportBucs () {
  // Tabelle, Letztes Spiel, Nächstes Spiel
  // https://api.nfl.com/docs/getting-started/index.html
}
function getSportEHC () {
  // Tabelle, Letztes Spiel, Nächstes Spiel

}
function getWWEPPV () {
  // https://www.sportskeeda.com/wwe/wwe-ppv-calendar
}
function getNews () {
  // Tagesschau RSS Feed
  // http://www.tagesschau.de/xml/rss2
}
function getOldNews () {
  // https://github.com/sasalatart/on-this-day
}
function getFeeds () {
  // Get Number of Feeds
  // https://developer.feedly.com/
}
