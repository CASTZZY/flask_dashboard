// 基础3D散点图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.BasicScatter3D = {
    name: '基础3D散点图',
    type: 'scatter3D',
    category: '3D图表',
    icon: 'scatter-chart',
    description: '基础的3D散点图，支持三维数据点展示',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '基础3D散点图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.seriesName + '<br/>' +
                       'X: ' + params.value[0] + '<br/>' +
                       'Y: ' + params.value[1] + '<br/>' +
                       'Z: ' + params.value[2] + '<br/>' +
                       '值: ' + (params.value[3] || params.value[2]);
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 100,
            inRange: {
                symbolSize: [2, 20],
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', 
                       '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                colorAlpha: [0.4, 1]
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
            type: 'scatter3D',
            name: '数据点',
            data: [],
            symbolSize: 8,
            itemStyle: {
                opacity: 0.8
            },
            emphasis: {
                itemStyle: {
                    opacity: 1
                }
            }
        }]
    },
    
    // 示例数据
    sampleData: [
        [10, 20, 30, 40], [15, 25, 35, 45], [20, 30, 40, 50],
        [25, 35, 45, 55], [30, 40, 50, 60], [35, 45, 55, 65],
        [40, 50, 60, 70], [45, 55, 65, 75], [50, 60, 70, 80],
        [55, 65, 75, 85], [60, 70, 80, 90], [65, 75, 85, 95],
        [70, 80, 90, 100], [75, 85, 95, 105], [80, 90, 100, 110]
    ],
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '基础3D散点图'
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
        symbolSize: {
            type: 'number',
            label: '点大小',
            value: 8,
            min: 1,
            max: 50
        },
        opacity: {
            type: 'number',
            label: '透明度',
            value: 0.8,
            min: 0.1,
            max: 1,
            step: 0.1
        },
        minSymbolSize: {
            type: 'number',
            label: '最小点大小',
            value: 2,
            min: 1,
            max: 20
        },
        maxSymbolSize: {
            type: 'number',
            label: '最大点大小',
            value: 20,
            min: 5,
            max: 50
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
        if (properties.symbolSize) config.series[0].symbolSize = properties.symbolSize;
        if (properties.opacity) config.series[0].itemStyle.opacity = properties.opacity;
        if (properties.minSymbolSize) config.visualMap.inRange.symbolSize[0] = properties.minSymbolSize;
        if (properties.maxSymbolSize) config.visualMap.inRange.symbolSize[1] = properties.maxSymbolSize;
        
        // 设置数据
        config.series[0].data = data && data.length > 0 ? data : this.sampleData;
        
        // 计算visualMap的范围
        if (config.series[0].data.length > 0) {
            const values = config.series[0].data.map(item => item[3] || item[2]);
            config.visualMap.min = Math.min(...values);
            config.visualMap.max = Math.max(...values);
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('BasicScatter3D', window.ChartComponents.BasicScatter3D);
}