// 3D柱状图组件
const Bar3D = {
  id: "bar_003",
  type: "echarts",
  name: "3D柱状图",
  icon: "📊",
  category: "bar",
  subCategory: "3D图表",
  defaultProps: {
    title: {
      text: '3D柱状图'
    },
    tooltip: {},
    xAxis3D: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis3D: {
      type: 'category',
      data: ['类别1', '类别2', '类别3']
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
      type: 'bar3D',
      data: [
        [0, 0, 10], [0, 1, 20], [0, 2, 30],
        [1, 0, 15], [1, 1, 25], [1, 2, 35],
        [2, 0, 12], [2, 1, 22], [2, 2, 32],
        [3, 0, 18], [3, 1, 28], [3, 2, 38],
        [4, 0, 14], [4, 1, 24], [4, 2, 34],
        [5, 0, 16], [5, 1, 26], [5, 2, 36]
      ],
      shading: 'color',
      label: {
        show: false
      }
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
        },
        title: "X轴数据"
      },
      yAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
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
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
            shading: { type: "string" },
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
      xAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "X轴类型" },
          data: { type: "array", items: { type: "string" }, title: "X轴数据" }
        },
        title: "X轴设置"
      },
      yAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          data: { type: "array", items: { type: "string" }, title: "Y轴数据" }
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
  window.ComponentRegistry.register(Bar3D);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Bar3D);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Bar3D);
    }
  }, 100);
}
