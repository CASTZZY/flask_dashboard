// 装饰pictorialBar图组件
const DecorativePictorialBar = {
  id: "decorative_pictorial_bar_001",
  type: "echarts",
  name: "装饰pictorialBar图",
  icon: "象形D",
  category: "pictorialBar",
  subCategory: "装饰pictorialBar图",
  defaultProps: {
    title: {
      text: '装饰pictorialBar图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
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
        name: '装饰柱状图',
        type: 'pictorialBar',
        symbol: 'diamond',
        symbolSize: ['30%', '50%'],
        symbolPosition: 'start',
        symbolOffset: [0, -10],
        data: [120, 200, 150, 80, 70, 110, 130],
        z: 10
      },
      {
        name: '背景柱状图',
        type: 'bar',
        barGap: '-100%',
        barWidth: '30%',
        itemStyle: {
          color: 'rgba(0,0,0,0.1)'
        },
        data: [250, 250, 250, 250, 250, 250, 250],
        z: 1
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
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" }
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
            symbol: { type: "string" },
            symbolSize: { type: "array", items: { type: "string" } },
            symbolPosition: { type: "string" },
            symbolOffset: { type: "array", items: { type: "number" } },
            data: { type: "array", items: { type: "number" } },
            z: { type: "number" },
            barGap: { type: "string" },
            barWidth: { type: "string" },
            itemStyle: { type: "object" }
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
              type: { type: "string", title: "指示器类型" }
            },
            title: "坐标轴指示器" 
          }
        },
        title: "提示框设置"
      },
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string", title: "轴类型" },
          data: { 
            type: "array", 
            items: { type: "string" }, 
            title: "X轴数据" 
          }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string", title: "轴类型" }
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
            symbol: { type: "string", title: "标记图形" },
            symbolSize: { 
              type: "array", 
              items: { type: "string" }, 
              title: "标记大小" 
            },
            symbolPosition: { type: "string", title: "标记位置" },
            symbolOffset: { 
              type: "array", 
              items: { type: "number" }, 
              title: "标记偏移" 
            },
            data: { 
              type: "array", 
              items: { type: "number" }, 
              title: "系列数据" 
            },
            z: { type: "number", title: "层级" },
            barGap: { type: "string", title: "柱间距离" },
            barWidth: { type: "string", title: "柱条宽度" },
            itemStyle: { 
              type: "object",
              properties: {
                color: { type: "string", title: "颜色" }
              },
              title: "图形样式"
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
  window.ComponentRegistry.register(DecorativePictorialBar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(DecorativePictorialBar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(DecorativePictorialBar);
    }
  }, 100);
}
