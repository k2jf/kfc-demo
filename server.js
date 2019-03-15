const getDataCompleteness = function (filters, pageNo, pageSize) {
  let result = new Promise(function (resolve, reject) {
    let dataList = [
      {
        id: 1,
        dataTypeNameCh: 'dddd1',
        percenTage: '90%'
      },
      {
        id: 2,
        dataTypeNameCh: 'dddd2',
        percenTage: '99%'
      }
    ]
    let response = {
      data: dataList,
      total: 2
    }
    resolve(response)
  })

  return result
}

export default {
  getDataCompleteness: getDataCompleteness
}
