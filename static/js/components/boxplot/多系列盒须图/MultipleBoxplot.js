// 多系列盒须图组件
const MultipleBoxplot = {
  id: "multiple_boxplot_001",
  type: "echarts",
  name: "多系列盒须图",
  icon: "盒×2",
  category: "boxplot",
  subCategory: "多系列盒须图",
  defaultProps: {
    title: {
      text: '多系列盒须图'
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['系列1', '系列2']
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      boundaryGap: true
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '系列1',
        type: 'boxplot',
        data: [
          [850, 740, 900, 1070, 930],
          [960, 880, 940, 1100, 1010],
          [920, 810, 910, 1030, 950],
          [870, 780, 850, 1010, 920],
          [940, 860, 920, 1090, 980],
          [910, 830, 890, 1050, 960],
          [880, 800, 860, 1020, 940]
        ],
        tooltip: {
          formatter: function (param) {
            return [
              '系列1 ' + param.name + ': ',
              '上限: ' + param.data[5],
              '上四分位数: ' + param.data[4],
              '中位数: ' + param.data[3],
              '下四分位数: ' + param.data[2],
              '下限: ' + param.data[1]
            ].join('<br/>');
          }
        }
      },
      {
        name: '系列2',
        type: 'boxplot',
        data: [
          [800, 700, 850, 1000, 900],
          [900, 820, 900, 1050, 950],
          [880, 780, 880, 1000, 920],
          [840, 750, 820, 980, 880],
          [910, 830, 890, 1060, 940],
          [890, 810, 870, 1030, 930],
          [860, 780, 840, 1000, 910]
        ],
        tooltip: {
          formatter: function (param) {
            return [
              '系列2 ' + param.name + ': ',
              '上限: ' + param.data[5],
              '上四分位数: ' + param.data[4],
              '中位数: ' + param.data[3],
              '下四分位数: ' + param.data[2],
              '下限: ' + param.data[1]
            ].join('<br/>');
          }
        }
      }
    ]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } },
          boundaryGap: { type: "boolean" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string" }
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
      xAxis: { 
        type: "object",
        properties: {
          type: { type: "string", title: "轴类型" },
          data: {
            type: "array",
            items: { type: "string" },
            title: "X轴数据"
          },
          boundaryGap: { type: "boolean", title: "边界间隙" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object",
        properties: {
          type: { type: "string", title: "轴类型" }
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
            data: { 
              type: "array", 
              items: { 
                type: "array",
                items: { type: "number" },
                title: "盒须图数据"
              },
              title: "数据项"
            },
            tooltip: { 
              type: "object",
              title: "提示框设置"
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
  window.ComponentRegistry.register(MultipleBoxplot);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(MultipleBoxplot);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(MultipleBoxplot);
    }
  }, 100);
}
