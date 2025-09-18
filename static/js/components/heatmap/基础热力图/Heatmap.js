// 基础热力图组件
const Heatmap = {
  id: "heatmap_001",
  type: "echarts",
  name: "基础热力图",
  icon: "🔥",
  category: "heatmap",
  subCategory: "热力图",
  defaultProps: {
    title: {
      text: '基础热力图'
    },
    tooltip: {
      position: 'top'
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis: {
      type: 'category',
      data: ['类别1', '类别2', '类别3']
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center'
    },
    series: [{
      name: '热力图',
      type: 'heatmap',
      data: [
        [0, 0, 10], [0, 1, 20], [0, 2, 30],
        [1, 0, 15], [1, 1, 25], [1, 2, 35],
        [2, 0, 12], [2, 1, 22], [2, 2, 32],
        [3, 0, 18], [3, 1, 28], [3, 2, 38],
        [4, 0, 14], [4, 1, 24], [4, 2, 34],
        [5, 0, 16], [5, 1, 26], [5, 2, 36]
      ],
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
        },
        title: "X轴数据"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
        },
        title: "Y轴数据"
      },
      visualMap: { 
        type: "object",
        properties: {
          min: { type: "number" },
          max: { type: "number" },
          calculable: { type: "boolean" },
          orient: { type: "string" },
          left: { type: "string" }
        },
        title: "视觉映射"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
            label: { type: "object" },
            emphasis: { type: "object" }
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
          type: { type: "string", title: "X轴类型" },
          data: { type: "array", items: { type: "string" }, title: "X轴数据" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          data: { type: "array", items: { type: "string" }, title: "Y轴数据" }
        },
        title: "Y轴设置"
      },
      visualMap: { 
        type: "object",
        properties: {
          min: { type: "number", title: "最小值" },
          max: { type: "number", title: "最大值" },
          calculable: { type: "boolean", title: "是否显示拖拽手柄" },
          orient: { type: "string", title: "布局朝向" },
          left: { type: "string", title: "位置" }
        },
        title: "视觉映射设置"
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
  window.ComponentRegistry.register(Heatmap);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Heatmap);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Heatmap);
    }
  }, 100);
}
