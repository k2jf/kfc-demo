import CompletenessTable from '../CompletenessTable.vue'

export default {
	name: 'Md4xCompletenessTable',
	mixins: [ CompletenessTable ],
	data () {
		return {
			columns: [
				{ title: '序号', type: 'index' },
				{ title: '风场ID', key: 'wfId', width: 120 },
				{ title: '风场名称', key: 'wfName', minWidth: 150 },
				{ title: '数据类型', key: 'dataTypeNameCh' },
				{ title: '数据完整度', key: 'percenTage' }
			]
		}
	}
}
