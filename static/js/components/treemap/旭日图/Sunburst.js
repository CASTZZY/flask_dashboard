// 旭日图组件
const Sunburst = {
  id: "sunburst_001",
  type: "echarts",
  name: "旭日图",
  icon: "☀️",
  category: "treemap",
  subCategory: "旭日图",
  defaultProps: {
    title: {
      text: '旭日图'
    },
    tooltip: {
      formatter: '{b}: {c}'
    },
    series: {
      name: '旭日图',
      type: 'sunburst',
      radius: ['15%', '80%'],
      center: ['50%', '50%'],
      sort: undefined,
      emphasis: {
        focus: 'ancestor'
      },
      levels: [
        {},
        {
          r0: '15%',
          r: '30%',
          itemStyle: {
            borderWidth: 2
          },
          label: {
            rotate: 'tangential'
          }
        },
        {
          r0: '30%',
          r: '50%',
          label: {
            align: 'right'
          }
        },
        {
          r0: '50%',
          r: '70%'
        }
      ],
      data: [
        {
          name: '节点1',
          value: 10
        },
        {
          name: '节点2',
          value: 20,
          children: [
            {
              name: '子节点1',
              value: 5
            },
            {
              name: '子节点2',
              value: 15
            }
          ]
        },
        {
          name: '节点3',
          value: 30,
          children: [
            {
              name: '子节点3',
              value: 10
            },
            {
              name: '子节点4',
              value: 20,
              children: [
                {
                  name: '叶子节点1',
                  value: 5
                },
                {
                  name: '叶子节点2',
                  value: 15
                }
              ]
            }
          ]
        }
      ]
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      series: { 
        type: "object",
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          radius: { type: "array", items: { type: "string" } },
          center: { type: "array", items: { type: "string" } },
          sort: { type: "string" },
          emphasis: { type: "object" },
          levels: { type: "array" },
          data: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                name: { type: "string" },
                value: { type: "number" },
                children: { type: "array" }
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
      tooltip: { 
        type: "object", 
        properties: {
          formatter: { type: "string", title: "提示框格式" }
        },
        title: "提示框设置"
      },
      series: { 
        type: "object",
        properties: {
          name: { type: "string", title: "系列名称" },
          type: { type: "string", title: "图表类型" },
          radius: { 
            type: "array", 
            items: { type: "string" }, 
            title: "内外半径" 
          },
          center: { 
            type: "array", 
            items: { type: "string" }, 
            title: "中心位置" 
          },
          sort: { type: "string", title: "排序方式" },
          emphasis: { 
            type: "object",
            properties: {
              focus: { type: "string", title: "聚焦策略" }
            },
            title: "高亮设置"
          },
          levels: { 
            type: "array",
            title: "层级设置"
          },
          data: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                name: { type: "string", title: "节点名称" },
                value: { type: "number", title: "节点值" },
                children: { 
                  type: "array",
                  title: "子节点"
                }
              }
            },
            title: "节点数据"
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
  window.ComponentRegistry.register(Sunburst);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Sunburst);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Sunburst);
    }
  }, 100);
}
