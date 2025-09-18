// 动态排序折线图组件
const DynamicSortingLine = {
  id: "line_005",
  type: "echarts",
  name: "动态排序折线图",
  icon: "📊",
  category: "line",
  subCategory: "折线图系列",
  defaultProps: {
    title: {
      text: '动态排序折线图'
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
        step: 'start',
        data: [120, 132, 101, 134, 90, 230]
      },
      {
        name: '销量',
        type: 'line',
        step: 'middle',
        data: [220, 182, 191, 234, 290, 330]
      },
      {
        name: '用户数',
        type: 'line',
        step: 'end',
        data: [150, 232, 201, 154, 190, 330]
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
            step: { type: "string" },
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
            step: { type: "string", title: "阶梯类型" },
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
  window.ComponentRegistry.register(DynamicSortingLine);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(DynamicSortingLine);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(DynamicSortingLine);
    }
  }, 100);
}
