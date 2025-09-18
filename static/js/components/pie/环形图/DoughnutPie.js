// 环形图组件
const DoughnutPie = {
  id: "pie_002",
  type: "echarts",
  name: "环形图",
  icon: "⭕",
  category: "pie",
  subCategory: "环形图",
  defaultProps: {
    title: {
      text: '环形图'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        {value: 1048, name: '搜索引擎'},
        {value: 735, name: '直接访问'},
        {value: 580, name: '邮件营销'},
        {value: 484, name: '联盟广告'},
        {value: 300, name: '视频广告'}
      ]
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            radius: { 
              type: "array", 
              items: { type: "string" }
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "number" },
                  name: { type: "string" }
                }
              } 
            }
          }
        },
        title: "系列数据"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      title: { 
        type: "object", 
        properties: {
          text: { type: "string", title: "图表标题" }
        },
        title: "标题设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            radius: { 
              type: "array", 
              items: { type: "string" },
              title: "内外半径"
            }
          }
        },
        title: "系列设置"
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 初始化ECharts实例
    const chart = echarts.init(container);
    
    // 渲染图表
    chart.setOption(finalOptions);
    
    return chart;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(DoughnutPie);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(DoughnutPie);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(DoughnutPie);
    }
  }, 100);
}
