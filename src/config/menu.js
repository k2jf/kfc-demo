// module.exports = { // new webpack prevent this from loading. This may be a mis-config
export default {
  headerMenu: [
    {
      name: 'top-menu1',
      icon: 'md-person',
      title: '数据管理'
    },
    {
      name: 'top-menu2',
      icon: 'md-person',
      title: '数据分析'
    },
    {
      name: 'top-menu3',
      icon: 'md-person',
      title: '其他'
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
        name: 'user',
        icon: 'md-person',
        title: '用户管理'
      },
      {
        name: 'auth',
        icon: 'md-person',
        title: '授权管理'
      },
      {
        name: 'user_1',
        icon: 'md-person',
        title: '用户管理(新)'
      },
      {
        name: 'user-groups',
        icon: 'md-person',
        title: '用户组管理(新)'
      },
      {
        name: 'auth_1',
        icon: 'md-person',
        title: '角色管理(新)'
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
        name: 'tsdw-stat',
        icon: 'md-person',
        title: '数据完整度'
      }
    ],
    'top-menu2': [
      {
        name: 'eaf-projects',
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
    ],
    'top-menu3': [
      {
        name: 'audit',
        icon: 'md-person',
        title: '审计日志'
      },
      {
        name: 'tag',
        icon: 'md-person',
        title: '标签管理'
      },
      {
        name: 'kmxiframe',
        icon: 'md-easel',
        title: 'kmx页面嵌入'
      },
      {
        name: 'announce',
        icon: 'logo-angular',
        title: '通知跑马灯&管理器'
      },
      {
        name: 'propertyManager',
        icon: 'md-brush',
        title: '系统设置编辑器'
      }
    ]
  }
}
