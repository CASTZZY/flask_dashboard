// 填充雷达图组件
const FilledRadar = {
  id: "filled_radar_001",
  type: "echarts",
  name: "填充雷达图",
  icon: "雷达A",
  category: "radar",
  subCategory: "填充雷达图",
  defaultProps: {
    title: {
      text: '填充雷达图'
    },
    tooltip: {},
    legend: {
      data: ['预算分配', '实际开销']
    },
    radar: {
      indicator: [
        { name: '销售', max: 6500 },
        { name: '管理', max: 16000 },
        { name: '信息技术', max: 30000 },
        { name: '客服', max: 38000 },
        { name: '研发', max: 52000 },
        { name: '市场', max: 25000 }
      ]
    },
    series: [
      {
        name: '预算 vs 开销',
        type: 'radar',
        areaStyle: {},
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销'
          }
        ]
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      radar: { 
        type: "object",
        properties: {
          indicator: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                name: { type: "string" },
                max: { type: "number" }
              }
            }
          }
        },
        title: "雷达图坐标系设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            areaStyle: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "array", items: { type: "number" } },
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
        title: "提示框设置"
      },
      legend: { 
        type: "object", 
        properties: {
          data: { 
            type: "array", 
            items: { type: "string" }, 
            title: "图例数据" 
          }
        },
        title: "图例设置"
      },
      radar: { 
        type: "object",
        properties: {
          indicator: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                name: { type: "string", title: "指示器名称" },
                max: { type: "number", title: "最大值" }
              }
            },
            title: "指示器设置"
          }
        },
        title: "雷达图坐标系设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            areaStyle: { 
              type: "object", 
              title: "区域填充样式" 
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { 
                    type: "array", 
                    items: { type: "number" }, 
                    title: "数据值" 
                  },
                  name: { type: "string", title: "数据名称" }
                }
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
  window.ComponentRegistry.register(FilledRadar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(FilledRadar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(FilledRadar);
    }
  }, 100);
}
