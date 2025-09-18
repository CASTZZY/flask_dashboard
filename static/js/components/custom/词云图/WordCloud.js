// 词云图组件
const WordCloud = {
  id: "word_cloud_001",
  type: "echarts",
  name: "词云图",
  icon: "词云",
  category: "custom",
  subCategory: "词云图",
  defaultProps: {
    title: {
      text: '词云图'
    },
    tooltip: {
      show: true,
      formatter: function (params) {
        return params.name + ': ' + params.value;
      }
    },
    series: [
      {
        name: '词云图',
        type: 'wordCloud',
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        shape: 'circle',
        drawOutOfBound: false,
        textStyle: {
          normal: {
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: [
          { name: 'ECharts', value: 10000 },
          { name: '可视化', value: 8000 },
          { name: '数据', value: 7000 },
          { name: '图表', value: 6000 },
          { name: '组件', value: 5000 },
          { name: '配置', value: 4000 },
          { name: '渲染', value: 3000 },
          { name: '交互', value: 2000 },
          { name: '设计', value: 1500 },
          { name: '开发', value: 1000 }
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
            sizeRange: { type: "array", items: { type: "number" } },
            rotationRange: { type: "array", items: { type: "number" } },
            rotationStep: { type: "number" },
            gridSize: { type: "number" },
            shape: { type: "string" },
            drawOutOfBound: { type: "boolean" },
            textStyle: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string" },
                  value: { type: "number" }
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
          show: { type: "boolean", title: "是否显示提示框" },
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
            sizeRange: { 
              type: "array", 
              items: { type: "number" }, 
              title: "字体大小范围" 
            },
            rotationRange: { 
              type: "array", 
              items: { type: "number" }, 
              title: "旋转角度范围" 
            },
            rotationStep: { type: "number", title: "旋转步进值" },
            gridSize: { type: "number", title: "网格尺寸" },
            shape: { type: "string", title: "词云形状" },
            drawOutOfBound: { type: "boolean", title: "是否允许绘制出边界" },
            textStyle: { 
              type: "object",
              properties: {
                normal: { 
                  type: "object",
                  title: "普通样式"
                },
                emphasis: { 
                  type: "object",
                  properties: {
                    shadowBlur: { type: "number", title: "阴影模糊大小" },
                    shadowColor: { type: "string", title: "阴影颜色" }
                  },
                  title: "高亮样式"
                }
              },
              title: "文本样式"
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string", title: "词语" },
                  value: { type: "number", title: "权重值" }
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
  window.ComponentRegistry.register(WordCloud);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(WordCloud);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(WordCloud);
    }
  }, 100);
}
