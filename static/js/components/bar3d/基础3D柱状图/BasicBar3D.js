// 基础3D柱状图组件
const BasicBar3D = {
    id: 'bar3d_001',
    name: '基础3D柱状图',
    type: 'bar3D',
    category: '3D图表',
    icon: 'chart-bar',
    description: '基础的3D柱状图，支持三维数据的柱状展示',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '基础3D柱状图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.seriesName + '<br/>' +
                       'X: ' + params.value[0] + '<br/>' +
                       'Y: ' + params.value[1] + '<br/>' +
                       'Z: ' + params.value[2];
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 100,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', 
                       '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            left: 'left',
            top: 'center'
        },
        xAxis3D: {
            type: 'value',
            name: 'X轴',
            nameTextStyle: {
                color: '#333'
            }
        },
        yAxis3D: {
            type: 'value',
            name: 'Y轴',
            nameTextStyle: {
                color: '#333'
            }
        },
        zAxis3D: {
            type: 'value',
            name: 'Z轴',
            nameTextStyle: {
                color: '#333'
            }
        },
        grid3D: {
            boxWidth: 200,
            boxDepth: 200,
            boxHeight: 200,
            axisLine: {
                lineStyle: {
                    color: '#333'
                }
            },
            axisPointer: {
                lineStyle: {
                    color: '#333'
                }
            },
            viewControl: {
                autoRotate: false,
                distance: 300,
                alpha: 30,
                beta: 40
            },
            light: {
                main: {
                    shadow: true,
                    quality: 'medium',
                    intensity: 1.2
                },
                ambient: {
                    intensity: 0.3
                }
            }
        },
        series: [{
            type: 'bar3D',
            name: '数据',
            data: [],
            shading: 'lambert',
            label: {
                show: false,
                formatter: function (param) {
                    return param.value[2].toFixed(1);
                }
            }
        }]
    },
    
    // 示例数据
    sampleData: [
        [0, 0, 10], [1, 0, 20], [2, 0, 30],
        [0, 1, 15], [1, 1, 25], [2, 1, 35],
        [0, 2, 12], [1, 2, 22], [2, 2, 32],
        [0, 3, 18], [1, 3, 28], [2, 3, 38]
    ],
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '基础3D柱状图'
        },
        boxWidth: {
            type: 'number',
            label: '3D盒子宽度',
            value: 200,
            min: 50,
            max: 500
        },
        boxDepth: {
            type: 'number',
            label: '3D盒子深度',
            value: 200,
            min: 50,
            max: 500
        },
        boxHeight: {
            type: 'number',
            label: '3D盒子高度',
            value: 200,
            min: 50,
            max: 500
        },
        autoRotate: {
            type: 'boolean',
            label: '自动旋转',
            value: false
        },
        distance: {
            type: 'number',
            label: '视角距离',
            value: 300,
            min: 100,
            max: 1000
        },
        alpha: {
            type: 'number',
            label: '上下旋转角度',
            value: 30,
            min: -90,
            max: 90
        },
        beta: {
            type: 'number',
            label: '左右旋转角度',
            value: 40,
            min: -180,
            max: 180
        },
        showLabel: {
            type: 'boolean',
            label: '显示标签',
            value: false
        },
        shading: {
            type: 'select',
            label: '着色方式',
            value: 'lambert',
            options: [
                { label: 'Lambert着色', value: 'lambert' },
                { label: '真实感着色', value: 'realistic' },
                { label: '颜色着色', value: 'color' }
            ]
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.boxWidth) config.grid3D.boxWidth = properties.boxWidth;
        if (properties.boxDepth) config.grid3D.boxDepth = properties.boxDepth;
        if (properties.boxHeight) config.grid3D.boxHeight = properties.boxHeight;
        if (properties.autoRotate !== undefined) config.grid3D.viewControl.autoRotate = properties.autoRotate;
        if (properties.distance) config.grid3D.viewControl.distance = properties.distance;
        if (properties.alpha !== undefined) config.grid3D.viewControl.alpha = properties.alpha;
        if (properties.beta !== undefined) config.grid3D.viewControl.beta = properties.beta;
        if (properties.showLabel !== undefined) config.series[0].label.show = properties.showLabel;
        if (properties.shading) config.series[0].shading = properties.shading;
        
        // 设置数据
        config.series[0].data = data && data.length > 0 ? data : this.sampleData;
        
        // 计算visualMap的范围
        if (config.series[0].data.length > 0) {
            const values = config.series[0].data.map(item => item[2] || 0);
            config.visualMap.min = Math.min(...values);
            config.visualMap.max = Math.max(...values);
        }
        
        return config;
    }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(BasicBar3D);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicBar3D);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicBar3D);
    }
  }, 100);
}
