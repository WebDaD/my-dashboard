module.exports = async function (options, dropboxFS, todotxt, path, util, moment) {
  dropboxFS = (typeof dropboxFS === 'undefined') ? require('dropbox-fs/')({
    apiKey: options.dropboxApiKey
  }) : dropboxFS
  todotxt = (typeof todotxt === 'undefined') ? require('todotxt') : todotxt
  path = (typeof path === 'undefined') ? require('path') : path
  util = (typeof util === 'undefined') ? require('util') : util
  moment = (typeof moment === 'undefined') ? require('moment') : moment

  const regexDue = /due:(.*)/g


  let result = await util.promisify(dropboxFS.readFile.bind(dropboxFS))(path.join(options.dropboxFolder, 'todo.txt'), { encoding: 'utf8' })
  let returner = []
  let tasks = todotxt.parse(result)
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index]
    let m
    while ((m = regexDue.exec(task.text)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regexDue.lastIndex) {
        regexDue.lastIndex++
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        task.due = match
      })
    }
  }

  switch (options.sort) {
    case 'date': tasks.sort(sortByDate); break
    case 'date,due': tasks.sort(sortByDateDueDate); break
    case 'due': tasks.sort(sortByDueDate); break
    case 'due,prio': tasks.sort(sortByDueDatePriority); break
    case 'prio': tasks.sort(sortByPriority); break
  }

  options.start = options.start ? options.start : 0
  options.end = options.end ? ((options.end > tasks.length) ? tasks.length : options.end) : tasks.length

  for (let index = options.start; index < options.end; index++) {
    const task = tasks[index]
    if (options.context && !task.contexts.includes(options.context)) {
      continue
    }
    if (options.project && !task.projects.includes(options.project)) {
      continue
    }
    if (options.complete && task.complete !== options.complete) {
      continue
    }
    if (options.dueToday && !moment(task.due).isSame(moment(), 'day')) { // due:YYYY-MM-DD
      continue
    }
    returner.push({
      content: task.text,
      link: undefined
    })
  }
  return returner
}

function sortByDate (a, b) {
  if (a.date && !b.date) {
    return -1
  }
  if (!a.date && b.date) {
    return 1
  }
  if (a.date < b.date) {
    return -1
  }
  if (a.date > b.date) {
    return 1
  }
  return 0
}
function sortByDateDueDate (a, b) {
  if (a.date && !b.date) {
    return -1
  }
  if (!a.date && b.date) {
    return 1
  }
  if (a.date < b.date) {
    return -1
  }
  if (a.date > b.date) {
    return 1
  }
  return sortByDueDate(a, b)
}
function sortByDueDate (a, b) {
  if (a.due && !b.due) {
    return -1
  }
  if (!a.due && b.due) {
    return 1
  }
  if (a.due < b.due) {
    return -1
  }
  if (a.due > b.due) {
    return 1
  }
  return 0
}
function sortByDueDatePriority (a, b) {
  if (a.due && !b.due) {
    return -1
  }
  if (!a.due && b.due) {
    return 1
  }
  if (a.due < b.due) {
    return -1
  }
  if (a.due > b.due) {
    return 1
  }
  return sortByPriority(a, b)
}
function sortByPriority (a, b) {
  if (a.priority && !b.priority) {
    return -1
  }
  if (!a.priority && b.priority) {
    return 1
  }
  if (a.priority < b.priority) {
    return -1
  }
  if (a.priority > b.priority) {
    return 1
  }
  return 0
}