// 多仪表盘组件
const MultipleGauge = {
  id: "multiple_gauge_001",
  type: "echarts",
  name: "多仪表盘",
  icon: " gauges",
  category: "gauge",
  subCategory: "多仪表盘",
  defaultProps: {
    title: {
      text: '多仪表盘'
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: '仪表盘1',
        type: 'gauge',
        center: ['25%', '50%'],
        radius: '60%',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 8,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        pointer: {
          width: 5
        },
        detail: {
          show: false
        },
        data: [
          { value: 40, name: '完成率' }
        ]
      },
      {
        name: '仪表盘2',
        type: 'gauge',
        center: ['75%', '50%'],
        radius: '60%',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 8,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        pointer: {
          width: 5
        },
        detail: {
          show: false
        },
        data: [
          { value: 60, name: '完成率' }
        ]
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
            center: { type: "array", items: { type: "string" } },
            radius: { type: "string" },
            startAngle: { type: "number" },
            endAngle: { type: "number" },
            min: { type: "number" },
            max: { type: "number" },
            splitNumber: { type: "number" },
            axisLine: { type: "object" },
            pointer: { type: "object" },
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
            center: { 
              type: "array", 
              items: { type: "string" }, 
              title: "中心位置" 
            },
            radius: { type: "string", title: "半径" },
            startAngle: { type: "number", title: "起始角度" },
            endAngle: { type: "number", title: "结束角度" },
            min: { type: "number", title: "最小值" },
            max: { type: "number", title: "最大值" },
            splitNumber: { type: "number", title: "分割段数" },
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
            pointer: { 
              type: "object",
              properties: {
                width: { type: "number", title: "指针宽度" }
              },
              title: "指针设置"
            },
            detail: { 
              type: "object",
              properties: {
                show: { type: "boolean", title: "是否显示详情" }
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
  window.ComponentRegistry.register(MultipleGauge);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(MultipleGauge);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(MultipleGauge);
    }
  }, 100);
}
