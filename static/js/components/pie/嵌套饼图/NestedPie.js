// 嵌套饼图组件
const NestedPie = {
  id: "pie_004",
  type: "echarts",
  name: "嵌套饼图",
  icon: "🥧",
  category: "pie",
  subCategory: "饼图系列",
  defaultProps: {
    title: {
      text: '嵌套饼图'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          position: 'inner',
          fontSize: 14
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: '直接访问', selected: true },
          { value: 679, name: '搜索引擎' },
          { value: 1548, name: '联盟广告' }
        ]
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '55%'],
        labelLine: {
          length: 30
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1048, name: '百度' },
          { value: 251, name: '谷歌' },
          { value: 147, name: '必应' },
          { value: 102, name: '其他' }
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
            label: { type: "object" },
            labelLine: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "number" },
                  name: { type: "string" },
                  selected: { type: "boolean" }
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
      legend: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "图例类型" },
          orient: { type: "string", title: "图例方向" },
          right: { type: "number", title: "图例右边距" },
          top: { type: "number", title: "图例上边距" },
          bottom: { type: "number", title: "图例下边距" }
        },
        title: "图例设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            radius: { type: "array", items: { type: ["string", "number"] }, title: "半径设置" },
            label: { type: "object", title: "标签设置" },
            labelLine: { type: "object", title: "标签线设置" }
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
  window.ComponentRegistry.register(NestedPie);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(NestedPie);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(NestedPie);
    }
  }, 100);
}
