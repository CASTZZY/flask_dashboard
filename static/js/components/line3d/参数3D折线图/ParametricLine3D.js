// 参数3D折线图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.ParametricLine3D = {
    name: '参数3D折线图',
    type: 'line3D',
    category: '3D图表',
    icon: 'chart-line',
    description: '参数化的3D折线图，支持复杂的三维参数曲线展示',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '参数3D折线图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.seriesName + '<br/>' +
                       'X: ' + params.value[0].toFixed(2) + '<br/>' +
                       'Y: ' + params.value[1].toFixed(2) + '<br/>' +
                       'Z: ' + params.value[2].toFixed(2);
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 10,
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
            name: '参数曲线',
            data: [],
            lineStyle: {
                width: 4
            }
        }]
    },
    
    // 生成螺旋线数据
    generateSpiralData: function() {
        const data = [];
        for (let t = 0; t < 4 * Math.PI; t += 0.1) {
            const x = Math.cos(t) * (2 + Math.cos(3 * t));
            const y = Math.sin(t) * (2 + Math.cos(3 * t));
            const z = Math.sin(3 * t);
            data.push([x, y, z, t]);
        }
        return data;
    },
    
    // 生成环面纽结数据
    generateTorusKnotData: function() {
        const data = [];
        const p = 3, q = 2;
        for (let t = 0; t < 2 * Math.PI * q; t += 0.1) {
            const r = Math.cos(q * t) + 2;
            const x = r * Math.cos(p * t);
            const y = r * Math.sin(p * t);
            const z = Math.sin(q * t);
            data.push([x, y, z, t]);
        }
        return data;
    },
    
    // 生成利萨如曲线数据
    generateLissajousData: function() {
        const data = [];
        for (let t = 0; t < 4 * Math.PI; t += 0.1) {
            const A = 1, B = 1, a = 3, b = 2, delta = Math.PI / 2;
            const x = A * Math.sin(a * t + delta);
            const y = B * Math.sin(b * t);
            const z = Math.sin(t);
            data.push([x, y, z, t]);
        }
        return data;
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '参数3D折线图'
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
        curveType: {
            type: 'select',
            label: '曲线类型',
            value: 'spiral',
            options: [
                { label: '螺旋线', value: 'spiral' },
                { label: '环面纽结', value: 'torusKnot' },
                { label: '利萨如曲线', value: 'lissajous' }
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
        if (properties.lineWidth) config.series[0].lineStyle.width = properties.lineWidth;
        
        // 根据曲线类型生成数据
        let generatedData = [];
        if (data && data.length > 0) {
            generatedData = data;
        } else {
            switch(properties.curveType) {
                case 'torusKnot':
                    generatedData = this.generateTorusKnotData();
                    break;
                case 'lissajous':
                    generatedData = this.generateLissajousData();
                    break;
                case 'spiral':
                default:
                    generatedData = this.generateSpiralData();
                    break;
            }
        }
        
        config.series[0].data = generatedData.map(item => [item[0], item[1], item[2]]);
        
        // 计算visualMap的范围
        if (generatedData.length > 0) {
            const values = generatedData.map(item => item[3] || 0);
            config.visualMap.min = Math.min(...values);
            config.visualMap.max = Math.max(...values);
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('ParametricLine3D', window.ChartComponents.ParametricLine3D);
}