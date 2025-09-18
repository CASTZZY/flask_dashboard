// 基础面积图组件
const BasicArea = {
  id: "line_002",
  type: "echarts",
  name: "基础面积图",
  icon: "📈",
  category: "line",
  subCategory: "面积图",
  defaultProps: {
    title: {
      text: '基础面积图'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '访问量',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210]
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
            type: { type: "string" },
            stack: { type: "string" },
            areaStyle: { type: "object" }
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
          boundaryGap: { type: "boolean", title: "边界间隙" },
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
  window.ComponentRegistry.register(BasicArea);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicArea);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicArea);
    }
  }, 100);
}
