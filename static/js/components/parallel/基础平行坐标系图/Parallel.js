// 基础平行坐标系图组件
const Parallel = {
  id: "parallel_001",
  type: "echarts",
  name: "基础平行坐标系图",
  icon: "||",
  category: "parallel",
  subCategory: "平行坐标系图",
  defaultProps: {
    title: {
      text: '基础平行坐标系图'
    },
    parallelAxis: [{
      dim: 0,
      name: '维度1'
    }, {
      dim: 1,
      name: '维度2'
    }, {
      dim: 2,
      name: '维度3'
    }, {
      dim: 3,
      name: '维度4'
    }],
    parallel: {
      left: 40,
      right: 80,
      top: 50,
      bottom: 20,
      parallelAxisDefault: {
        type: 'value',
        nameLocation: 'end',
        nameGap: 20
      }
    },
    series: [{
      type: 'parallel',
      lineStyle: {
        width: 2
      },
      data: [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7],
        [5, 6, 7, 8]
      ]
    }]
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
        title: "平行轴设置"
      },
      parallel: { 
        type: "object",
        properties: {
          left: { type: "number" },
          right: { type: "number" },
          top: { type: "number" },
          bottom: { type: "number" },
          parallelAxisDefault: { type: "object" }
        },
        title: "平行坐标系设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string" },
            lineStyle: { type: "object" },
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
      parallelAxis: { 
        type: "array",
        items: { 
          type: "object",
          properties: {
            dim: { type: "number", title: "维度" },
            name: { type: "string", title: "名称" }
          }
        },
        title: "平行轴设置"
      },
      parallel: { 
        type: "object", 
        properties: {
          left: { type: "number", title: "左边距" },
          right: { type: "number", title: "右边距" },
          top: { type: "number", title: "上边距" },
          bottom: { type: "number", title: "下边距" },
          parallelAxisDefault: { type: "object", title: "默认轴设置" }
        },
        title: "平行坐标系设置"
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
  window.ComponentRegistry.register(Parallel);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Parallel);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Parallel);
    }
  }, 100);
}
