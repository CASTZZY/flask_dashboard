// 散点图矩阵组件
const ScatterMatrix = {
  id: "scatter_matrix_001",
  type: "echarts",
  name: "散点图矩阵",
  icon: "ScatM",
  category: "scatter",
  subCategory: "散点图矩阵",
  defaultProps: {
    title: {
      text: '散点图矩阵'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: [
      { type: 'value', name: 'SepalLength' },
      { type: 'value', name: 'SepalWidth' },
      { type: 'value', name: 'PetalLength' },
      { type: 'value', name: 'PetalWidth' }
    ],
    yAxis: [
      { type: 'value', name: 'SepalLength' },
      { type: 'value', name: 'SepalWidth' },
      { type: 'value', name: 'PetalLength' },
      { type: 'value', name: 'PetalWidth' }
    ],
    series: [
      {
        name: 'setosa',
        type: 'scatter',
        symbolSize: 5,
        data: [
          [5.1, 3.5, 1.4, 0.2],
          [4.9, 3.0, 1.4, 0.2],
          [4.7, 3.2, 1.3, 0.2],
          [4.6, 3.1, 1.5, 0.2],
          [5.0, 3.6, 1.4, 0.2]
        ]
      },
      {
        name: 'versicolor',
        type: 'scatter',
        symbolSize: 5,
        data: [
          [7.0, 3.2, 4.7, 1.4],
          [6.4, 3.2, 4.5, 1.5],
          [6.9, 3.1, 4.9, 1.5],
          [5.5, 2.3, 4.0, 1.3],
          [6.5, 2.8, 4.6, 1.5]
        ]
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string" },
            name: { type: "string" }
          }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string" },
            name: { type: "string" }
          }
        },
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            symbolSize: { type: "number" },
            data: { type: "array", items: { type: "array", items: { type: "number" } } }
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
      tooltip: { 
        type: "object", 
        properties: {
          trigger: { type: "string", title: "触发方式" },
          axisPointer: { 
            type: "object", 
            properties: {
              type: { type: "string", title: "指示器类型" }
            },
            title: "坐标轴指示器" 
          }
        },
        title: "提示框设置"
      },
      xAxis: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "轴类型" },
            name: { type: "string", title: "轴名称" }
          }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "轴类型" },
            name: { type: "string", title: "轴名称" }
          }
        },
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            symbolSize: { type: "number", title: "标记大小" },
            data: { 
              type: "array", 
              items: { 
                type: "array", 
                items: { type: "number" },
                title: "数据点"
              },
              title: "系列数据" 
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
  window.ComponentRegistry.register(ScatterMatrix);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ScatterMatrix);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ScatterMatrix);
    }
  }, 100);
}
