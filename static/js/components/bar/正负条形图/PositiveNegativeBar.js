// 正负条形图组件
const PositiveNegativeBar = {
  id: "positive_negative_bar_001",
  type: "echarts",
  name: "正负条形图",
  icon: "±📊",
  category: "bar",
  subCategory: "正负条形图",
  defaultProps: {
    title: {
      text: '正负条形图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['收入', '支出']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    series: [
      {
        name: '收入',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: [320, 302, 341, 374, 390, 450, 420]
      },
      {
        name: '支出',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideLeft'
        },
        data: [-120, -132, -101, -134, -90, -230, -210]
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string" }
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
            stack: { type: "string" },
            label: { type: "object" },
            data: { type: "array", items: { type: "number" } }
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
          axisPointer: { 
            type: "object", 
            properties: {
              type: { type: "string", title: "指示器类型" }
            },
            title: "坐标轴指示器" 
          }
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
      grid: { 
        type: "object", 
        properties: {
          left: { type: "string", title: "左边距" },
          right: { type: "string", title: "右边距" },
          bottom: { type: "string", title: "下边距" },
          containLabel: { type: "boolean", title: "包含标签" }
        },
        title: "网格设置"
      },
      xAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "X轴类型" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          data: { 
            type: "array", 
            items: { type: "string" }, 
            title: "Y轴数据" 
          }
        },
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            type: { type: "string", title: "图表类型" },
            stack: { type: "string", title: "堆叠组" },
            label: { 
              type: "object", 
              properties: {
                show: { type: "boolean", title: "是否显示标签" },
                position: { type: "string", title: "标签位置" }
              },
              title: "标签设置" 
            },
            data: { 
              type: "array", 
              items: { type: "number" }, 
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
  window.ComponentRegistry.register(PositiveNegativeBar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(PositiveNegativeBar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(PositiveNegativeBar);
    }
  }, 100);
}
