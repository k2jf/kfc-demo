export const getAnnounces = (params) => {
  return global.axios.get('/announces').then(res => {
    const data = res.data
    const list = (data.body && data.body.announces) || []
    console.log(data)
    return {
      list: list,
      total: list.length
    }
  })
}

/**
 * FIXME this is NOT a mock, the response content needs redefine.
 * @return {Promise<any>}
 */
export const getEffectiveAnnounce = () => {
  return global.axios.get('/announces').then(res => {
    const data = res.data
    const list = (data.body && data.body.announces) || []
    console.log(data)
    return {
      list: list,
      total: list.length
    }
  })
}

export const addAnnounce = (formItem) => {
  return new Promise(resolve => resolve({ code: 200 }))
}

export const delAnnounce = (id) => {
  return new Promise(resolve => resolve({ code: 200 }))
}

export const setAnnounce = (formItem) => {
  return new Promise(resolve => resolve({ code: 200 }))
}
