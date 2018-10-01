/* global $, moment */
$(document).ready(function () {
  moment.locale('de')
  getData()
  // TODO: pull to reload
})
function getData () {
  getDatum()
  getWetter()
  getWasser()
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
  getNews()
  getFeeds()
}
function getDatum () {
  $('#datum .card-body').text(moment().format('dddd, DD.MM.YYYY'))
}
function getWetter () {
  // Tagesverlauf für heute
  // https://openweathermap.org/api
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
  // My Day, Link
  // https://todosupport.helpshift.com/a/microsoft-to-do/?s=integrations&f=does-microsoft-to-do-have-a-public-api&l=en&p=web
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
function getNews () {
  // Tagesschau RSS Feed
  // http://www.tagesschau.de/xml/rss2
}
function getFeeds () {
  // Get Number of Feeds
  // https://developer.feedly.com/
}