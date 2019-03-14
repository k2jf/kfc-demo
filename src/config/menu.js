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
      title: '导航菜单2'
    }
  ],
  siderMenuMap: {
    'top-menu1': [
      {
        name: 'home',
        icon: 'md-person',
        title: '左侧一级菜单1'
      },
      {
        name: 'page2',
        icon: 'md-person',
        title: '左侧一级菜单2'
      }
    ],
    'top-menu2': [
      {
        name: 'page3',
        icon: 'md-person',
        title: '左侧一级菜单3'
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
