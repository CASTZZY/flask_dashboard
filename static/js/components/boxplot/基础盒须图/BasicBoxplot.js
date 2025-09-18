// 盒须图组件
const BasicBoxplot = {
  id: "basic_boxplot_002",
  type: "echarts",
  name: "基础盒须图",
  icon: "盒",
  category: "boxplot",
  subCategory: "基础盒须图",
  defaultProps: {
    title: {
      text: '基础盒须图'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      boundaryGap: true
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '盒须图',
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
          data: { type: "array", items: { type: "string" } }
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
ComponentRegistry.register(BasicBoxplot);

// 导出组件
export default BasicBoxplot;