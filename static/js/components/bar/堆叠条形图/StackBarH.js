// 堆叠条形图组件
const StackBarH = {
  id: "bar_003",
  type: "echarts",
  name: "堆叠条形图",
  icon: "📊📊H",
  category: "bar",
  subCategory: "堆叠条形图",
  defaultProps: {
    title: {
      text: '堆叠条形图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['直接访问', '邮件营销', '联盟广告']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五']
    },
    series: [
      {
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        data: [320, 302, 341, 374, 390]
      },
      {
        name: '邮件营销',
        type: 'bar',
        stack: '总量',
        data: [120, 132, 101, 134, 90]
      },
      {
        name: '联盟广告',
        type: 'bar',
        stack: '总量',
        data: [220, 182, 191, 234, 290]
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
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
            stack: { type: "string" },
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
      legend: { 
        type: "object", 
        properties: {
          data: { type: "array", items: { type: "string" }, title: "图例数据" }
        },
        title: "图例设置"
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
          type: { type: "string", title: "Y轴类型" },
          data: { type: "array", items: { type: "string" }, title: "Y轴数据" }
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
  window.ComponentRegistry.register(StackBarH);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(StackBarH);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(StackBarH);
    }
  }, 100);
}
