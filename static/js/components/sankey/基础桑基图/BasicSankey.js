// 桑基图组件
const BasicSankey = {
  id: "sankey_001",
  type: "echarts",
  name: "基础桑基图",
  icon: "桑基",
  category: "sankey",
  subCategory: "基础桑基图",
  defaultProps: {
    title: {
      text: '基础桑基图'
    },
    series: [{
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      data: [
        { name: '节点1' },
        { name: '节点2' },
        { name: '节点3' },
        { name: '节点4' },
        { name: '节点5' },
        { name: '节点6' },
        { name: '节点7' },
        { name: '节点8' }
      ],
      links: [
        { source: '节点1', target: '节点2', value: 5 },
        { source: '节点1', target: '节点3', value: 3 },
        { source: '节点2', target: '节点4', value: 2 },
        { source: '节点2', target: '节点5', value: 3 },
        { source: '节点3', target: '节点6', value: 1 },
        { source: '节点3', target: '节点7', value: 2 },
        { source: '节点4', target: '节点8', value: 2 },
        { source: '节点5', target: '节点8', value: 3 },
        { source: '节点6', target: '节点8', value: 1 },
        { source: '节点7', target: '节点8', value: 2 }
      ],
      lineStyle: {
        color: 'source',
        curveness: 0.5
      }
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
            type: { type: "string" },
            layout: { type: "string" },
            emphasis: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string" }
                }
              }
            },
            links: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  source: { type: "string" },
                  target: { type: "string" },
                  value: { type: "number" }
                }
              }
            },
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
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "图表类型" },
            layout: { type: "string", title: "布局方式" },
            emphasis: { 
              type: "object",
              title: "高亮设置"
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string", title: "节点名称" }
                }
              },
              title: "节点数据"
            },
            links: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  source: { type: "string", title: "源节点" },
                  target: { type: "string", title: "目标节点" },
                  value: { type: "number", title: "数值" }
                }
              },
              title: "连接关系"
            },
            lineStyle: { 
              type: "object",
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
  window.ComponentRegistry.register(BasicSankey);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicSankey);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicSankey);
    }
  }, 100);
}
