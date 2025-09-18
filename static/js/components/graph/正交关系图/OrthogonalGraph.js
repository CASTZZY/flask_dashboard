// 正交关系图组件
const OrthogonalGraph = {
  id: "orthogonal_graph_001",
  type: "echarts",
  name: "正交关系图",
  icon: "🔗⊥",
  category: "graph",
  subCategory: "正交关系图",
  defaultProps: {
    title: {
      text: '正交关系图'
    },
    tooltip: {},
    series: [
      {
        name: '正交关系图',
        type: 'graph',
        layout: 'orthogonal',
        data: [
          { name: '节点1', x: 100, y: 100 },
          { name: '节点2', x: 200, y: 100 },
          { name: '节点3', x: 300, y: 100 },
          { name: '节点4', x: 200, y: 200 },
          { name: '节点5', x: 200, y: 300 }
        ],
        links: [
          { source: '节点1', target: '节点2' },
          { source: '节点2', target: '节点3' },
          { source: '节点2', target: '节点4' },
          { source: '节点4', target: '节点5' }
        ],
        lineStyle: {
          color: 'source',
          curveness: 0
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
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
            layout: { type: "string" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string" },
                  x: { type: "number" },
                  y: { type: "number" }
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
            lineStyle: { type: "object" },
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
      tooltip: { 
        type: "object", 
        title: "提示框设置"
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
                  name: { type: "string", title: "节点名称" },
                  x: { type: "number", title: "X坐标" },
                  y: { type: "number", title: "Y坐标" }
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
              title: "连线数据" 
            },
            lineStyle: { 
              type: "object", 
              properties: {
                color: { type: "string", title: "线条颜色" },
                curveness: { type: "number", title: "弯曲度" }
              },
              title: "线条样式" 
            },
            emphasis: { 
              type: "object", 
              properties: {
                focus: { type: "string", title: "聚焦策略" },
                lineStyle: { 
                  type: "object", 
                  properties: {
                    width: { type: "number", title: "线条宽度" }
                  },
                  title: "线条样式" 
                }
              },
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
  window.ComponentRegistry.register(OrthogonalGraph);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(OrthogonalGraph);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(OrthogonalGraph);
    }
  }, 100);
}
