// AQI雷达图组件
const AQIRadar = {
  id: "radar_003",
  type: "echarts",
  name: "AQI雷达图",
  icon: "📈",
  category: "radar",
  subCategory: "雷达图系列",
  defaultProps: {
    title: {
      text: 'AQI雷达图'
    },
    tooltip: {
      trigger: 'axis'
    },
    radar: {
      indicator: [
        { name: 'PM2.5', max: 300 },
        { name: 'PM10', max: 300 },
        { name: 'SO2', max: 300 },
        { name: 'NO2', max: 300 },
        { name: 'O3', max: 300 },
        { name: 'CO', max: 300 }
      ]
    },
    series: [{
      name: 'AQI指标',
      type: 'radar',
      data: [
        {
          value: [120, 150, 80, 90, 110, 60],
          name: '北京'
        },
        {
          value: [100, 130, 70, 80, 90, 50],
          name: '上海'
        },
        {
          value: [90, 120, 60, 70, 80, 40],
          name: '广州'
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
                  name: { type: "string", title: "名称" }
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
  window.ComponentRegistry.register(AQIRadar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(AQIRadar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(AQIRadar);
    }
  }, 100);
}
