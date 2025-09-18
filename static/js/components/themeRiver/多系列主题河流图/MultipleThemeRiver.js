// 多系列主题河流图组件
const MultipleThemeRiver = {
  id: "multiple_theme_river_001",
  type: "echarts",
  name: "多系列主题河流图",
  icon: "河流×2",
  category: "themeRiver",
  subCategory: "多系列主题河流图",
  defaultProps: {
    title: {
      text: '多系列主题河流图'
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
      },
      formatter: function (params) {
        let s = params[0].name + '<br/>';
        for (let i = 0; i < params.length; i++) {
          s += params[i].marker + params[i].seriesName + ': ' + params[i].data[1] + '<br/>';
        }
        return s;
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
    series: [
      {
        type: 'themeRiver',
        itemStyle: {
          emphasis: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        },
        data: [
          ['2023-01-01', 10, '系列1'],
          ['2023-01-02', 15, '系列1'],
          ['2023-01-03', 12, '系列1'],
          ['2023-01-04', 20, '系列1'],
          ['2023-01-05', 18, '系列1'],
          ['2023-01-01', 8, '系列2'],
          ['2023-01-02', 12, '系列2'],
          ['2023-01-03', 10, '系列2'],
          ['2023-01-04', 15, '系列2'],
          ['2023-01-05', 14, '系列2'],
          ['2023-01-01', 5, '系列3'],
          ['2023-01-02', 8, '系列3'],
          ['2023-01-03', 7, '系列3'],
          ['2023-01-04', 12, '系列3'],
          ['2023-01-05', 10, '系列3']
        ]
      }
    ]
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
            data: { type: "array", items: { type: "array" } }
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
              type: { type: "string", title: "指示器类型" },
              lineStyle: { 
                type: "object",
                properties: {
                  color: { type: "string", title: "线条颜色" },
                  width: { type: "number", title: "线条宽度" },
                  type: { type: "string", title: "线条类型" }
                },
                title: "线条样式"
              }
            },
            title: "坐标轴指示器" 
          },
          formatter: { type: "string", title: "提示框格式" }
        },
        title: "提示框设置"
      },
      singleAxis: { 
        type: "object",
        properties: {
          top: { type: "number", title: "顶部边距" },
          bottom: { type: "number", title: "底部边距" },
          axisTick: { 
            type: "object",
            title: "坐标轴刻度" 
          },
          axisLabel: { 
            type: "object",
            title: "坐标轴标签" 
          },
          type: { type: "string", title: "轴类型" },
          axisPointer: { 
            type: "object",
            properties: {
              animation: { type: "boolean", title: "是否开启动画" },
              label: { 
                type: "object",
                properties: {
                  show: { type: "boolean", title: "是否显示标签" }
                },
                title: "标签设置"
              }
            },
            title: "坐标轴指示器" 
          },
          splitLine: { 
            type: "object",
            properties: {
              show: { type: "boolean", title: "是否显示分割线" },
              lineStyle: { 
                type: "object",
                properties: {
                  type: { type: "string", title: "线条类型" },
                  opacity: { type: "number", title: "透明度" }
                },
                title: "线条样式"
              }
            },
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
              properties: {
                emphasis: { 
                  type: "object",
                  properties: {
                    shadowBlur: { type: "number", title: "阴影模糊大小" },
                    shadowColor: { type: "string", title: "阴影颜色" }
                  },
                  title: "高亮样式"
                }
              },
              title: "图形样式"
            },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                title: "数据点[时间, 数值, 系列名称]"
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
  window.ComponentRegistry.register(MultipleThemeRiver);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(MultipleThemeRiver);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(MultipleThemeRiver);
    }
  }, 100);
}
