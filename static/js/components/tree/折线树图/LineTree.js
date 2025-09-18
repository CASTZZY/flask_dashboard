// 折线树图组件
const LineTree = {
  id: "tree_003",
  type: "echarts",
  name: "折线树图",
  icon: "🌳",
  category: "tree",
  subCategory: "树图系列",
  defaultProps: {
    title: {
      text: '折线树图'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [{
      type: 'tree',
      data: [{
        name: 'flare',
        children: [
          {
            name: 'analytics',
            children: [
              {
                name: 'cluster',
                children: [
                  { name: 'AgglomerativeCluster', value: 3938 },
                  { name: 'CommunityStructure', value: 3812 },
                  { name: 'HierarchicalCluster', value: 6714 },
                  { name: 'MergeEdge', value: 743 }
                ]
              },
              {
                name: 'graph',
                children: [
                  { name: 'BetweennessCentrality', value: 3534 },
                  { name: 'LinkDistance', value: 5731 },
                  { name: 'MaxFlowMinCut', value: 7840 },
                  { name: 'ShortestPaths', value: 5914 },
                  { name: 'SpanningTree', value: 3416 }
                ]
              },
              {
                name: 'optimization',
                children: [
                  { name: 'AspectRatioBanker', value: 7074 }
                ]
              }
            ]
          },
          {
            name: 'animate',
            children: [
              { name: 'Easing', value: 17010 },
              { name: 'FunctionSequence', value: 5842 },
              {
                name: 'interpolate',
                children: [
                  { name: 'ArrayInterpolator', value: 1983 },
                  { name: 'ColorInterpolator', value: 2047 },
                  { name: 'DateInterpolator', value: 1375 },
                  { name: 'Interpolator', value: 8746 },
                  { name: 'MatrixInterpolator', value: 2202 },
                  { name: 'NumberInterpolator', value: 1382 },
                  { name: 'ObjectInterpolator', value: 1629 },
                  { name: 'PointInterpolator', value: 1675 },
                  { name: 'RectangleInterpolator', value: 2042 }
                ]
              },
              { name: 'ISchedulable', value: 1041 },
              { name: 'Parallel', value: 5176 },
              { name: 'Pause', value: 449 },
              { name: 'Scheduler', value: 5593 },
              { name: 'Sequence', value: 5534 },
              { name: 'Transition', value: 9201 },
              { name: 'Transitioner', value: 19975 },
              { name: 'TransitionEvent', value: 1116 },
              { name: 'Tween', value: 6006 }
            ]
          }
        ]
      }],
      top: '1%',
      left: '7%',
      bottom: '1%',
      right: '20%',
      symbolSize: 7,
      symbol: 'circle',
      orient: 'vertical',
      lineStyle: {
        color: '#000',
        width: 1,
        type: 'solid'
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
            symbol: { type: "string" },
            orient: { type: "string" },
            lineStyle: { type: "object" },
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
            symbol: { type: "string", title: "符号类型" },
            orient: { type: "string", title: "方向" },
            lineStyle: { type: "object", title: "线样式" },
            label: { type: "object", title: "标签设置" },
            leaves: { type: "object", title: "叶节点设置" },
            expandAndCollapse: { type: "boolean", title: "展开折叠" },
            animationDuration: { type: "number", title: "动画时长" },
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
  window.ComponentRegistry.register(LineTree);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(LineTree);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(LineTree);
    }
  }, 100);
}
