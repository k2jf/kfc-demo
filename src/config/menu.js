module.exports = {
  headerMenu: [
    {
      name: 'top-menu1',
      icon: 'md-person',
      title: '导航菜单1'
    },
    {
      name: 'top-menu2',
      icon: 'md-person',
      title: 'PAS'
    }
  ],
  siderMenuMap: {
    'top-menu1': [
      {
        name: 'home',
        icon: 'md-person',
        title: '首页'
      },
      {
        name: 'timeseries',
        icon: 'md-person',
        title: '时序图'
      },
      {
        name: 'auth',
        icon: 'md-person',
        title: '授权管理'
      },
      {
        name: 'dataTypeSelector',
        icon: 'md-person',
        title: '选择数据类型'
      },
      {
        name: 'fieldselector',
        icon: 'md-person',
        title: '选择变量'
      },
      {
        name: 'completeness',
        icon: 'md-person',
        title: '数据完整度'
      }
    ],
    'top-menu2': [
      {
        name: 'pasprojects',
        icon: 'md-person',
        title: 'PAS项目'
      },
      {
        name: 'pasprojectdetail',
        icon: 'md-person',
        title: 'PAS项目详情'
      },
      {
        name: 'pasjobs',
        icon: 'md-person',
        title: 'PAS任务'
      },
      {
        name: 'pasresults',
        icon: 'md-person',
        title: 'PAS结果'
      },
      {
        icon: 'md-person',
        title: '左侧一级菜单4',
        children: [
          {
            name: 'page4',
            icon: 'md-person',
            title: '左侧二级菜单1'
          },
          {
            name: 'page4',
            icon: 'md-person',
            title: '左侧二级菜单2'
          }
        ]
      }
    ]
  }
}
