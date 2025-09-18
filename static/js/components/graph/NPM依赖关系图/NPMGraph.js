// NPM依赖关系图组件
const NPMGraph = {
  id: "graph_003",
  type: "echarts",
  name: "NPM依赖关系图",
  icon: "🔗",
  category: "graph",
  subCategory: "关系图系列",
  defaultProps: {
    title: {
      text: 'NPM依赖关系图'
    },
    tooltip: {
      formatter: '{b}'
    },
    series: [{
      type: 'graph',
      layout: 'force',
      symbolSize: 40,
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      data: [
        { name: 'echarts', symbolSize: 100 },
        { name: 'zrender', symbolSize: 80 },
        { name: 'lodash', symbolSize: 60 },
        { name: 'd3', symbolSize: 60 },
        { name: 'jquery', symbolSize: 50 },
        { name: 'react', symbolSize: 70 },
        { name: 'vue', symbolSize: 70 },
        { name: 'angular', symbolSize: 60 }
      ],
      links: [
        { source: 'echarts', target: 'zrender' },
        { source: 'echarts', target: 'lodash' },
        { source: 'd3', target: 'lodash' },
        { source: 'react', target: 'lodash' },
        { source: 'vue', target: 'lodash' },
        { source: 'angular', target: 'jquery' },
        { source: 'jquery', target: 'lodash' }
      ],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      },
      force: {
        repulsion: 1000,
        gravity: 0.1,
        edgeLength: 200,
        layoutAnimation: true
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
                  symbolSize: { type: "number" }
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
            force: { type: "object" }
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
            roam: { type: "boolean", title: "是否可缩放平移" },
            label: { type: "object", title: "标签设置" },
            edgeSymbol: { type: "array", items: { type: "string" }, title: "边符号" },
            edgeSymbolSize: { type: "array", items: { type: "number" }, title: "边符号大小" },
            lineStyle: { type: "object", title: "线样式" },
            force: { type: "object", title: "力引导设置" }
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
  window.ComponentRegistry.register(NPMGraph);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(NPMGraph);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(NPMGraph);
    }
  }, 100);
}
