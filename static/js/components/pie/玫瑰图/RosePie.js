// 玫瑰图组件
const RosePie = {
  id: "pie_003",
  type: "echarts",
  name: "玫瑰图",
  icon: "🌹",
  category: "pie",
  subCategory: "玫瑰图",
  defaultProps: {
    title: {
      text: '玫瑰图'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: [20, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      data: [
        {value: 40, name: 'rose 1'},
        {value: 38, name: 'rose 2'},
        {value: 32, name: 'rose 3'},
        {value: 30, name: 'rose 4'},
        {value: 28, name: 'rose 5'},
        {value: 26, name: 'rose 6'},
        {value: 22, name: 'rose 7'},
        {value: 18, name: 'rose 8'}
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
              items: { type: "number" }
            },
            center: { 
              type: "array", 
              items: { type: "string" }
            },
            roseType: { type: "string" },
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
              items: { type: "number" },
              title: "内外半径"
            },
            center: { 
              type: "array", 
              items: { type: "string" },
              title: "中心点位置"
            },
            roseType: { type: "string", title: "玫瑰图类型" }
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
  window.ComponentRegistry.register(RosePie);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(RosePie);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(RosePie);
    }
  }, 100);
}
