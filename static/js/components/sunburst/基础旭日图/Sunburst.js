// 基础旭日图组件
const Sunburst = {
  id: "sunburst_001",
  type: "echarts",
  name: "基础旭日图",
  icon: "☀️",
  category: "sunburst",
  subCategory: "旭日图",
  defaultProps: {
    title: {
      text: '基础旭日图'
    },
    series: [{
      type: 'sunburst',
      data: [{
        name: '根节点',
        children: [{
          name: '节点1',
          value: 10,
          children: [{
            name: '子节点1',
            value: 2
          }, {
            name: '子节点2',
            value: 3
          }]
        }, {
          name: '节点2',
          value: 15,
          children: [{
            name: '子节点3',
            value: 5
          }, {
            name: '子节点4',
            value: 10
          }]
        }]
      }],
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
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
            type: { type: "string" },
            data: { type: "array" },
            radius: { type: "array" },
            label: { type: "object" }
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
            type: { type: "string", title: "图表类型" },
            radius: { 
              type: "array", 
              items: { type: "string" },
              title: "内外半径"
            },
            label: { type: "object", title: "标签设置" }
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
  window.ComponentRegistry.register(Sunburst);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Sunburst);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Sunburst);
    }
  }, 100);
}
