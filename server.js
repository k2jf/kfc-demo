const getDataProjects = function (filters, pageNo, pageSize) {
	let result = new Promise(function (resolve, reject) {
		let token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0IiwiYWxnIjoiZGlyIn0..DKInRzSv705fETH7equI1Q.Je2FVCpN_G2umkeLSexnmpTQZz2TWfOhLgG39iYspF1vyQfq3xtvXBxRCPdrQhN4MLPLEXRTlPx1cbDsuu0o9DA7DbwiU82x2ojTgFCVy5HvRi_uKtJW_2nAetFUopoi-EmYPhI44xrITztR_aE0x83Em95ijchagmCu012uBqZdv9nKht3DFsUIMvF4CSLFJMa0tFE274D1yQI_456_5ixhCb7-NggOrJ5Z_0w2BwPl4hyncLpH_i33KdQKoiGvD-E1EtbAsKq007Gk0N6pkQ.APvHmLOA3uFkJAL3wnZba8o5vJTds0zL'

		var xhr = new XMLHttpRequest()
		var url = 'http://10.12.20.36:28085/pas/services/projects?size=' + pageSize + '&page=' + pageNo + '&owner=&creator=' + filters.creator + '&projName=' + filters.projName

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
				result.total = obj.pageInfo.total
				resolve(result)
			}
		}
		xhr.send()

	})

	return result
}

export default {
	getDataProjects: getDataProjects
}
