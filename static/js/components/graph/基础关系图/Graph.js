// 基础关系图组件
const Graph = {
  id: "basic_graph_002",
  type: "echarts",
  name: "基础关系图",
  icon: "🔗",
  category: "graph",
  subCategory: "关系图",
  defaultProps: {
    title: {
      text: '基础关系图'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [{
      type: 'graph',
      layout: 'none',
      symbolSize: 50,
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      data: [{
        name: '节点1',
        x: 300,
        y: 300
      }, {
        name: '节点2',
        x: 800,
        y: 300
      }, {
        name: '节点3',
        x: 550,
        y: 100
      }, {
        name: '节点4',
        x: 550,
        y: 500
      }],
      links: [{
        source: 0,
        target: 1
      }, {
        source: 0,
        target: 2
      }, {
        source: 0,
        target: 3
      }],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
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
            symbolSize: { type: "number" },
            roam: { type: "boolean" },
            label: { type: "object" },
            edgeSymbol: { type: "array", items: { type: "string" } },
            edgeSymbolSize: { type: "array", items: { type: "number" } },
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
                  source: { type: "number" },
                  target: { type: "number" }
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
            symbolSize: { type: "number", title: "符号大小" },
            roam: { type: "boolean", title: "是否开启缩放平移" },
            label: { type: "object", title: "标签设置" },
            edgeSymbol: { 
              type: "array", 
              items: { type: "string" },
              title: "边符号"
            },
            edgeSymbolSize: { 
              type: "array", 
              items: { type: "number" },
              title: "边符号大小"
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
  window.ComponentRegistry.register(Graph);
}

// 导出组件
export default Graph;