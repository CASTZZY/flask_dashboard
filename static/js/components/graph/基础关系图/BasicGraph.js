// 基础关系图组件
const BasicGraph = {
  id: "graph_001",
  type: "echarts",
  name: "基础关系图",
  icon: "🔗",
  category: "graph",
  subCategory: "基础关系图",
  defaultProps: {
    title: {
      text: '基础关系图'
    },
    series: [{
      name: '关系图',
      type: 'graph',
      layout: 'force',
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
        { source: '节点1', target: '节点2' },
        { source: '节点2', target: '节点3' },
        { source: '节点3', target: '节点4' },
        { source: '节点4', target: '节点5' },
        { source: '节点5', target: '节点6' },
        { source: '节点6', target: '节点7' },
        { source: '节点7', target: '节点8' },
        { source: '节点8', target: '节点1' }
      ],
      roam: true,
      label: {
        show: true
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 10
        }
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
            name: { type: "string" },
            type: { type: "string" },
            layout: { type: "string" },
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
                  target: { type: "string" }
                }
              }
            },
            roam: { type: "boolean" },
            label: { type: "object" },
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
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            layout: { type: "string", title: "布局方式" },
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
                  target: { type: "string", title: "目标节点" }
                }
              },
              title: "连接关系"
            },
            roam: { type: "boolean", title: "是否开启鼠标缩放和平移漫游" },
            label: { 
              type: "object",
              title: "标签设置"
            },
            emphasis: { 
              type: "object",
              title: "高亮设置"
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
  window.ComponentRegistry.register(BasicGraph);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicGraph);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicGraph);
    }
  }, 100);
}
