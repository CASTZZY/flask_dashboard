// 基础桑基图组件
const Sankey = {
  id: "basic_sankey_002",
  type: "echarts",
  name: "基础桑基图",
  icon: "🔗",
  category: "sankey",
  subCategory: "桑基图",
  defaultProps: {
    title: {
      text: '基础桑基图'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [{
      type: 'sankey',
      layout: 'none',
      focusNodeAdjacency: 'allEdges',
      data: [{
        name: '节点1'
      }, {
        name: '节点2'
      }, {
        name: '节点3'
      }, {
        name: '节点4'
      }, {
        name: '节点5'
      }],
      links: [{
        source: '节点1',
        target: '节点2',
        value: 20
      }, {
        source: '节点1',
        target: '节点3',
        value: 30
      }, {
        source: '节点2',
        target: '节点4',
        value: 15
      }, {
        source: '节点3',
        target: '节点4',
        value: 25
      }, {
        source: '节点3',
        target: '节点5',
        value: 5
      }],
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
            focusNodeAdjacency: { type: "string" },
            data: { type: "array" },
            links: { type: "array" },
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
            focusNodeAdjacency: { type: "string", title: "聚焦节点邻接" },
            lineStyle: { type: "object", title: "线条样式" }
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
ComponentRegistry.register(Sankey);

// 导出组件
export default Sankey;