// 刻度仪表盘组件
const ScaleGauge = {
  id: "scale_gauge_001",
  type: "echarts",
  name: "刻度仪表盘",
  icon: " gauge°",
  category: "gauge",
  subCategory: "刻度仪表盘",
  defaultProps: {
    title: {
      text: '刻度仪表盘'
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: '刻度仪表盘',
        type: 'gauge',
        detail: {
          formatter: '{value}%'
        },
        data: [
          { value: 50, name: '完成率' }
        ],
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          distance: -20,
          color: '#fff',
          fontSize: 20
        }
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            detail: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "number" },
                  name: { type: "string" }
                }
              }
            },
            axisLine: { type: "object" },
            axisTick: { type: "object" },
            splitLine: { type: "object" },
            axisLabel: { type: "object" }
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
          formatter: { type: "string", title: "提示框格式" }
        },
        title: "提示框设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            detail: { 
              type: "object",
              properties: {
                formatter: { type: "string", title: "详情格式" }
              },
              title: "详情设置"
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "number", title: "数值" },
                  name: { type: "string", title: "名称" }
                }
              },
              title: "数据项"
            },
            axisLine: { 
              type: "object",
              properties: {
                lineStyle: { 
                  type: "object",
                  properties: {
                    width: { type: "number", title: "线条宽度" },
                    color: { 
                      type: "array", 
                      items: { type: "array" }, 
                      title: "颜色设置" 
                    }
                  },
                  title: "线条样式"
                }
              },
              title: "轴线设置"
            },
            axisTick: { 
              type: "object",
              properties: {
                distance: { type: "number", title: "距离" },
                length: { type: "number", title: "长度" },
                lineStyle: { 
                  type: "object",
                  properties: {
                    color: { type: "string", title: "颜色" },
                    width: { type: "number", title: "宽度" }
                  },
                  title: "线条样式"
                }
              },
              title: "刻度设置"
            },
            splitLine: { 
              type: "object",
              properties: {
                distance: { type: "number", title: "距离" },
                length: { type: "number", title: "长度" },
                lineStyle: { 
                  type: "object",
                  properties: {
                    color: { type: "string", title: "颜色" },
                    width: { type: "number", title: "宽度" }
                  },
                  title: "线条样式"
                }
              },
              title: "分割线设置"
            },
            axisLabel: { 
              type: "object",
              properties: {
                distance: { type: "number", title: "距离" },
                color: { type: "string", title: "颜色" },
                fontSize: { type: "number", title: "字体大小" }
              },
              title: "轴标签设置"
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
  window.ComponentRegistry.register(ScaleGauge);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ScaleGauge);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ScaleGauge);
    }
  }, 100);
}
