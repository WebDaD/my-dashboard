# my-dashboard

A Little node-Service to gather some information and make it avaiable on time.
Everything is configurable.

## Gathering

### What

Many Sources can be accessed.  
If the One you are looking for is not here, feel free to make a pull-request or drop an issue.

- [x] rss-feed (get some items from a feed)
- [ ] google-calendar (get some dates for today and some days)
- [ ] google-mail (get some mails in the inbox)
- [ ] weather (get weather for a location for today)
- [x] date (get the Day and Date)
- [x] todotxt (get Info from your Todo.txt form dropbox)
- [ ] twitter (get info from your twitter service)
- [ ] json (parse a json and get info from it)
- [ ] monitor (check if a server / url / port is alive)
- [ ] botd (get the blessing of the day from botd.webdad.eu)
- [ ] random-verse (get a random bible verse)
- [ ] losungen (get the daily verse from Herrnhut)
- [ ] google-photo (get some pictures based on some info)
- [ ] fussball (get table, games for all or a team (german football))
- [ ] on-this-day (get info for this day in history)
- [ ] life-is-more (get daily text from here)


#### rss-feed

Get Items from a Feed.

Options:

- url: The URL of the Feed
- count: How Many Items to fetch

#### date

Get the Date of today.

Options:

- format: The moment.js-Format of the Returned Date

#### todotxt

Get Tasks from your todo.txt File in your Dropbox-Folder

Options:

- dropboxApiKey: An API Key for your Dropbox
- dropboxFolder: The Folder where the todo.txt File lives
- sort (optional): Sort the Tasks (date | due | prio | date,due | due,prio)
- dueToday (optional): Show only Tasks for today
- start (optional): start by Tasks number
- end (optional): end by Task Number
- context (optional): Only Tasks with this context
- project (optional): Only Tasks with this Project

### When

The Information is presented per day.  
But the data may be gathered more often, overwriting the daily dataset.

### How

Just edit your config and set a cronjob. Done!

## Publishing

From the Users point of view there are two ways to get information:

- Active (Go on a Website, Read a RSS-Feed, Open an App)
- Passive (Receive an E-Mail, Get a Notification)

If the One you are looking for not here, feel free to make a pull-request or drop an issue.

### Active

These Options can be used (multi-select possible!)

- [x] html (display a website with the info)
- [ ] xml (Have a XML ready)
- [x] rss (An RSS-Feed with the Info)
- [x] json (A JSON-File with the Info)

(You need to have the Service running or send the files to a webserver of your choice (via config))

#### html

Return a Website

Options:

- target: The File to write to
- title: The Title of the Website

#### rss

Create an ongoing RSS-Stream

Options:

- target: The File to write to
- title: The Title of the Feed
- itemTitle: Title of any Item (can use %DATE% Variable)
- link: Link of the Feed
- description: Description for the Feed
- category: Category for the Feed
- language: Language of the Feed
- pubDate: First Publicaction date
- image: Feed image as png
- icon: Feed image as svg
- color: Feed color as hex

#### json

Just write the JSON-File to a file

Options:

- target: The File to write to

### Passive

- [x] mail (send an email)
- [ ] print (send to printer)


#### mail

Send an E-Mail with your Dashboard

Options:

- mailOptions: Object with Server-Data
- mailOptions.host: Server-Host for Mailing
- mailOptions.port: port for Mailing
- mailOptions.auth: Auth-Data for Mail User
- mailOptions.auth.user: Mail User
- mailOptions.auth.pass: Mail user Password
- from: Send form this Account
- to: target E-Mail Adresses
- subject: Subject of the Mail (can use %DATE% Variable)

## Installation

You may install the cli or the service

- CLI: `npm install -g my-dashboard'
- Service: s`git clone https://github.com/WebDaD/my-dashboard . && npm install

## Usage

- CLI: `my-dashboard`
- The Service needs to be started like `node index.js`(or preferebaly with a process manager like pm2)

## Configuration

The config.json may live in many places to suit your needs.  
The sequence to look for is as follows (top beats bottom):

1. Argument
2. Home Directory (.my-dashboard.json)
3. /etc/my-dashboard.json
4. Enviroment-Variable MYDASHBOARD (points to a json file)
5. config.json by index.js (service only)

## Development

There are many ways you can contribute ot this little project:

- review some codes
- improve tests
- write plugins for gathering data
- write plugins for publishing reports
