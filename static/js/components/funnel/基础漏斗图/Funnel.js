// 基础漏斗图组件
const Funnel = {
  id: "funnel_001",
  type: "echarts",
  name: "基础漏斗图",
  icon: "漏斗",
  category: "funnel",
  subCategory: "漏斗图",
  defaultProps: {
    title: {
      text: '基础漏斗图'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
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
        {value: 60, name: '访问'},
        {value: 40, name: '咨询'},
        {value: 20, name: '订单'},
        {value: 80, name: '点击'},
        {value: 100, name: '展现'}
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
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            left: { type: "string", title: "左边距" },
            top: { type: "number", title: "上边距" },
            bottom: { type: "number", title: "下边距" },
            width: { type: "string", title: "宽度" },
            min: { type: "number", title: "最小值" },
            max: { type: "number", title: "最大值" },
            minSize: { type: "string", title: "最小尺寸" },
            maxSize: { type: "string", title: "最大尺寸" },
            sort: { type: "string", title: "排序方式" },
            gap: { type: "number", title: "间隔" }
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
  window.ComponentRegistry.register(Funnel);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Funnel);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Funnel);
    }
  }, 100);
}
