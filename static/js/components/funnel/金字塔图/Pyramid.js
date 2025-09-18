// 金字塔图组件
const Pyramid = {
  id: "pyramid_001",
  type: "echarts",
  name: "金字塔图",
  icon: "🔺",
  category: "funnel",
  subCategory: "金字塔图",
  defaultProps: {
    title: {
      text: '金字塔图'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: '金字塔图',
        type: 'funnel',
        sort: 'ascending',
        gap: 2,
        label: {
          show: true,
          position: 'left'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ]
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
            sort: { type: "string" },
            gap: { type: "number" },
            label: { type: "object" },
            labelLine: { type: "object" },
            itemStyle: { type: "object" },
            emphasis: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "number" },
                  name: { type: "string" }
                }
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
          trigger: { type: "string", title: "触发方式" },
          formatter: { type: "string", title: "提示框格式" }
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
            sort: { type: "string", title: "排序方式" },
            gap: { type: "number", title: "图形间隙" },
            label: { 
              type: "object",
              properties: {
                show: { type: "boolean", title: "是否显示标签" },
                position: { type: "string", title: "标签位置" }
              },
              title: "标签设置"
            },
            labelLine: { 
              type: "object",
              properties: {
                length: { type: "number", title: "标签线长度" },
                lineStyle: { 
                  type: "object",
                  properties: {
                    width: { type: "number", title: "线条宽度" },
                    type: { type: "string", title: "线条类型" }
                  },
                  title: "线条样式"
                }
              },
              title: "标签线设置"
            },
            itemStyle: { 
              type: "object",
              properties: {
                borderColor: { type: "string", title: "边框颜色" },
                borderWidth: { type: "number", title: "边框宽度" }
              },
              title: "图形样式"
            },
            emphasis: { 
              type: "object",
              properties: {
                label: { 
                  type: "object",
                  properties: {
                    fontSize: { type: "number", title: "字体大小" }
                  },
                  title: "标签设置"
                }
              },
              title: "高亮设置"
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  value: { type: "number", title: "数值" },
                  name: { type: "string", title: "名称" }
                }
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
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(Pyramid);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Pyramid);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Pyramid);
    }
  }, 100);
}
