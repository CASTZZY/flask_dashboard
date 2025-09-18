// 基础树图组件
const Tree = {
  id: "tree_001",
  type: "echarts",
  name: "基础树图",
  icon: "🌲",
  category: "tree",
  subCategory: "树图",
  defaultProps: {
    title: {
      text: '基础树图'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [{
      type: 'tree',
      data: [{
        name: '根节点',
        children: [{
          name: '子节点1',
          children: [{
            name: '叶子节点1'
          }, {
            name: '叶子节点2'
          }]
        }, {
          name: '子节点2',
          children: [{
            name: '叶子节点3'
          }, {
            name: '叶子节点4'
          }]
        }]
      }],
      top: '1%',
      left: '7%',
      bottom: '1%',
      right: '20%',
      symbolSize: 7,
      lineStyle: {
        color: '#000',
        width: 2
      },
      itemStyle: {
        color: '#fff',
        borderColor: '#000'
      },
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 9
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        }
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
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
            data: { type: "array" },
            top: { type: "string" },
            left: { type: "string" },
            bottom: { type: "string" },
            right: { type: "string" },
            symbolSize: { type: "number" },
            lineStyle: { type: "object" },
            itemStyle: { type: "object" },
            label: { type: "object" },
            leaves: { type: "object" },
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
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string", title: "图表类型" },
            top: { type: "string", title: "上边距" },
            left: { type: "string", title: "左边距" },
            bottom: { type: "string", title: "下边距" },
            right: { type: "string", title: "右边距" },
            symbolSize: { type: "number", title: "符号大小" },
            lineStyle: { type: "object", title: "线条样式" },
            itemStyle: { type: "object", title: "节点样式" },
            label: { type: "object", title: "标签设置" },
            leaves: { type: "object", title: "叶子节点设置" },
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
  window.ComponentRegistry.register(Tree);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Tree);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Tree);
    }
  }, 100);
}
