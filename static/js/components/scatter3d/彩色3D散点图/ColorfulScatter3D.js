// 彩色3D散点图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.ColorfulScatter3D = {
    name: '彩色3D散点图',
    type: 'scatter3D',
    category: '3D图表',
    icon: 'scatter-chart',
    description: '彩色的3D散点图，支持多维数据的三维可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '彩色3D散点图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.seriesName + '<br/>' +
                       'X: ' + params.value[0].toFixed(2) + '<br/>' +
                       'Y: ' + params.value[1].toFixed(2) + '<br/>' +
                       'Z: ' + params.value[2].toFixed(2) + '<br/>' +
                       '类别: ' + (params.value[3] || '未知');
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 10,
            inRange: {
                symbolSize: [5, 25],
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
            type: 'scatter3D',
            name: '数据点',
            data: [],
            symbolSize: 10,
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
    
    // 生成示例数据
    generateSampleData: function() {
        const categories = ['A', 'B', 'C', 'D', 'E'];
        const data = [];
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 10;
            const y = Math.random() * 10;
            const z = Math.random() * 10;
            const category = categories[Math.floor(Math.random() * categories.length)];
            data.push([x, y, z, category]);
        }
        return data;
    },
    
    // 生成球面分布数据
    generateSphereData: function() {
        const data = [];
        for (let i = 0; i < 100; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1 + Math.random() * 2;
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            const category = Math.floor(Math.random() * 5);
            data.push([x, y, z, category]);
        }
        return data;
    },
    
    // 生成螺旋分布数据
    generateSpiralData: function() {
        const data = [];
        for (let i = 0; i < 100; i++) {
            const t = i * 0.1;
            const r = 2 + Math.sin(t);
            const x = r * Math.cos(t);
            const y = r * Math.sin(t);
            const z = t;
            const category = Math.floor(t / 2) % 5;
            data.push([x, y, z, category]);
        }
        return data;
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '彩色3D散点图'
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
            value: 10,
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
        distributionType: {
            type: 'select',
            label: '分布类型',
            value: 'random',
            options: [
                { label: '随机分布', value: 'random' },
                { label: '球面分布', value: 'sphere' },
                { label: '螺旋分布', value: 'spiral' }
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
        if (properties.symbolSize) config.series[0].symbolSize = properties.symbolSize;
        if (properties.opacity) config.series[0].itemStyle.opacity = properties.opacity;
        
        // 根据分布类型生成数据
        let generatedData = [];
        if (data && data.length > 0) {
            generatedData = data;
        } else {
            switch(properties.distributionType) {
                case 'sphere':
                    generatedData = this.generateSphereData();
                    break;
                case 'spiral':
                    generatedData = this.generateSpiralData();
                    break;
                case 'random':
                default:
                    generatedData = this.generateSampleData();
                    break;
            }
        }
        
        config.series[0].data = generatedData.map(item => [item[0], item[1], item[2]]);
        
        // 计算visualMap的范围
        if (generatedData.length > 0) {
            const values = generatedData.map(item => {
                // 使用第四个维度作为颜色映射值
                if (typeof item[3] === 'number') {
                    return item[3];
                } else if (typeof item[3] === 'string') {
                    // 将字符串类别转换为数字
                    return item[3].charCodeAt(0) % 10;
                }
                return 0;
            });
            config.visualMap.min = Math.min(...values);
            config.visualMap.max = Math.max(...values);
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('ColorfulScatter3D', window.ChartComponents.ColorfulScatter3D);
}