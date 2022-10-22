module.exports = {
  base: "/vblog/",
  title: 'ivem',
  theme: 'reco',
  author: 'ivem',
  description: '描述',
  themeConfig: {
    logo: '/assets/img/logo.png',
    lastUpdated: '更新时间', // string | boolean
    nav: [
      { text: '首页', link: '/' },
      { text: 'Java', 
        items: [
          { text: 'Java基础', link: '/Java/Java基础/' },
          { text: 'Java容器', link: '/Java/Java容器/' },
          { text: 'Java并发', link: '/Java/Java并发/' },
          { text:'Java虚拟机', link: '/Java/Java虚拟机' },
        ] 
      },
      { text: '计算机网络', link: '/计算机网络/TCPIP体系结构' },
      { text: '操作系统', link: '/操作系统/操作系统概述' },
      { 
        text: '数据库',
        items: [
          { text: 'MySQL', link: '/数据库/MySQL' },
          { text: 'Redis', link: '/数据库/Redis' },
        ]
      },
      { text: '数据结构与算法', link: '/数据结构与算法/' },
      { 
        text: '消息中间件',
        items: [
          { text: 'Kafka', link: '/Kafka' },
          { text: 'RPC', link: '/RPC' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/ivemcel/vblog' },
    ],  
    displayAllHeaders: true, // 默认值：false
    //sidebar: 'auto',
    sidebar: {
      '/Java/': [
        {
          title: 'Java',   // 必要的
          path: '/Java/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 3,    // 可选的, 默认值是 1
          children: [
            {
              title:'Java基础', 
              path: '/Java/Java基础',
              // children: [
              //   {title:'Java基础1', path: '/Java/Java基础'},
              //   {title:'Java基础2', path: '/Java/Java基础'},
              //   {title:'Java基础3', path: '/Java/Java基础'},
              // ]
            },
            {title:'Java容器', path: '/Java/Java容器'},
            {title:'Java并发', path: '/Java/Java并发'},
            {title:'Java虚拟机', path: '/Java/Java虚拟机'},
          ]
        }
      ],

    },
    record: 'ICP 备案文案',
    recordLink: 'ICP 备案指向链接',
    // cyberSecurityRecord: '公安部备案文案',
    // cyberSecurityLink: '公安部备案指向链接',
  },
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github',
      // 其他的 Vssue 配置
      owner: 'ivemcel',
      repo: 'vblog',
      clientId: 'e3bd5c41be405d3f7596',
      clientSecret: 'bf74e73e480e608faf8830b0138e55bfc11834a3',
    },
  }
}
