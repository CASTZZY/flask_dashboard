// 基础盒须图组件
const Boxplot = {
  id: "boxplot_001",
  type: "echarts",
  name: "基础盒须图",
  icon: "📦",
  category: "boxplot",
  subCategory: "盒须图",
  defaultProps: {
    title: {
      text: '基础盒须图'
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['类别1', '类别2', '类别3', '类别4', '类别5'],
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
        [960, 880, 1020, 1230, 1040],
        [940, 830, 980, 1150, 1000],
        [890, 780, 950, 1100, 960],
        [920, 810, 970, 1120, 990]
      ],
      tooltip: {
        formatter: function (param) {
          return [
            '实验 ' + param.name + ': ',
            '上限: ' + param.data[5],
            '上四分位数: ' + param.data[4],
            '中位数: ' + param.data[3],
            '下四分位数: ' + param.data[2],
            '下限: ' + param.data[1]
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
          nameGap: { type: "number", title: "坐标轴名称与轴线距离" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          name: { type: "string", title: "坐标轴名称" },
          splitArea: { type: "object", title: "分割区域" }
        },
        title: "Y轴设置"
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
  window.ComponentRegistry.register(Boxplot);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(Boxplot);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(Boxplot);
    }
  }, 100);
}
