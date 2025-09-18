// 多系列平行坐标系图组件
const MultipleParallel = {
  id: "multiple_parallel_001",
  type: "echarts",
  name: "多系列平行坐标系图",
  icon: "平行×2",
  category: "parallel",
  subCategory: "多系列平行坐标系图",
  defaultProps: {
    title: {
      text: '多系列平行坐标系图'
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.seriesName + '<br/>' + params.data.dimensions.join(', ');
      }
    },
    parallelAxis: [
      { dim: 0, name: '维度1' },
      { dim: 1, name: '维度2' },
      { dim: 2, name: '维度3' },
      { dim: 3, name: '维度4' },
      { dim: 4, name: '维度5' }
    ],
    parallel: {
      left: '5%',
      right: '13%',
      bottom: '10%',
      top: '20%'
    },
    series: [
      {
        name: '系列1',
        type: 'parallel',
        lineStyle: {
          width: 1
        },
        data: [
          [12.99, 100, 82, 90, 85],
          [9.99, 80, 77, 70, 76],
          [20, 120, 100, 110, 105],
          [3.2, 60, 55, 45, 50],
          [15.99, 90, 85, 80, 75]
        ]
      },
      {
        name: '系列2',
        type: 'parallel',
        lineStyle: {
          width: 1
        },
        data: [
          [10.99, 90, 75, 80, 78],
          [8.99, 75, 70, 65, 70],
          [18, 110, 95, 100, 98],
          [4.2, 65, 60, 50, 55],
          [13.99, 85, 80, 75, 72]
        ]
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      parallelAxis: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            dim: { type: "number" },
            name: { type: "string" }
          }
        },
        title: "平行坐标轴设置"
      },
      parallel: { 
        type: "object",
        properties: {
          left: { type: "string" },
          right: { type: "string" },
          bottom: { type: "string" },
          top: { type: "string" }
        },
        title: "平行坐标系布局设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            lineStyle: { type: "object" },
            data: { type: "array", items: { type: "array", items: { type: "number" } } }
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
          formatter: { type: "string", title: "提示框格式" }
        },
        title: "提示框设置"
      },
      parallelAxis: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            dim: { type: "number", title: "维度索引" },
            name: { type: "string", title: "轴名称" }
          }
        },
        title: "平行坐标轴设置"
      },
      parallel: { 
        type: "object",
        properties: {
          left: { type: "string", title: "左边距" },
          right: { type: "string", title: "右边距" },
          bottom: { type: "string", title: "下边距" },
          top: { type: "string", title: "上边距" }
        },
        title: "平行坐标系布局设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            lineStyle: { 
              type: "object",
              properties: {
                width: { type: "number", title: "线条宽度" }
              },
              title: "线条样式"
            },
            data: { 
              type: "array", 
              items: { 
                type: "array", 
                items: { type: "number" },
                title: "数据点"
              },
              title: "系列数据" 
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
  window.ComponentRegistry.register(MultipleParallel);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(MultipleParallel);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(MultipleParallel);
    }
  }, 100);
}
