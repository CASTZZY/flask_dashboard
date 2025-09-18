// 降雨量折线图组件
const RainfallLine = {
  id: "rainfall_line_001",
  type: "echarts",
  name: "降雨量折线图",
  icon: "🌧️",
  category: "line",
  subCategory: "降雨量折线图",
  defaultProps: {
    title: {
      text: '降雨量折线图'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    series: [{
      name: '降雨量',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true,
      areaStyle: {
        color: 'rgba(0, 123, 255, 0.3)'
      },
      lineStyle: {
        color: '#007bff'
      },
      itemStyle: {
        color: '#007bff'
      }
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis: { 
        type: "array", 
        items: { type: "string" },
        title: "X轴数据"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            data: { type: "array", items: { type: "number" } },
            type: { type: "string" },
            smooth: { type: "boolean" },
            areaStyle: { type: "object" },
            lineStyle: { type: "object" },
            itemStyle: { type: "object" }
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
          trigger: { type: "string", title: "触发方式" }
        },
        title: "提示框设置"
      },
      xAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "X轴类型" },
          boundaryGap: { type: "boolean", title: "边界间隙" },
          data: { type: "array", items: { type: "string" }, title: "X轴数据" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          axisLabel: { 
            type: "object", 
            properties: {
              formatter: { type: "string", title: "标签格式" }
            },
            title: "轴标签设置" 
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
            data: { 
              type: "array", 
              items: { type: "number" }, 
              title: "系列数据" 
            },
            type: { type: "string", title: "图表类型" },
            smooth: { type: "boolean", title: "平滑曲线" },
            areaStyle: { 
              type: "object", 
              title: "面积样式" 
            },
            lineStyle: { 
              type: "object", 
              title: "线条样式" 
            },
            itemStyle: { 
              type: "object", 
              title: "标记样式" 
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
  window.ComponentRegistry.register(RainfallLine);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(RainfallLine);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(RainfallLine);
    }
  }, 100);
}
