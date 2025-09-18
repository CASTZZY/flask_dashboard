// 3D地球组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.Globe3D = {
    name: '3D地球',
    type: 'globe',
    category: '3D图表',
    icon: 'globe',
    description: '3D地球组件，支持全球数据的三维可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '3D地球',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.componentType === 'series') {
                    return params.seriesName + '<br/>' +
                           '经度: ' + params.value[0] + '<br/>' +
                           '纬度: ' + params.value[1] + '<br/>' +
                           '值: ' + (params.value[2] || 0);
                }
                return params.name;
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 100,
            inRange: {
                symbolSize: [2, 20],
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', 
                       '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            left: 'left',
            top: 'center'
        },
        globe: {
            baseTexture: null, // 可以设置地球贴图
            heightTexture: null, // 可以设置高度贴图
            displacementScale: 0.1,
            shading: 'lambert',
            environment: '#000',
            realisticMaterial: {
                roughness: 0.9,
                metalness: 0
            },
            postEffect: {
                enable: true,
                bloom: {
                    enable: true
                }
            },
            light: {
                main: {
                    intensity: 2,
                    shadow: true
                },
                ambient: {
                    intensity: 0.1
                }
            },
            atmosphere: {
                show: true,
                offset: 5,
                color: '#ffffff',
                glowPower: 6,
                innerGlowPower: 2
            },
            viewControl: {
                autoRotate: true,
                autoRotateSpeed: 2,
                distance: 200,
                alpha: 30,
                beta: 160,
                minDistance: 100,
                maxDistance: 400
            }
        },
        series: [{
            type: 'scatter3D',
            coordinateSystem: 'globe',
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
    
    // 示例数据 (经度, 纬度, 值)
    sampleData: [
        [116.46, 39.92, 100], // 北京
        [121.48, 31.22, 80],  // 上海
        [113.23, 23.16, 70],  // 广州
        [114.07, 22.62, 60],  // 深圳
        [108.95, 34.27, 50],  // 西安
        [106.54, 29.59, 40],  // 重庆
        [104.06, 30.67, 90],  // 成都
        [87.68, 43.77, 30],   // 乌鲁木齐
        [125.35, 43.88, 35],  // 长春
        [123.38, 41.8, 45],   // 沈阳
        [-74.0, 40.7, 85],    // 纽约
        [0.1278, 51.5074, 75], // 伦敦
        [2.3522, 48.8566, 65], // 巴黎
        [139.6917, 35.6895, 95], // 东京
        [151.2093, -33.8688, 55] // 悉尼
    ],
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '3D地球'
        },
        autoRotate: {
            type: 'boolean',
            label: '自动旋转',
            value: true
        },
        autoRotateSpeed: {
            type: 'number',
            label: '旋转速度',
            value: 2,
            min: 1,
            max: 10
        },
        distance: {
            type: 'number',
            label: '视角距离',
            value: 200,
            min: 100,
            max: 400
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
            value: 160,
            min: -180,
            max: 180
        },
        showAtmosphere: {
            type: 'boolean',
            label: '显示大气层',
            value: true
        },
        atmosphereOffset: {
            type: 'number',
            label: '大气层偏移',
            value: 5,
            min: 0,
            max: 20
        },
        glowPower: {
            type: 'number',
            label: '大气层发光强度',
            value: 6,
            min: 1,
            max: 20
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
        lightIntensity: {
            type: 'number',
            label: '光照强度',
            value: 2,
            min: 0.1,
            max: 5,
            step: 0.1
        },
        ambientIntensity: {
            type: 'number',
            label: '环境光强度',
            value: 0.1,
            min: 0,
            max: 1,
            step: 0.1
        },
        enableBloom: {
            type: 'boolean',
            label: '启用辉光效果',
            value: true
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
        if (properties.autoRotate !== undefined) config.globe.viewControl.autoRotate = properties.autoRotate;
        if (properties.autoRotateSpeed) config.globe.viewControl.autoRotateSpeed = properties.autoRotateSpeed;
        if (properties.distance) config.globe.viewControl.distance = properties.distance;
        if (properties.alpha !== undefined) config.globe.viewControl.alpha = properties.alpha;
        if (properties.beta !== undefined) config.globe.viewControl.beta = properties.beta;
        if (properties.showAtmosphere !== undefined) config.globe.atmosphere.show = properties.showAtmosphere;
        if (properties.atmosphereOffset) config.globe.atmosphere.offset = properties.atmosphereOffset;
        if (properties.glowPower) config.globe.atmosphere.glowPower = properties.glowPower;
        if (properties.symbolSize) config.series[0].symbolSize = properties.symbolSize;
        if (properties.opacity) config.series[0].itemStyle.opacity = properties.opacity;
        if (properties.lightIntensity) config.globe.light.main.intensity = properties.lightIntensity;
        if (properties.ambientIntensity) config.globe.light.ambient.intensity = properties.ambientIntensity;
        if (properties.shading) config.globe.shading = properties.shading;
        if (properties.enableBloom !== undefined) config.globe.postEffect.bloom.enable = properties.enableBloom;
        
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
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('Globe3D', window.ChartComponents.Globe3D);
}