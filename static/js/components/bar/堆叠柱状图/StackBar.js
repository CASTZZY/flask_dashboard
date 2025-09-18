// 堆叠柱状图组件
const StackBar = {
  id: "stack_bar_001",
  type: "echarts",
  name: "堆叠柱状图",
  icon: "📊📊",
  category: "bar",
  subCategory: "堆叠柱状图",
  defaultProps: {
    title: {
      text: '堆叠柱状图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'bar',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'bar',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'bar',
        stack: '总量',
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: '搜索引擎',
        type: 'bar',
        stack: '总量',
        data: [820, 832, 901, 934, 1290, 1330, 1320]
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
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            data: { type: "array", items: { type: "number" } },
            type: { type: "string" },
            stack: { type: "string" }
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
  window.ComponentRegistry.register(StackBar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(StackBar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(StackBar);
    }
  }, 100);
}
