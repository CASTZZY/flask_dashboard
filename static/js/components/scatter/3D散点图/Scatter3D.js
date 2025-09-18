// 3D散点图组件
const Scatter3D = {
  id: "scatter_002",
  type: "echarts",
  name: "3D散点图",
  icon: "🔷",
  category: "scatter",
  subCategory: "3D图表",
  defaultProps: {
    title: {
      text: '3D散点图'
    },
    tooltip: {},
    xAxis3D: {
      type: 'value'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      viewControl: {
        projection: 'orthographic'
      }
    },
    series: [{
      type: 'scatter3D',
      symbolSize: 10,
      data: [
        [10, 20, 30],
        [20, 30, 40],
        [30, 40, 50],
        [40, 50, 60],
        [50, 60, 70],
        [60, 70, 80],
        [70, 80, 90],
        [80, 90, 100],
        [90, 100, 110],
        [100, 110, 120]
      ]
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" }
        },
        title: "X轴数据"
      },
      yAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" }
        },
        title: "Y轴数据"
      },
      zAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" }
        },
        title: "Z轴数据"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
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
      xAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "X轴类型" }
        },
        title: "X轴设置"
      },
      yAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" }
        },
        title: "Y轴设置"
      },
      zAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Z轴类型" }
        },
        title: "Z轴设置"
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
  window.ComponentRegistry.register(Scatter3D);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Scatter3D);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Scatter3D);
    }
  }, 100);
}
