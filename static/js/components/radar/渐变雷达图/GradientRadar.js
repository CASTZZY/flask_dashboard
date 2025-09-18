// 渐变雷达图组件
const GradientRadar = {
  id: "radar_004",
  type: "echarts",
  name: "渐变雷达图",
  icon: "🌈",
  category: "radar",
  subCategory: "雷达图系列",
  defaultProps: {
    title: {
      text: '渐变雷达图'
    },
    tooltip: {
      trigger: 'axis'
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
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '预算',
          itemStyle: {
            color: '#67F9D8'
          },
          lineStyle: {
            color: '#67F9D8'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(103, 249, 216, 0.8)'
              }, {
                offset: 1, color: 'rgba(103, 249, 216, 0.2)'
              }]
            }
          }
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '开销',
          itemStyle: {
            color: '#FFD700'
          },
          lineStyle: {
            color: '#FFD700'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(255, 215, 0, 0.8)'
              }, {
                offset: 1, color: 'rgba(255, 215, 0, 0.2)'
              }]
            }
          }
        }
      ]
    }]
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
        title: "雷达图指标"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "array", items: { type: "number" } },
                  name: { type: "string" },
                  itemStyle: { type: "object" },
                  lineStyle: { type: "object" },
                  areaStyle: { type: "object" }
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
      radar: { 
        type: "object", 
        properties: {
          indicator: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                name: { type: "string", title: "指标名称" },
                max: { type: "number", title: "最大值" }
              }
            },
            title: "指标设置" 
          }
        },
        title: "雷达图设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "array", items: { type: "number" }, title: "数值" },
                  name: { type: "string", title: "名称" },
                  itemStyle: { type: "object", title: "点样式" },
                  lineStyle: { type: "object", title: "线样式" },
                  areaStyle: { type: "object", title: "区域样式" }
                }
              },
              title: "数据" 
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
  window.ComponentRegistry.register(GradientRadar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(GradientRadar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(GradientRadar);
    }
  }, 100);
}
