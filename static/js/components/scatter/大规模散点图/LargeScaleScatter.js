// 大规模散点图组件
const LargeScaleScatter = {
  id: "large_scale_scatter_001",
  type: "echarts",
  name: "大规模散点图",
  icon: "ScatL",
  category: "scatter",
  subCategory: "大规模散点图",
  defaultProps: {
    title: {
      text: '大规模散点图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'value',
      scale: true
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: '大规模散点图',
        type: 'scatter',
        symbolSize: 3,
        large: true,
        largeThreshold: 2000,
        data: (function () {
          var data = [];
          for (var i = 0; i < 5000; i++) {
            data.push([
              Math.random() * 100,
              Math.random() * 100
            ]);
          }
          return data;
        })()
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          scale: { type: "boolean" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          scale: { type: "boolean" }
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
            large: { type: "boolean" },
            largeThreshold: { type: "number" },
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
        type: "object", 
        properties: {
          type: { type: "string", title: "轴类型" },
          scale: { type: "boolean", title: "是否脱离0值比例" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "轴类型" },
          scale: { type: "boolean", title: "是否脱离0值比例" }
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
            large: { type: "boolean", title: "是否开启大数据优化" },
            largeThreshold: { type: "number", title: "开启大数据优化的阈值" },
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
  window.ComponentRegistry.register(LargeScaleScatter);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(LargeScaleScatter);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(LargeScaleScatter);
    }
  }, 100);
}
