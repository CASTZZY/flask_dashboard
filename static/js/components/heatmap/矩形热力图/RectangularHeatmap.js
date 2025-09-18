// 矩形热力图组件
const RectangularHeatmap = {
  id: "rectangular_heatmap_001",
  type: "echarts",
  name: "矩形热力图",
  icon: "▭热",
  category: "heatmap",
  subCategory: "矩形热力图",
  defaultProps: {
    title: {
      text: '矩形热力图'
    },
    tooltip: {
      position: 'top'
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
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center'
    },
    series: [{
      name: '矩形热力图',
      type: 'heatmap',
      data: [
        [0, 0, 5], [0, 1, 7], [0, 2, 3],
        [1, 0, 8], [1, 1, 6], [1, 2, 2],
        [2, 0, 4], [2, 1, 9], [2, 2, 5],
        [3, 0, 6], [3, 1, 3], [3, 2, 7],
        [4, 0, 2], [4, 1, 8], [4, 2, 4],
        [5, 0, 9], [5, 1, 5], [5, 2, 6],
        [6, 0, 3], [6, 1, 7], [6, 2, 8]
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
          data: { type: "array", items: { type: "string" } }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
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
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
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
      tooltip: { 
        type: "object", 
        properties: {
          position: { type: "string", title: "提示框位置" }
        },
        title: "提示框设置"
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
          orient: { type: "string", title: "布局朝向" },
          left: { type: "string", title: "水平位置" }
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
                title: "热力图数据[x, y, value]" 
              },
              title: "系列数据" 
            },
            label: { 
              type: "object", 
              properties: {
                show: { type: "boolean", title: "是否显示标签" }
              },
              title: "标签设置" 
            },
            emphasis: { 
              type: "object", 
              properties: {
                itemStyle: { 
                  type: "object", 
                  properties: {
                    shadowBlur: { type: "number", title: "阴影模糊大小" },
                    shadowColor: { type: "string", title: "阴影颜色" }
                  },
                  title: "图形样式" 
                }
              },
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
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(RectangularHeatmap);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(RectangularHeatmap);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(RectangularHeatmap);
    }
  }, 100);
}
