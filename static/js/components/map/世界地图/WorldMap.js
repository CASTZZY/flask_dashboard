// 世界地图组件
const WorldMap = {
  id: "map_003",
  type: "echarts",
  name: "世界地图",
  icon: "🌍",
  category: "map",
  subCategory: "地理地图",
  defaultProps: {
    title: {
      text: '世界地图'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      show: true,
      min: 0,
      max: 100000000,
      inRange: {
        color: ['#f7fbff', '#08306b']
      }
    },
    series: [{
      name: '世界地图',
      type: 'map',
      map: 'world',
      roam: true,
      scaleLimit: {
        min: 1,
        max: 2
      },
      label: {
        show: false
      },
      data: [
        { name: 'China', value: 1400000000 },
        { name: 'India', value: 1300000000 },
        { name: 'United States', value: 330000000 },
        { name: 'Indonesia', value: 270000000 },
        { name: 'Pakistan', value: 220000000 },
        { name: 'Brazil', value: 210000000 },
        { name: 'Nigeria', value: 200000000 },
        { name: 'Bangladesh', value: 170000000 },
        { name: 'Russia', value: 145000000 },
        { name: 'Mexico', value: 130000000 }
      ]
    }]
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
            scaleLimit: { type: "object" },
            label: { type: "object" },
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
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            map: { type: "string", title: "地图类型" },
            roam: { type: "boolean", title: "是否开启缩放平移" },
            label: { type: "object", title: "标签设置" }
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
    
    // 注册地图数据（如果需要）
    if (typeof echarts.registerMap === 'function') {
      // 检查是否已经注册了世界地图数据
      if (!echarts.getMap('world')) {
        // 注册世界地图数据
        fetch('/static/js/world.js')
          .then(response => response.text())
          .then(data => {
            // 执行地图数据脚本
            eval(data);
            // 渲染图表
            chart.setOption(finalOptions);
          })
          .catch(error => {
            console.error('加载世界地图数据失败:', error);
            // 如果加载失败，仍然尝试渲染图表
            chart.setOption(finalOptions);
          });
      } else {
        // 如果已经注册了地图数据，直接渲染图表
        chart.setOption(finalOptions);
      }
    } else {
      // 渲染图表
      chart.setOption(finalOptions);
    }
    
    return chart;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(WorldMap);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(WorldMap);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(WorldMap);
    }
  }, 100);
}
