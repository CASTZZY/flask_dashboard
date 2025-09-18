// 滚动图例饼图组件
const ScrollLegendPie = {
  id: "pie_005",
  type: "echarts",
  name: "滚动图例饼图",
  icon: "🥧",
  category: "pie",
  subCategory: "饼图系列",
  defaultProps: {
    title: {
      text: '滚动图例饼图'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: ['直接访问', '搜索引擎', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他', '邮件营销', '微博', '知乎', '豆瓣', 'QQ', '微信', '支付宝']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1048, name: '百度' },
          { value: 251, name: '谷歌' },
          { value: 147, name: '必应' },
          { value: 102, name: '其他' },
          { value: 220, name: '微博' },
          { value: 180, name: '知乎' },
          { value: 150, name: '豆瓣' },
          { value: 130, name: 'QQ' },
          { value: 110, name: '微信' },
          { value: 90, name: '支付宝' },
          { value: 70, name: '其他渠道' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
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
            radius: { type: ["string", "number"] },
            center: { type: "array", items: { type: ["string", "number"] } },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "number" },
                  name: { type: "string" }
                }
              } 
            },
            emphasis: { type: "object" }
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
      legend: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "图例类型" },
          orient: { type: "string", title: "图例方向" },
          right: { type: "number", title: "图例右边距" },
          top: { type: "number", title: "图例上边距" },
          bottom: { type: "number", title: "图例下边距" },
          data: { type: "array", items: { type: "string" }, title: "图例数据" }
        },
        title: "图例设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            radius: { type: ["string", "number"], title: "半径" },
            center: { type: "array", items: { type: ["string", "number"] }, title: "中心位置" },
            emphasis: { type: "object", title: "高亮设置" }
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
  window.ComponentRegistry.register(ScrollLegendPie);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ScrollLegendPie);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ScrollLegendPie);
    }
  }, 100);
}
