// 平行坐标系图组件
const BasicParallel = {
  id: "basic_parallel_001",
  type: "echarts",
  name: "基础平行坐标系图",
  icon: "平行",
  category: "parallel",
  subCategory: "基础平行坐标系图",
  defaultProps: {
    title: {
      text: '基础平行坐标系图'
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
      parallelAxisDefault: {
        type: 'value',
        nameLocation: 'end',
        nameGap: 20
      }
    },
    series: [{
      name: '平行坐标系图',
      type: 'parallel',
      lineStyle: {
        width: 2
      },
      data: [
        [12.99, 100, 82, 90, 70],
        [13.99, 200, 92, 85, 65],
        [14.99, 300, 72, 75, 80],
        [15.99, 400, 62, 65, 85],
        [16.99, 500, 52, 55, 90],
        [17.99, 600, 42, 45, 95],
        [18.99, 700, 32, 35, 100]
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
        title: "平行坐标轴设置"
      },
      parallel: { 
        type: "object",
        properties: {
          left: { type: "string" },
          right: { type: "string" },
          bottom: { type: "string" },
          parallelAxisDefault: { type: "object" }
        },
        title: "平行坐标系设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            lineStyle: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: { type: "number" }
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
      parallelAxis: { 
        type: "array",
        items: {
          type: "object",
          properties: {
            dim: { type: "number", title: "维度" },
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
          parallelAxisDefault: { 
            type: "object",
            title: "坐标轴默认设置"
          }
        },
        title: "平行坐标系设置"
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
              title: "线条样式"
            },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: { type: "number" },
                title: "平行坐标系数据"
              },
              title: "数据项"
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
ComponentRegistry.register(BasicParallel);

// 导出组件
export default BasicParallel;