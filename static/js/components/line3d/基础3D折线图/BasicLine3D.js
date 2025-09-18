// 基础3D折线图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.BasicLine3D = {
    name: '基础3D折线图',
    type: 'line3D',
    category: '3D图表',
    icon: 'chart-line',
    description: '基础的3D折线图，支持三维数据的连续展示',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '基础3D折线图',
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
            max: 30,
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
            type: 'line3D',
            name: '数据',
            data: [],
            lineStyle: {
                width: 4
            }
        }]
    },
    
    // 生成示例数据 (参数曲线)
    generateSampleData: function() {
        const data = [];
        for (let t = 0; t < 25; t += 0.1) {
            const x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
            const y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
            const z = t + 2.0 * Math.sin(75 * t);
            data.push([x, y, z]);
        }
        return data;
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '基础3D折线图'
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
        lineWidth: {
            type: 'number',
            label: '线宽',
            value: 4,
            min: 1,
            max: 10
        },
        showAxisPointer: {
            type: 'boolean',
            label: '显示坐标轴指示器',
            value: true
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
        if (properties.lineWidth) config.series[0].lineStyle.width = properties.lineWidth;
        if (properties.showAxisPointer !== undefined) config.grid3D.axisPointer.show = properties.showAxisPointer;
        
        // 设置数据
        if (data && data.length > 0) {
            config.series[0].data = data;
        } else {
            config.series[0].data = this.generateSampleData();
        }
        
        // 计算visualMap的范围
        if (config.series[0].data.length > 0) {
            const values = config.series[0].data.map(item => item[2]);
            config.visualMap.min = Math.min(...values);
            config.visualMap.max = Math.max(...values);
        }
        
        return config;
    }
};

// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(BasicLine3D);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicLine3D);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicLine3D);
    }
  }, 100);
}

// 导出组件
// 组件已通过 ComponentRegistry 注册到全局