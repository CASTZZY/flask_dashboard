// 能量桑基图组件
const EnergySankey = {
  id: "energy_sankey_001",
  type: "echarts",
  name: "能量桑基图",
  icon: "桑基E",
  category: "sankey",
  subCategory: "能量桑基图",
  defaultProps: {
    title: {
      text: '能量桑基图'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency'
        },
        nodeAlign: 'left',
        data: [
          { name: '能源1' },
          { name: '能源2' },
          { name: '能源3' },
          { name: '过程1' },
          { name: '过程2' },
          { name: '过程3' },
          { name: '结果1' },
          { name: '结果2' },
          { name: '结果3' }
        ],
        links: [
          { source: '能源1', target: '过程1', value: 10 },
          { source: '能源1', target: '过程2', value: 5 },
          { source: '能源2', target: '过程2', value: 15 },
          { source: '能源2', target: '过程3', value: 10 },
          { source: '能源3', target: '过程3', value: 20 },
          { source: '过程1', target: '结果1', value: 8 },
          { source: '过程1', target: '结果2', value: 2 },
          { source: '过程2', target: '结果2', value: 18 },
          { source: '过程2', target: '结果3', value: 2 },
          { source: '过程3', target: '结果3', value: 25 },
          { source: '过程3', target: '结果1', value: 5 }
        ],
        lineStyle: {
          color: 'source',
          curveness: 0.5
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
            type: { type: "string" },
            layout: { type: "string" },
            emphasis: { type: "object" },
            nodeAlign: { type: "string" },
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
      tooltip: { 
        type: "object", 
        properties: {
          trigger: { type: "string", title: "触发方式" },
          triggerOn: { type: "string", title: "触发条件" }
        },
        title: "提示框设置"
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
              properties: {
                focus: { type: "string", title: "聚焦策略" }
              },
              title: "高亮设置"
            },
            nodeAlign: { type: "string", title: "节点对齐方式" },
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
              title: "连线数据"
            },
            lineStyle: { 
              type: "object",
              properties: {
                color: { type: "string", title: "线条颜色" },
                curveness: { type: "number", title: "弯曲度" }
              },
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
  window.ComponentRegistry.register(EnergySankey);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(EnergySankey);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(EnergySankey);
    }
  }, 100);
}
