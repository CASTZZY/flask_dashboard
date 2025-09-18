// 涟漪散点图组件
const RippleScatter = {
  id: "ripple_scatter_001",
  type: "echarts",
  name: "涟漪散点图",
  icon: "⭕",
  category: "scatter",
  subCategory: "散点图系列",
  defaultProps: {
    title: {
      text: '涟漪散点图'
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '数据点',
      type: 'effectScatter',
      rippleEffect: {
        brushType: 'stroke'
      },
      data: [
        [10, 20],
        [20, 30],
        [30, 40],
        [40, 50],
        [50, 60],
        [60, 70],
        [70, 80],
        [80, 90],
        [90, 100],
        [100, 110]
      ],
      symbolSize: 20
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string" }
        },
        title: "X轴数据"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" }
        },
        title: "Y轴数据"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            rippleEffect: { type: "object" },
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
            symbolSize: { type: "number" }
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
          type: { type: "string", title: "X轴类型" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" }
        },
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            rippleEffect: { type: "object", title: "涟漪效果" },
            symbolSize: { type: "number", title: "符号大小" }
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
  window.ComponentRegistry.register(RippleScatter);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(RippleScatter);
}

// 导出组件
export default RippleScatter;