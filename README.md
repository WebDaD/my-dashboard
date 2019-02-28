# my-dashboard

A Little node-Service to gather some information and make it avaiable on time.
Everything is configurable.

## Gathering

### What

Many Sources can be accessed.  
If the One you are looking for not here, feel free to make a pull-request or drop an issue.

* rss-feed (get some items from a feed)
* google-calendar (get some dates for today and some days)
* google-mail (get some mails in the inbox)
* weather (get weather for a location for today)
* date (get the Day and Date)
* json (parse a json and get info from it)
* monitor (check if a server / url / port is alive)
* botd (get the blessing of the day from botd.webdad.eu)
* random-verse (get a random bible verse)
* losungen (get the daily verse from Herrnhut)
* google-photo (get some pictures based on some info)
* fussball (get table, games for all or a team (german football))
* on-this-day (get info for this day in history)
* life-is-more (get daily text from here)

### When

The Information is presented per day.  
But the data may be gathered more often, overwriting the daily dataset.

### How

Just edit your config and set a cronjob. Done!

## Publishing

From the Users point of view there are two ways to get information:

* Active (Go on a Website, Read a RSS-Feed, Open an App)
* Passive (Receive an E-Mail, Get a Notification)

If the One you are looking for not here, feel free to make a pull-request or drop an issue.

### Active

These Options can be used (multi-select possible!)

* html (display a website with the info)
* xml (Have a XML ready)
* rss (An RSS-Feed with the Info)

(You need to have the Service running or send the files to a webserver of your choice (via config))

### Passive

* mail (send an email)
* print (send to printer)

## Installation

You may install the cli or the service

* CLI: `npm install -g my-dashboard'
* Service: s`git clone https://github.com/WebDaD/my-dashboard . && npm install

## Usage

* CLI: `my-dashboard`
* The Service needs to be started like `node index.js`(or preferebaly with a process manager like pm2)

## Configuration

The config.json may live in many places to suit your needs.  
The sequence to look for is as follows (top beats bottom):

* Argument
* Home Directory (.my-dashboard)
* /etc/my-dashboard.json
* Enviroment-Variable MYDASHBOARD (points to a json file)
* config.json by index.js (service only)

## Development

There are many ways you can contribute ot this little project:

* review some codes
* improve tests
* write plugins for gathering data
* write plugins for publishing reports