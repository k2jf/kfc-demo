const toStr = function (date) {
  if (!date) {
    return ''
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let monthStr = '' + month
  if (month < 10) {
    monthStr = '0' + monthStr
  }
  let day = date.getDate()
  let dayStr = '' + day
  if (day < 10) {
    dayStr = '0' + dayStr
  }

  return year + '-' + monthStr + '-' + dayStr
}

const formatToStr = function (date, format) {
  if (!date) {
    return ''
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let monthStr = '' + month
  if (month < 10) {
    monthStr = '0' + monthStr
  }
  let day = date.getDate()
  let dayStr = '' + day
  if (day < 10) {
    dayStr = '0' + dayStr
  }

  let hour = date.getHours()
  let hourStr = '' + hour
  if (hour < 10) {
    hourStr = '0' + hourStr
  }

  let minutes = date.getMinutes()
  let minuteStr = '' + minutes
  if (minutes < 10) {
    minuteStr = '0' + minuteStr
  }

  let seconds = date.getSeconds()
  let secondStr = '' + seconds
  if (seconds < 10) {
    secondStr = '0' + secondStr
  }

  return year + '-' + monthStr + '-' + dayStr + ' ' + hourStr + ':' + minuteStr + ':' + secondStr
}

const toSecStr = function (date) {
  if (!date) {
    return ''
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let monthStr = '' + month
  if (month < 10) {
    monthStr = '0' + monthStr
  }
  let day = date.getDate()
  let dayStr = '' + day
  if (day < 10) {
    dayStr = '0' + dayStr
  }

  let hour = date.getHours()
  let hourStr = '' + hour
  if (hour < 10) {
    hourStr = '0' + hourStr
  }

  let minutes = date.getMinutes()
  let minuteStr = '' + minutes
  if (minutes < 10) {
    minuteStr = '0' + minuteStr
  }

  let seconds = date.getSeconds()
  let secondStr = '' + seconds
  if (seconds < 10) {
    secondStr = '0' + secondStr
  }

  return year + '-' + monthStr + '-' + dayStr + ' ' + hourStr + ':' + minuteStr + ':' + secondStr
}

const toMonthStr = function (date) {
  if (!date) {
    return ''
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let monthStr = '' + month
  if (month < 10) {
    monthStr = '0' + monthStr
  }

  return year + '-' + monthStr
}

const now = function () {
  return new Date()
}

const addMonth = function (date, months) {
  if (!date) {
    return
  }

  let result = new Date(date.getTime())
  result.setMonth(date.getMonth() + months)

  return result
}

module.exports = {
  toStr: toStr,
  formatToStr: formatToStr,
  toSecStr: toSecStr,
  toMonthStr: toMonthStr,
  now: now,
  addMonth: addMonth
}
