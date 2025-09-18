// 自定义地图组件
const CustomMap = {
  id: "custom_map_001",
  type: "echarts",
  name: "自定义地图",
  icon: "🗺️",
  category: "map",
  subCategory: "自定义地图",
  defaultProps: {
    title: {
      text: '自定义地图'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)'
    },
    visualMap: {
      min: 0,
      max: 1000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
    series: [
      {
        name: '自定义地图',
        type: 'map',
        map: 'custom',
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { name: '区域1', value: 28397.812 },
          { name: '区域2', value: 19549.124 },
          { name: '区域3', value: 3150.143 },
          { name: '区域4', value: 8441.537 },
          { name: '区域5', value: 40374.224 }
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
            map: { type: "string" },
            roam: { type: "boolean" },
            emphasis: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string" },
                  value: { type: "number" }
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
      visualMap: { 
        type: "object", 
        properties: {
          min: { type: "number", title: "最小值" },
          max: { type: "number", title: "最大值" },
          text: { 
            type: "array", 
            items: { type: "string" }, 
            title: "文本标签" 
          },
          realtime: { type: "boolean", title: "是否实时更新" },
          calculable: { type: "boolean", title: "是否显示拖拽手柄" },
          inRange: { 
            type: "object", 
            properties: {
              color: { 
                type: "array", 
                items: { type: "string" }, 
                title: "颜色范围" 
              }
            },
            title: "视觉映射范围" 
          }
        },
        title: "视觉映射组件"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            map: { type: "string", title: "地图类型" },
            roam: { type: "boolean", title: "是否开启鼠标缩放和平移漫游" },
            emphasis: { 
              type: "object", 
              properties: {
                label: { 
                  type: "object", 
                  properties: {
                    show: { type: "boolean", title: "是否显示标签" }
                  },
                  title: "高亮标签设置" 
                }
              },
              title: "高亮设置" 
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string", title: "地区名称" },
                  value: { type: "number", title: "数值" }
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
  window.ComponentRegistry.register(CustomMap);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(CustomMap);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(CustomMap);
    }
  }, 100);
}
