// 主题河流图组件
const BasicThemeRiver = {
  id: "themeRiver_001",
  type: "echarts",
  name: "基础主题河流图",
  icon: "河流",
  category: "themeRiver",
  subCategory: "基础主题河流图",
  defaultProps: {
    title: {
      text: '基础主题河流图'
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
        ['2023-01-01', 10, '主题1'],
        ['2023-01-02', 15, '主题1'],
        ['2023-01-03', 20, '主题1'],
        ['2023-01-04', 25, '主题1'],
        ['2023-01-05', 30, '主题1'],
        ['2023-01-01', 20, '主题2'],
        ['2023-01-02', 25, '主题2'],
        ['2023-01-03', 30, '主题2'],
        ['2023-01-04', 35, '主题2'],
        ['2023-01-05', 40, '主题2'],
        ['2023-01-01', 30, '主题3'],
        ['2023-01-02', 35, '主题3'],
        ['2023-01-03', 40, '主题3'],
        ['2023-01-04', 45, '主题3'],
        ['2023-01-05', 50, '主题3']
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
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: [
                  { type: "string" },
                  { type: "number" },
                  { type: "string" }
                ]
              }
            }
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
          axisTick: { 
            type: "object",
            title: "刻度设置"
          },
          axisLabel: { 
            type: "object",
            title: "标签设置"
          },
          type: { type: "string", title: "轴类型" },
          axisPointer: { 
            type: "object",
            title: "轴指示器设置"
          },
          splitLine: { 
            type: "object",
            title: "分割线设置"
          }
        },
        title: "单轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "图表类型" },
            itemStyle: { 
              type: "object",
              title: "图形样式"
            },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: [
                  { type: "string", title: "时间" },
                  { type: "number", title: "数值" },
                  { type: "string", title: "主题" }
                ],
                title: "主题河流数据"
              },
              title: "数据项"
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
  window.ComponentRegistry.register(BasicThemeRiver);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicThemeRiver);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicThemeRiver);
    }
  }, 100);
}
