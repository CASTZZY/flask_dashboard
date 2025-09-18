// MA K线图组件
const MACandlestick = {
  id: "ma_candlestick_001",
  type: "echarts",
  name: "MA K线图",
  icon: "K-MA",
  category: "candlestick",
  subCategory: "MA K线图",
  defaultProps: {
    title: {
      text: 'MA K线图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27', '2017-10-28']
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: 'K线图',
        type: 'candlestick',
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
          [35, 25, 15, 40]
        ]
      },
      {
        name: 'MA5',
        type: 'line',
        data: [25, 35, 35, 25, 30],
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: [28, 36, 34, 26, 29],
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
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
          type: { type: "string" },
          scale: { type: "boolean" }
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
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
            smooth: { type: "boolean" },
            lineStyle: { type: "object" }
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
          type: { type: "string", title: "轴类型" },
          scale: { type: "boolean", title: "是否脱离0值比例" }
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
            data: { 
              type: "array", 
              items: { 
                type: "array", 
                items: { type: "number" },
                title: "K线数据[开盘价, 收盘价, 最低价, 最高价]" 
              },
              title: "系列数据" 
            },
            smooth: { type: "boolean", title: "是否平滑曲线" },
            lineStyle: { 
              type: "object", 
              properties: {
                opacity: { type: "number", title: "线条透明度" }
              },
              title: "线条样式" 
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
  window.ComponentRegistry.register(MACandlestick);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(MACandlestick);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(MACandlestick);
    }
  }, 100);
}
