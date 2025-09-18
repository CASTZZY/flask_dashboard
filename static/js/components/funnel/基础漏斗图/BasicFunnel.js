// 基础漏斗图组件
const BasicFunnel = {
  id: "basic_funnel_002",
  type: "echarts",
  name: "基础漏斗图",
  icon: "漏斗",
  category: "funnel",
  subCategory: "基础漏斗图",
  defaultProps: {
    title: {
      text: '基础漏斗图'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    legend: {
      data: ['展现', '点击', '访问', '咨询', '订单']
    },
    series: [{
      name: '漏斗图',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
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
            name: { type: "string" },
            type: { type: "string" },
            left: { type: "string" },
            top: { type: "number" },
            bottom: { type: "number" },
            width: { type: "string" },
            min: { type: "number" },
            max: { type: "number" },
            minSize: { type: "string" },
            maxSize: { type: "string" },
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
          formatter: { type: "string", title: "提示框格式器" }
        },
        title: "提示框设置"
      },
      legend: {
        type: "object",
        properties: {
          data: { 
            type: "array", 
            items: { type: "string" },
            title: "图例数据"
          }
        },
        title: "图例设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            left: { type: "string", title: "左边距" },
            top: { type: "number", title: "上边距" },
            bottom: { type: "number", title: "下边距" },
            width: { type: "string", title: "宽度" },
            min: { type: "number", title: "最小值" },
            max: { type: "number", title: "最大值" },
            minSize: { type: "string", title: "最小尺寸" },
            maxSize: { type: "string", title: "最大尺寸" },
            sort: { type: "string", title: "排序方式" },
            gap: { type: "number", title: "间隔" },
            label: { 
              type: "object",
              title: "标签设置"
            },
            labelLine: { 
              type: "object",
              title: "标签线设置"
            },
            itemStyle: { 
              type: "object",
              title: "图形样式"
            },
            emphasis: { 
              type: "object",
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
ComponentRegistry.register(BasicFunnel);

// 导出组件
export default BasicFunnel;