// 矩形树图组件
const Treemap = {
  id: "panshi_treemap_001",
  type: "echarts",
  name: "矩形树图",
  icon: "矩形树",
  category: "treemap",
  subCategory: "矩形树图",
  defaultProps: {
    title: {
      text: '矩形树图'
    },
    tooltip: {
      formatter: '{b}: {c}'
    },
    series: [
      {
        name: '矩形树图',
        type: 'treemap',
        visibleMin: 300,
        label: {
          show: true,
          formatter: '{b}'
        },
        itemStyle: {
          borderColor: '#fff'
        },
        levels: [
          {
            itemStyle: {
              borderColor: '#777',
              borderWidth: 0,
              gapWidth: 1
            },
            upperLabel: {
              show: false
            }
          },
          {
            itemStyle: {
              borderColor: '#555',
              borderWidth: 5,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: '#ddd'
              }
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              borderWidth: 5,
              gapWidth: 1,
              borderColorSaturation: 0.6
            }
          }
        ],
        data: [
          {
            name: '节点1',
            value: 10
          },
          {
            name: '节点2',
            value: 20,
            children: [
              {
                name: '子节点1',
                value: 5
              },
              {
                name: '子节点2',
                value: 15
              }
            ]
          },
          {
            name: '节点3',
            value: 30,
            children: [
              {
                name: '子节点3',
                value: 10
              },
              {
                name: '子节点4',
                value: 20,
                children: [
                  {
                    name: '叶子节点1',
                    value: 5
                  },
                  {
                    name: '叶子节点2',
                    value: 15
                  }
                ]
              }
            ]
          }
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
            visibleMin: { type: "number" },
            label: { type: "object" },
            itemStyle: { type: "object" },
            levels: { type: "array" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string" },
                  value: { type: "number" },
                  children: { type: "array" }
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
            visibleMin: { type: "number", title: "显示最小值" },
            label: { 
              type: "object",
              properties: {
                show: { type: "boolean", title: "是否显示标签" },
                formatter: { type: "string", title: "标签格式" }
              },
              title: "标签设置"
            },
            itemStyle: { 
              type: "object",
              properties: {
                borderColor: { type: "string", title: "边框颜色" }
              },
              title: "图形样式"
            },
            levels: { 
              type: "array",
              title: "层级设置"
            },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string", title: "节点名称" },
                  value: { type: "number", title: "节点值" },
                  children: { 
                    type: "array",
                    title: "子节点"
                  }
                }
              },
              title: "节点数据"
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
ComponentRegistry.register(Treemap);

// 导出组件
export default Treemap;