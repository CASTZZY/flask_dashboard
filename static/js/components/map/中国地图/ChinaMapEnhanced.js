// 增强版中国地图组件
const ChinaMapEnhanced = {
  id: "map_005",
  type: "echarts",
  name: "增强中国地图",
  icon: "🗺️",
  category: "map",
  subCategory: "地理地图",
  defaultProps: {
    title: {
      text: '增强中国地图'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function(params) {
        if (params.value) {
          return params.name + ': ' + params.value.toLocaleString();
        } else {
          return params.name;
        }
      }
    },
    visualMap: {
      show: true,
      min: 0,
      max: 3500,
      inRange: {
        color: ['#f7fbff', '#08306b']
      },
      textStyle: {
        color: '#000'
      }
    },
    series: [{
      name: '中国地图',
      type: 'map',
      map: 'china',
      roam: false,
      scaleLimit: {
        min: 1,
        max: 2
      },
      label: {
        show: true,
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#333',
        borderWidth: 0.5,
        emphasis: {
          areaColor: '#2a333d'
        }
      },
      data: [
        { name: '北京', value: 100 },
        { name: '天津', value: 200 },
        { name: '上海', value: 300 },
        { name: '重庆', value: 400 },
        { name: '河北', value: 500 },
        { name: '河南', value: 600 },
        { name: '云南', value: 700 },
        { name: '辽宁', value: 800 },
        { name: '黑龙江', value: 900 },
        { name: '湖南', value: 1000 },
        { name: '安徽', value: 1100 },
        { name: '山东', value: 1200 },
        { name: '新疆', value: 1300 },
        { name: '江苏', value: 1400 },
        { name: '浙江', value: 1500 },
        { name: '江西', value: 1600 },
        { name: '湖北', value: 1700 },
        { name: '广西', value: 1800 },
        { name: '甘肃', value: 1900 },
        { name: '山西', value: 2000 },
        { name: '内蒙古', value: 2100 },
        { name: '陕西', value: 2200 },
        { name: '吉林', value: 2300 },
        { name: '福建', value: 2400 },
        { name: '贵州', value: 2500 },
        { name: '广东', value: 2600 },
        { name: '青海', value: 2700 },
        { name: '西藏', value: 2800 },
        { name: '四川', value: 2900 },
        { name: '宁夏', value: 3000 },
        { name: '海南', value: 3100 },
        { name: '台湾', value: 3200 },
        { name: '香港', value: 3300 },
        { name: '澳门', value: 3400 }
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
            itemStyle: { type: "object" },
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
            label: { type: "object", title: "标签设置" },
            itemStyle: { type: "object", title: "样式设置" }
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
  window.ComponentRegistry.register(ChinaMapEnhanced);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ChinaMapEnhanced);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ChinaMapEnhanced);
    }
  }, 100);
}
