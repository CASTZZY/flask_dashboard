// 改进的3D柱状图组件
const Bar3DImproved = {
  id: "bar3d_improved_001",
  type: "echarts",
  name: "改进3D柱状图",
  icon: "📊",
  category: "bar",
  subCategory: "3D图表",
  defaultProps: {
    title: {
      text: '改进3D柱状图'
    },
    tooltip: {},
    xAxis3D: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月']
    },
    yAxis3D: {
      type: 'category',
      data: ['类别1', '类别2', '类别3']
    },
    zAxis3D: {
      type: 'value',
      name: '数值'
    },
    grid3D: {
      viewControl: {
        projection: 'perspective',
        alpha: 20,
        beta: 40,
        autoRotate: true,
        autoRotateSpeed: 2
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    series: [{
      type: 'bar3D',
      data: generateBar3DData(),
      shading: 'lambert',
      label: {
        show: false
      },
      itemStyle: {
        opacity: 0.9
      },
      emphasis: {
        label: {
          show: true
        }
      }
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      xAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
        },
        title: "X轴数据"
      },
      yAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          data: { type: "array", items: { type: "string" } }
        },
        title: "Y轴数据"
      },
      zAxis3D: { 
        type: "object",
        properties: {
          type: { type: "string" },
          name: { type: "string" }
        },
        title: "Z轴数据"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            type: { type: "string" },
            data: { type: "array", items: { type: "array", items: { type: "number" } } },
            shading: { type: "string" },
            label: { type: "object" },
            itemStyle: { type: "object" },
            emphasis: { type: "object" }
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
      xAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "X轴类型" },
          data: { type: "array", items: { type: "string" }, title: "X轴数据" }
        },
        title: "X轴设置"
      },
      yAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Y轴类型" },
          data: { type: "array", items: { type: "string" }, title: "Y轴数据" }
        },
        title: "Y轴设置"
      },
      zAxis3D: { 
        type: "object", 
        properties: {
          type: { type: "string", title: "Z轴类型" },
          name: { type: "string", title: "Z轴名称" }
        },
        title: "Z轴设置"
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

// 生成3D柱状图数据
function generateBar3DData() {
  const data = [];
  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 3; y++) {
      const z = Math.random() * 100;
      data.push([x, y, z]);
    }
  }
  return data;
}

// 注册组件
ComponentRegistry.register(Bar3DImproved);

// 导出组件
export default Bar3DImproved;