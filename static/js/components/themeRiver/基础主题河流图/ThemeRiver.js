// 基础主题河流图组件
const ThemeRiver = {
  id: "themeriver_001",
  type: "echarts",
  name: "基础主题河流图",
  icon: "🌊",
  category: "themeriver",
  subCategory: "主题河流图",
  defaultProps: {
    title: {
      text: '基础主题河流图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(0,0,0,0.2)',
          width: 1,
          type: 'solid'
        }
      }
    },
    singleAxis: {
      top: 50,
      bottom: 50,
      axisTick: {},
      axisLabel: {},
      type: 'time',
      axisPointer: {
        animation: true,
        label: {
          show: true
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          opacity: 0.2
        }
      }
    },
    series: [{
      type: 'themeRiver',
      itemStyle: {
        emphasis: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.8)'
        }
      },
      data: [
        ['2021-01-01', 10, '主题1'],
        ['2021-01-02', 15, '主题1'],
        ['2021-01-03', 20, '主题1'],
        ['2021-01-01', 5, '主题2'],
        ['2021-01-02', 8, '主题2'],
        ['2021-01-03', 12, '主题2'],
        ['2021-01-01', 7, '主题3'],
        ['2021-01-02', 10, '主题3'],
        ['2021-01-03', 15, '主题3']
      ]
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      singleAxis: { 
        type: "object",
        properties: {
          top: { type: "number" },
          bottom: { type: "number" },
          axisTick: { type: "object" },
          axisLabel: { type: "object" },
          type: { type: "string" },
          axisPointer: { type: "object" },
          splitLine: { type: "object" }
        },
        title: "单轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string" },
            itemStyle: { type: "object" },
            data: { type: "array" }
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
      singleAxis: { 
        type: "object", 
        properties: {
          top: { type: "number", title: "上边距" },
          bottom: { type: "number", title: "下边距" },
          type: { type: "string", title: "轴类型" }
        },
        title: "单轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "图表类型" },
            itemStyle: { type: "object", title: "节点样式" }
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
  window.ComponentRegistry.register(ThemeRiver);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ThemeRiver);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ThemeRiver);
    }
  }, 100);
}
