// pictorialBar图组件
const BasicPictorialBar = {
  id: "pictorialBar_001",
  type: "echarts",
  name: "基础pictorialBar图",
  icon: "象形",
  category: "pictorialBar",
  subCategory: "基础pictorialBar图",
  defaultProps: {
    title: {
      text: '基础pictorialBar图'
    },
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [{
      type: 'pictorialBar',
      symbolSize: ['30', '20'],
      symbolRepeat: true,
      symbolMargin: 10,
      data: [20, 30, 40, 50, 60]
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          data: { type: "array", items: { type: "string" } }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string" },
            symbolSize: { 
              type: "array", 
              items: { type: "string" }
            },
            symbolRepeat: { type: "boolean" },
            symbolMargin: { type: "number" },
            data: { type: "array", items: { type: "number" } }
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
      xAxis: { 
        type: "object",
        properties: {
          data: {
            type: "array",
            items: { type: "string" },
            title: "X轴数据"
          }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "图表类型" },
            symbolSize: { 
              type: "array", 
              items: { type: "string" },
              title: "符号大小"
            },
            symbolRepeat: { type: "boolean", title: "符号重复" },
            symbolMargin: { type: "number", title: "符号间距" },
            data: { 
              type: "array", 
              items: { type: "number" },
              title: "数据项"
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
  window.ComponentRegistry.register(BasicPictorialBar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicPictorialBar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicPictorialBar);
    }
  }, 100);
}
