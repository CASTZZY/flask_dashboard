// 基础热力图组件
const BasicHeatmap = {
  id: "basic_heatmap_002",
  type: "echarts",
  name: "基础热力图",
  icon: "热",
  category: "heatmap",
  subCategory: "基础热力图",
  defaultProps: {
    title: {
      text: '基础热力图'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'category',
      data: ['上午', '下午', '晚上']
    },
    visualMap: {
      min: 0,
      max: 50,
      calculable: true,
      orient: 'horizontal',
      left: 'center'
    },
    series: [{
      name: '热力图',
      type: 'heatmap',
      data: [
        [0, 0, 10], [0, 1, 15], [0, 2, 30],
        [1, 0, 20], [1, 1, 25], [1, 2, 35],
        [2, 0, 15], [2, 1, 30], [2, 2, 40],
        [3, 0, 25], [3, 1, 35], [3, 2, 45],
        [4, 0, 30], [4, 1, 40], [4, 2, 50],
        [5, 0, 35], [5, 1, 45], [5, 2, 55],
        [6, 0, 40], [6, 1, 50], [6, 2, 60]
      ],
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: {
            type: "array",
            items: { type: "string" }
          }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: {
            type: "array",
            items: { type: "string" }
          }
        },
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: { type: "number" }
              }
            },
            label: { type: "object" },
            emphasis: { type: "object" }
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
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string", title: "轴类型" },
          data: {
            type: "array",
            items: { type: "string" },
            title: "X轴数据"
          }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string", title: "轴类型" },
          data: {
            type: "array",
            items: { type: "string" },
            title: "Y轴数据"
          }
        },
        title: "Y轴设置"
      },
      visualMap: {
        type: "object",
        properties: {
          min: { type: "number", title: "最小值" },
          max: { type: "number", title: "最大值" },
          calculable: { type: "boolean", title: "是否显示拖拽手柄" },
          orient: { type: "string", title: "布局方式" },
          left: { type: "string", title: "位置" }
        },
        title: "视觉映射组件"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: { type: "number" },
                title: "热力图数据"
              },
              title: "数据项"
            },
            label: { 
              type: "object",
              title: "标签设置"
            },
            emphasis: { 
              type: "object",
              title: "高亮设置"
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
ComponentRegistry.register(BasicHeatmap);

// 导出组件
export default BasicHeatmap;