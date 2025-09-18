// 南丁格尔玫瑰图组件
const NightingaleRose = {
  id: "nightingale_rose_001",
  type: "echarts",
  name: "南丁格尔玫瑰图",
  icon: "🌹",
  category: "pie",
  subCategory: "南丁格尔玫瑰图",
  defaultProps: {
    title: {
      text: '南丁格尔玫瑰图'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      top: 'bottom',
      data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    series: [
      {
        name: '面积模式',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose1' },
          { value: 38, name: 'rose2' },
          { value: 32, name: 'rose3' },
          { value: 30, name: 'rose4' },
          { value: 28, name: 'rose5' },
          { value: 26, name: 'rose6' },
          { value: 22, name: 'rose7' },
          { value: 18, name: 'rose8' }
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
            radius: { type: "array", items: { type: ["string", "number"] } },
            center: { type: "array", items: { type: "string" } },
            roseType: { type: "string" },
            itemStyle: { type: "object" },
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
          trigger: { type: "string", title: "触发方式" },
          formatter: { type: "string", title: "提示框格式" }
        },
        title: "提示框设置"
      },
      legend: { 
        type: "object", 
        properties: {
          top: { type: "string", title: "图例位置" },
          data: { 
            type: "array", 
            items: { type: "string" }, 
            title: "图例数据" 
          }
        },
        title: "图例设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            radius: { 
              type: "array", 
              items: { type: ["string", "number"] }, 
              title: "半径设置" 
            },
            center: { 
              type: "array", 
              items: { type: "string" }, 
              title: "中心位置" 
            },
            roseType: { type: "string", title: "玫瑰图类型" },
            itemStyle: { 
              type: "object", 
              properties: {
                borderRadius: { type: "number", title: "边框圆角" }
              },
              title: "图形样式" 
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
  window.ComponentRegistry.register(NightingaleRose);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(NightingaleRose);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(NightingaleRose);
    }
  }, 100);
}
