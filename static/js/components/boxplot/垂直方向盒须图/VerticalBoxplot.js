// 垂直方向盒须图组件
const VerticalBoxplot = {
  id: "boxplot_003",
  type: "echarts",
  name: "垂直方向盒须图",
  icon: "📊",
  category: "boxplot",
  subCategory: "盒须图系列",
  defaultProps: {
    title: {
      text: '垂直方向盒须图'
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '数值',
      splitArea: {
        show: true
      }
    },
    series: [{
      name: '盒须图',
      type: 'boxplot',
      data: [
        [850, 740, 900, 1070, 930],
        [960, 840, 1000, 1170, 1030],
        [870, 780, 950, 1120, 980],
        [1040, 940, 1100, 1270, 1130],
        [910, 810, 970, 1140, 1000],
        [980, 880, 1040, 1210, 1070],
        [1050, 950, 1110, 1280, 1140]
      ],
      tooltip: {
        formatter: function (param) {
          return [
            '实验 ' + param.name + ': ',
            '上须: ' + param.data[4],
            'Q3: ' + param.data[3],
            '中位数: ' + param.data[2],
            'Q1: ' + param.data[1],
            '下须: ' + param.data[0]
          ].join('<br/>');
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
          data: { type: "array", items: { type: "string" } },
          boundaryGap: { type: "boolean" },
          nameGap: { type: "number" },
          splitArea: { type: "object" },
          splitLine: { type: "object" }
        },
        title: "X轴数据"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          name: { type: "string" },
          splitArea: { type: "object" }
        },
        title: "Y轴数据"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
            tooltip: { type: "object" }
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
          type: { type: "string", title: "X轴类型" },
          data: { type: "array", items: { type: "string" }, title: "X轴数据" },
          boundaryGap: { type: "boolean", title: "边界间隙" },
          nameGap: { type: "number", title: "名称间隙" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          name: { type: "string", title: "Y轴名称" }
        },
        title: "Y轴设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            tooltip: { type: "object", title: "提示框设置" }
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
  window.ComponentRegistry.register(VerticalBoxplot);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(VerticalBoxplot);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(VerticalBoxplot);
    }
  }, 100);
}
