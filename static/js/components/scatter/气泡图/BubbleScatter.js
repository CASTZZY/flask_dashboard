// 气泡图组件
const BubbleScatter = {
  id: "scatter_002",
  type: "echarts",
  name: "气泡图",
  icon: "气泡",
  category: "scatter",
  subCategory: "气泡图",
  defaultProps: {
    title: {
      text: '气泡图'
    },
    xAxis: {},
    yAxis: {},
    series: [{
      name: '气泡图',
      type: 'scatter',
      symbolSize: function (data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      data: [
        [10.0, 8.04, 100],
        [8.0, 6.95, 200],
        [13.0, 7.58, 300],
        [9.0, 8.81, 400],
        [11.0, 8.33, 500],
        [14.0, 9.96, 600],
        [6.0, 7.24, 700],
        [4.0, 4.26, 800],
        [12.0, 10.84, 900],
        [7.0, 4.82, 1000],
        [5.0, 5.68, 1100]
      ]
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
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
            name: { type: "string" },
            type: { type: "string" },
            symbolSize: { type: "function" },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: { type: "number" }
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
      xAxis: { 
        type: "object", 
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
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            symbolSize: { 
              type: "function",
              title: "符号大小函数"
            },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: { type: "number" },
                title: "数据点"
              },
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
  window.ComponentRegistry.register(BubbleScatter);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BubbleScatter);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BubbleScatter);
    }
  }, 100);
}
