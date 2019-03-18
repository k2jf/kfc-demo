import DataSetDetail from './DataSetDetail.vue'
import ScriptAlgDetail from './ScriptAlgDetail.vue'
import OutputMysqlDetail from './OutputMysqlDetail.vue'

export default {
  functional: true,
  components: {
    DataSetDetail,
    ScriptAlgDetail,
    OutputMysqlDetail
  },
  props: {
    itemType: {
      type: String,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    },
    nodeId: {
      type: String,
      required: true
    }
  },
  render (h, context) {
    function getComponent () {
      switch (context.props.itemType) {
      case 'data-set':
        return DataSetDetail
      case 'script-alg':
        return ScriptAlgDetail
      case 'output-mysql':
        return OutputMysqlDetail
      default:
        return DataSetDetail
      }
    }
    return h(
      getComponent(),
      {
        props: {
          projectId: context.props.projectId,
          nodeId: context.props.nodeId
        }
      }
    )
  }
}
