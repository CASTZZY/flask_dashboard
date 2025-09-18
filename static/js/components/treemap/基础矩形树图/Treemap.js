// 基础矩形树图组件
const Treemap = {
  id: "treemap_001",
  type: "echarts",
  name: "基础矩形树图",
  icon: "🧱",
  category: "treemap",
  subCategory: "矩形树图",
  defaultProps: {
    title: {
      text: '基础矩形树图'
    },
    tooltip: {
      formatter: function (info) {
        var value = info.value;
        var treePathInfo = info.treePathInfo;
        var treePath = [];
        for (var i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }
        return [
          '<div class="tooltip-title">' + treePath.join(' / ') + '</div>',
          '数值: ' + value
        ].join('');
      }
    },
    series: [{
      name: '矩形树图',
      type: 'treemap',
      visibleMin: 300,
      label: {
        show: true,
        formatter: '{b}'
      },
      itemStyle: {
        borderColor: '#fff'
      },
      levels: [{
        itemStyle: {
          borderColor: '#777',
          borderWidth: 0,
          gapWidth: 1
        },
        upperLabel: {
          show: false
        }
      }, {
        itemStyle: {
          borderColor: '#555',
          borderWidth: 5,
          gapWidth: 1
        },
        emphasis: {
          itemStyle: {
            borderColor: '#ddd'
          }
        }
      }, {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: 5,
          gapWidth: 1,
          borderColorSaturation: 0.6
        }
      }],
      data: [{
        name: '节点1',
        value: 600,
        children: [{
          name: '子节点1',
          value: 200
        }, {
          name: '子节点2',
          value: 400
        }]
      }, {
        name: '节点2',
        value: 800,
        children: [{
          name: '子节点3',
          value: 300
        }, {
          name: '子节点4',
          value: 500
        }]
      }]
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
            visibleMin: { type: "number" },
            label: { type: "object" },
            itemStyle: { type: "object" },
            levels: { type: "array" },
            data: { type: "array" }
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
            visibleMin: { type: "number", title: "最小可见值" },
            label: { type: "object", title: "标签设置" },
            itemStyle: { type: "object", title: "节点样式" },
            levels: { type: "array", title: "层级设置" }
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
  window.ComponentRegistry.register(Treemap);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Treemap);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Treemap);
    }
  }, 100);
}
