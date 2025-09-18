// 基础仪表盘组件
const BasicGauge = {
  id: "gauge_001",
  type: "echarts",
  name: "基础仪表盘",
  icon: "仪表盘",
  category: "gauge",
  subCategory: "基础仪表盘",
  defaultProps: {
    series: [{
      name: '完成度',
      type: 'gauge',
      detail: { formatter: '{value}%' },
      data: [{ value: 50, name: '完成率' }]
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
            detail: { 
              type: "object",
              properties: {
                formatter: { type: "string" }
              }
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
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" }
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
  window.ComponentRegistry.register(BasicGauge);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicGauge);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicGauge);
    }
  }, 100);
}
