export const formatDateToTS = function (dateObj) {
  if (dateObj && typeof dateObj === 'object') {
    return dateObj.getTime()
  } else {
    return 0
  }
}

export const formatDate = function (dateObj) {
  if (dateObj && typeof dateObj === 'object') {
    const yearStr = dateObj.getFullYear()
    const monthStr = ('00' + (dateObj.getMonth() + 1)).slice(-2)
    const dateStr = ('00' + dateObj.getDate()).slice(-2)

    const hourStr = ('00' + dateObj.getHours()).slice(-2)
    const minuteStr = ('00' + dateObj.getMinutes()).slice(-2)
    const secondStr = ('00' + dateObj.getSeconds()).slice(-2)

    return `${yearStr}-${monthStr}-${dateStr} ${hourStr}:${minuteStr}:${secondStr}`
  } else {
    return ''
  }
}
