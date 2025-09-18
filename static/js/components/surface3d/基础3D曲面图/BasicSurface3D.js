// 基础3D曲面图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.BasicSurface3D = {
    name: '基础3D曲面图',
    type: 'surface',
    category: '3D图表',
    icon: 'area-chart',
    description: '基础的3D曲面图，支持连续数据的三维曲面展示',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '基础3D曲面图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return 'X: ' + params.value[0] + '<br/>' +
                       'Y: ' + params.value[1] + '<br/>' +
                       'Z: ' + params.value[2];
            }
        },
        visualMap: {
            show: true,
            min: -1,
            max: 1,
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
            type: 'surface',
            name: '曲面',
            data: [],
            shading: 'lambert',
            wireframe: {
                show: false
            },
            itemStyle: {
                opacity: 0.8
            }
        }]
    },
    
    // 生成示例数据
    generateSampleData: function() {
        const data = [];
        for (let i = 0; i < 20; i++) {
            const row = [];
            for (let j = 0; j < 20; j++) {
                const x = (i - 10) / 5;
                const y = (j - 10) / 5;
                const z = Math.sin(Math.sqrt(x * x + y * y)) * Math.exp(-Math.sqrt(x * x + y * y) / 4);
                row.push(z);
            }
            data.push(row);
        }
        return data;
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '基础3D曲面图'
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
        shading: {
            type: 'select',
            label: '着色方式',
            value: 'lambert',
            options: [
                { label: 'Lambert着色', value: 'lambert' },
                { label: '真实感着色', value: 'realistic' },
                { label: '颜色着色', value: 'color' }
            ]
        },
        showWireframe: {
            type: 'boolean',
            label: '显示线框',
            value: false
        },
        opacity: {
            type: 'number',
            label: '透明度',
            value: 0.8,
            min: 0.1,
            max: 1,
            step: 0.1
        },
        parametric: {
            type: 'boolean',
            label: '参数化曲面',
            value: false
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
        if (properties.shading) config.series[0].shading = properties.shading;
        if (properties.showWireframe !== undefined) config.series[0].wireframe.show = properties.showWireframe;
        if (properties.opacity) config.series[0].itemStyle.opacity = properties.opacity;
        if (properties.parametric !== undefined) config.series[0].parametric = properties.parametric;
        
        // 设置数据
        if (data && data.length > 0) {
            config.series[0].data = data;
        } else {
            config.series[0].data = this.generateSampleData();
        }
        
        // 计算visualMap的范围
        if (config.series[0].data.length > 0) {
            let min = Infinity, max = -Infinity;
            config.series[0].data.forEach(row => {
                if (Array.isArray(row)) {
                    row.forEach(val => {
                        if (typeof val === 'number') {
                            min = Math.min(min, val);
                            max = Math.max(max, val);
                        }
                    });
                }
            });
            if (min !== Infinity && max !== -Infinity) {
                config.visualMap.min = min;
                config.visualMap.max = max;
            }
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('BasicSurface3D', window.ChartComponents.BasicSurface3D);
}