// 改进的3D散点图组件
const Scatter3DImproved = {
  id: "scatter_003",
  type: "echarts",
  name: "改进3D散点图",
  icon: "🔷",
  category: "scatter",
  subCategory: "3D图表",
  defaultProps: {
    title: {
      text: '改进3D散点图'
    },
    tooltip: {},
    xAxis3D: {
      type: 'value',
      name: 'X轴'
    },
    yAxis3D: {
      type: 'value',
      name: 'Y轴'
    },
    zAxis3D: {
      type: 'value',
      name: 'Z轴'
    },
    grid3D: {
      viewControl: {
        projection: 'perspective',
        autoRotate: true,
        autoRotateSpeed: 2
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    series: [{
      type: 'scatter3D',
      symbolSize: 15,
      data: generateScatter3DData()
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          name: { type: "string" }
        },
        title: "X轴数据"
      },
      yAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          name: { type: "string" }
        },
        title: "Y轴数据"
      },
      zAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          name: { type: "string" }
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
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
            itemStyle: { type: "object" }
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
          type: { type: "string", title: "X轴类型" },
          name: { type: "string", title: "X轴名称" }
        },
        title: "X轴设置"
      },
      yAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          name: { type: "string", title: "Y轴名称" }
        },
        title: "Y轴设置"
      },
      zAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Z轴类型" },
          name: { type: "string", title: "Z轴名称" }
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
  window.ComponentRegistry.register(Scatter3DImproved);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Scatter3DImproved);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Scatter3DImproved);
    }
  }, 100);
}
