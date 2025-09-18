// 正交树图组件
const OrthogonalTree = {
  id: "orthogonal_tree_001",
  type: "echarts",
  name: "正交树图",
  icon: "🌲⊥",
  category: "tree",
  subCategory: "正交树图",
  defaultProps: {
    title: {
      text: '正交树图'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        name: '正交树图',
        type: 'tree',
        layout: 'orthogonal',
        data: [{
          name: '根节点',
          children: [
            {
              name: '子节点1',
              children: [
                { name: '叶子节点1' },
                { name: '叶子节点2' },
                { name: '叶子节点3' }
              ]
            },
            {
              name: '子节点2',
              children: [
                { name: '叶子节点4' },
                { name: '叶子节点5' }
              ]
            },
            {
              name: '子节点3',
              children: [
                { name: '叶子节点6' },
                { name: '叶子节点7' },
                { name: '叶子节点8' },
                { name: '叶子节点9' }
              ]
            }
          ]
        }],
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
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
                  children: { type: "array" }
                }
              }
            },
            label: { type: "object" },
            leaves: { type: "object" },
            emphasis: { type: "object" },
            expandAndCollapse: { type: "boolean" },
            animationDuration: { type: "number" },
            animationDurationUpdate: { type: "number" }
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
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            layout: { type: "string", title: "布局方式" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string", title: "节点名称" },
                  children: { 
                    type: "array",
                    title: "子节点"
                  }
                }
              },
              title: "节点数据"
            },
            label: { 
              type: "object",
              title: "标签设置"
            },
            leaves: { 
              type: "object",
              title: "叶子节点设置"
            },
            emphasis: { 
              type: "object",
              title: "高亮设置"
            },
            expandAndCollapse: { type: "boolean", title: "是否开启折叠" },
            animationDuration: { type: "number", title: "初始动画时长" },
            animationDurationUpdate: { type: "number", title: "更新动画时长" }
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
  window.ComponentRegistry.register(OrthogonalTree);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(OrthogonalTree);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(OrthogonalTree);
    }
  }, 100);
}
