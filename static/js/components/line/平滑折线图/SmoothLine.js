// 平滑折线图组件
const SmoothLine = {
  id: "line_004",
  type: "echarts",
  name: "平滑折线图",
  icon: "📈~",
  category: "line",
  subCategory: "平滑折线图",
  defaultProps: {
    title: {
      text: '平滑折线图'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 132, 101, 134, 90, 230, 210],
      type: 'line',
      smooth: true
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "array", 
        items: { type: "string" },
        title: "X轴数据"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            data: { type: "array", items: { type: "number" } },
            smooth: { type: "boolean" }
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
