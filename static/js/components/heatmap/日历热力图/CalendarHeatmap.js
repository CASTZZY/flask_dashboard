// 日历热力图组件
const CalendarHeatmap = {
  id: "calendar_heatmap_001",
  type: "echarts",
  name: "日历热力图",
  icon: "📅热",
  category: "heatmap",
  subCategory: "日历热力图",
  defaultProps: {
    title: {
      text: '日历热力图'
    },
    tooltip: {
      position: 'top'
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'horizontal',
      left: 'center'
    },
    calendar: {
      top: 80,
      left: 30,
      right: 30,
      cellSize: ['auto', 20],
      range: ['2023-01-01', '2023-12-31'],
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: false }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: (function () {
        var data = [];
        for (var i = 1; i < 366; i++) {
          var date = new Date(2023, 0, i);
          var formattedDate = date.getFullYear() + '-' + 
            (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
            date.getDate().toString().padStart(2, '0');
          data.push([formattedDate, Math.round(Math.random() * 1000)]);
        }
        return data;
      })()
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      calendar: { 
        type: "object",
        properties: {
          top: { type: "number" },
          left: { type: "number" },
          right: { type: "number" },
          cellSize: { type: "array", items: { type: ["string", "number"] } },
          range: { type: "array", items: { type: "string" } },
          itemStyle: { type: "object" },
          yearLabel: { type: "object" }
        },
        title: "日历设置"
      },
      series: { 
        type: "object",
        properties: {
          type: { type: "string" },
          coordinateSystem: { type: "string" },
          data: { type: "array", items: { type: "array", items: { type: ["string", "number"] } } }
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
          position: { type: "string", title: "提示框位置" }
        },
        title: "提示框设置"
      },
      visualMap: { 
        type: "object", 
        properties: {
          min: { type: "number", title: "最小值" },
          max: { type: "number", title: "最大值" },
          calculable: { type: "boolean", title: "是否显示拖拽手柄" },
          orient: { type: "string", title: "布局朝向" },
          left: { type: "string", title: "水平位置" }
        },
        title: "视觉映射组件"
      },
      calendar: { 
        type: "object",
        properties: {
          top: { type: "number", title: "顶部边距" },
          left: { type: "number", title: "左边距" },
          right: { type: "number", title: "右边距" },
          cellSize: { 
            type: "array", 
            items: { type: ["string", "number"] }, 
            title: "单元格大小" 
          },
          range: { 
            type: "array", 
            items: { type: "string" }, 
            title: "日期范围" 
          },
          itemStyle: { 
            type: "object", 
            properties: {
              borderWidth: { type: "number", title: "边框宽度" }
            },
            title: "图形样式" 
          },
          yearLabel: { 
            type: "object", 
            properties: {
              show: { type: "boolean", title: "是否显示年标签" }
            },
            title: "年标签设置" 
          }
        },
        title: "日历设置"
      },
      series: { 
        type: "object",
        properties: {
          type: { type: "string", title: "图表类型" },
          coordinateSystem: { type: "string", title: "坐标系" },
          data: { 
            type: "array", 
            items: { 
              type: "array", 
              items: { type: ["string", "number"] },
              title: "热力图数据[date, value]" 
            },
            title: "系列数据" 
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
  window.ComponentRegistry.register(CalendarHeatmap);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(CalendarHeatmap);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(CalendarHeatmap);
    }
  }, 100);
}
