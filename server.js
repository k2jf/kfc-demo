const getUserList = function (filters, pageNo, pageSize) {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/users?size=' + pageSize + '&page=' + pageNo
    if (filters.username) {
      url += '&username=' + filters.username
    }
    if (filters.email) {
      url += '&email=' + filters.email
    }

    let result = {
      data: [],
      total: 0
    }

    xhr.open('GET', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result.data = obj.result
        result.total = obj.pages.total
        resolve(result)
      }
    }
    xhr.send(null)
  })

  return result
}

const getRoleList = function () {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/roles?type=all'

    let result = null

    xhr.open('GET', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.result
        resolve(result)
      }
    }
    xhr.send(null)
  })

  return result
}

const getGroupList = function () {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/groups?type=all'

    let result = null

    xhr.open('GET', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.result
        resolve(result)
      }
    }
    xhr.send(null)
  })

  return result
}

const saveUser = function (userinfo) {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/users'

    userinfo.groups = userinfo.groups ? userinfo.groups.map(item => ({ name: item })) : []
    userinfo.roles = userinfo.roles ? userinfo.roles.map(item => ({ name: item })) : []
    delete userinfo.confirmPassword

    let result = null
    xhr.open('POST', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.message
        if (result) {
          reject(result)
          return
        }
        resolve()
      }
    }
    xhr.send(JSON.stringify(userinfo))
  })

  return result
}

const updateUser = function (userinfo) {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/users'

    userinfo.groups = userinfo.groups ? userinfo.groups.map(item => ({ name: item })) : []
    userinfo.roles = userinfo.roles ? userinfo.roles.map(item => ({ name: item })) : []
    delete userinfo.confirmPassword

    let result = null
    xhr.open('POST', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.message
        if (result) {
          reject(result)
          return
        }
        resolve()
      }
    }
    xhr.send(JSON.stringify(userinfo))
  })

  return result
}

const modifyPassword = function (userinfo) {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/users'

    userinfo.groups = userinfo.groups ? userinfo.groups.map(item => ({ name: item })) : []
    userinfo.roles = userinfo.roles ? userinfo.roles.map(item => ({ name: item })) : []
    delete userinfo.confirmPassword

    let result = null
    xhr.open('POST', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.message
        if (result) {
          reject(result)
          return
        }
        resolve()
      }
    }
    xhr.send(JSON.stringify(userinfo))
  })

  return result
}

const getUserInfo = function (username) {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/users/' + username

    let result = null
    xhr.open('GET', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.result
        resolve(result)
      }
    }
    xhr.send()
  })

  return result
}

const getUserTokens = function (username) {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/tokens?username=' + username

    let result = null
    xhr.open('GET', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.result
        resolve(result)
      }
    }
    xhr.send()
  })

  return result
}

const deleteUser = function (username) {
  let result = new Promise(function (resolve, reject) {
    let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..K09zHAVbgBDJLugW2TsKhg.ImY4y0pxJw1buidfWO6W7p7xwf7TxdOhBfndlPWhoCfcK7ggiqAj5qyWiMXCHbTr4scEGmzv1kROmGKJaNvX-aVFnEsnXSdjCjtfHT_GX-e0MSBWKfsfOgCtuLznXk5wcVK0BFf1mQXOQUS74JWmTNK9OGfRqyKwAm_iwI3CBz46OFgZ3H53VhXZZhLM1N-Uz0FRtgZ8JtIAL_CIP5ZcMotSH7OgCRWNanIT6s5b8JXBaHOcjM1qkzPlY0kSuNlm.ZlizGrSVV40yJEvnTMdFQsc_lyxPW7v0'

    var xhr = new XMLHttpRequest()
    var url = 'http://10.12.20.36:28091/auth-service/v1/users/' + username

    let result = null
    xhr.open('DELETE', url, true)
    xhr.setRequestHeader('K2_KEY', token)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let obj = JSON.parse(xhr.responseText)
        result = obj.message
        if (result) {
          reject(result)
          return
        }
        resolve()
      }
    }
    xhr.send()
  })

  return result
}

export default {
  getUserList: getUserList,
  getRoleList: getRoleList,
  getGroupList: getGroupList,
  saveUser: saveUser,
  updateUser: updateUser,
  modifyPassword: modifyPassword,
  getUserInfo: getUserInfo,
  getUserTokens: getUserTokens,
  deleteUser: deleteUser
}
