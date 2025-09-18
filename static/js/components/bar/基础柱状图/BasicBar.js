// 基础柱状图组件
const BasicBar = {
  id: "bar_001",
  type: "echarts",
  name: "基础柱状图",
  icon: "📊",
  category: "bar",
  subCategory: "基础柱状图",
  defaultProps: {
    title: {
      text: '基础柱状图'
    },
    tooltip: {},
    legend: {
      show: true,
      top: 'bottom'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '销量',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130]
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
            type: { type: "string" }
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
          data: { type: "array", items: { type: "string" }, title: "X轴数据" }
        },
        title: "X轴设置"
      },
      yAxis: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" }
        },
        title: "Y轴设置"
      }
    }
  },
  // 使用ChartConfigSystem获取属性配置
  getProperties: function(currentConfig = {}) {
    if (window.ChartConfigSystem) {
      return window.ChartConfigSystem.generatePropertiesForChart('bar', currentConfig);
    }
    return [];
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 处理主题
    const theme = finalOptions.theme;
    delete finalOptions.theme; // 从配置中移除主题，因为echarts.init需要单独处理
    
    // 确保容器有正确的尺寸
    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
      container.style.width = '100%';
      container.style.height = '100%';
    }
    
    console.log('🎨 初始化ECharts实例，主题:', theme);
    console.log('📊 配置选项:', finalOptions);
    
    // 初始化ECharts实例
    const chart = echarts.init(container, theme);
    
    // 使用ChartConfigSystem处理配置，确保工具箱等功能正确应用
    let processedOptions = finalOptions;
    if (window.ChartConfigSystem) {
      processedOptions = window.ChartConfigSystem.processBarChartConfig(options, finalOptions);
    }
    
    // 使用notMerge和lazyUpdate确保主题完全应用
    chart.setOption(processedOptions, true, true);
    
    // 确保图表正确显示
    setTimeout(() => {
      chart.resize();
      console.log('✅ 图表渲染完成，主题:', theme);
    }, 0);
    
    return chart;
  }
};

// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(BasicBar);
  
  // 触发自定义事件通知组件已注册
  if (typeof CustomEvent !== 'undefined') {
    const event = new CustomEvent('componentRegistered', {
      detail: { componentId: BasicBar.id }
    });
    document.dispatchEvent(event);
  }
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicBar);
  
  // 触发自定义事件通知组件已注册
  if (typeof CustomEvent !== 'undefined') {
    const event = new CustomEvent('componentRegistered', {
      detail: { componentId: BasicBar.id }
    });
    document.dispatchEvent(event);
  }
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicBar);
      
      // 触发自定义事件通知组件已注册
      if (typeof CustomEvent !== 'undefined') {
        const event = new CustomEvent('componentRegistered', {
          detail: { componentId: BasicBar.id }
        });
        document.dispatchEvent(event);
      }
    }
  }, 100);
}