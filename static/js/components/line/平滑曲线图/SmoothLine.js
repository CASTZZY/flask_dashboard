// 平滑曲线图组件
const SmoothLine = {
  id: "line_004",
  type: "echarts",
  name: "平滑曲线图",
  icon: "〰️",
  category: "line",
  subCategory: "折线图系列",
  defaultProps: {
    title: {
      text: '平滑曲线图'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230]
      },
      {
        name: '销量',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330]
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
          data: { type: "array", items: { type: "string" } }
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
            smooth: { type: "boolean" },
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
          type: { type: "string", title: "X轴类型" },
          data: { type: "array", items: { type: "string" }, title: "X轴数据" }
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
            smooth: { type: "boolean", title: "是否平滑" },
            data: { type: "array", items: { type: "number" }, title: "数据" }
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
  window.ComponentRegistry.register(SmoothLine);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(SmoothLine);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(SmoothLine);
    }
  }, 100);
}
