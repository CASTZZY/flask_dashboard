// 基础散点图组件
const BasicScatter = {
  id: "scatter_001",
  type: "echarts",
  name: "基础散点图",
  icon: "Scat",
  category: "scatter",
  subCategory: "基础散点图",
  defaultProps: {
    title: {
      text: '基础散点图'
    },
    xAxis: {},
    yAxis: {},
    series: [{
      name: '散点图',
      type: 'scatter',
      data: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
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
  window.ComponentRegistry.register(BasicScatter);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicScatter);
}

// 导出组件
// 组件已通过 ComponentRegistry 注册到全局