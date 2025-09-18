// 折线柱状图混合组件
const LineBarMixed = {
  id: "line_bar_mixed_001",
  type: "echarts",
  name: "折线柱状图混合",
  icon: "📈📊",
  category: "bar",
  subCategory: "折线柱状图混合",
  defaultProps: {
    title: {
      text: '折线柱状图混合'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销量', '增长率']
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: [
      {
        type: 'value',
        name: '销量',
        position: 'left'
      },
      {
        type: 'value',
        name: '增长率',
        position: 'right'
      }
    ],
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130]
      },
      {
        name: '增长率',
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "array", 
        items: { type: "string" },
        title: "X轴数据"
      },
      yAxis: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string" },
            name: { type: "string" },
            position: { type: "string" }
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
            data: { type: "array", items: { type: "number" } },
            yAxisIndex: { type: "number" }
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
          trigger: { type: "string", title: "触发方式" }
        },
        title: "提示框设置"
      },
      legend: { 
        type: "object", 
        properties: {
          data: { 
            type: "array", 
            items: { type: "string" }, 
            title: "图例数据" 
          }
        },
        title: "图例设置"
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
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "Y轴类型" },
            name: { type: "string", title: "Y轴名称" },
            position: { type: "string", title: "Y轴位置" }
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
            data: { 
              type: "array", 
              items: { type: "number" }, 
              title: "系列数据" 
            },
            yAxisIndex: { type: "number", title: "Y轴索引" }
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
  window.ComponentRegistry.register(LineBarMixed);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(LineBarMixed);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(LineBarMixed);
    }
  }, 100);
}
