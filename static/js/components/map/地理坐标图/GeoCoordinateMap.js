// 地理坐标图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.GeoCoordinateMap = {
    name: '地理坐标图',
    type: 'geo',
    category: '地理图表',
    icon: 'map-marker',
    description: '地理坐标图组件，支持在地图上显示地理坐标点',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '地理坐标图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.name) {
                    return params.name + '<br/>' + 
                           '经度: ' + params.value[0].toFixed(2) + '<br/>' +
                           '纬度: ' + params.value[1].toFixed(2) + '<br/>' +
                           '值: ' + (params.value[2] || '无');
                }
                return '';
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 100,
            inRange: {
                symbolSize: [5, 20],
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', 
                       '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            left: 'left',
            top: 'center'
        },
        geo: {
            map: 'world',
            roam: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                areaColor: '#e0e0e0',
                borderColor: '#999'
            }
        },
        series: [{
            name: '地理坐标',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 10,
            itemStyle: {
                color: '#FF0000'
            },
            emphasis: {
                itemStyle: {
                    color: '#FF6600'
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
            value: '地理坐标图'
        },
        enableRoam: {
            type: 'boolean',
            label: '启用缩放漫游',
            value: true
        },
        symbolSize: {
            type: 'number',
            label: '点大小',
            value: 10,
            min: 1,
            max: 50
        },
        minValue: {
            type: 'number',
            label: '最小值',
            value: 0,
            min: 0,
            max: 1000
        },
        maxValue: {
            type: 'number',
            label: '最大值',
            value: 100,
            min: 0,
            max: 1000
        },
        mapType: {
            type: 'select',
            label: '地图类型',
            value: 'world',
            options: [
                { label: '世界地图', value: 'world' },
                { label: '中国地图', value: 'china' }
            ]
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.enableRoam !== undefined) config.geo.roam = properties.enableRoam;
        if (properties.symbolSize) config.series[0].symbolSize = properties.symbolSize;
        if (properties.minValue !== undefined) config.visualMap.min = properties.minValue;
        if (properties.maxValue !== undefined) config.visualMap.max = properties.maxValue;
        if (properties.mapType) config.geo.map = properties.mapType;
        
        // 设置数据
        config.series[0].data = data && data.length > 0 ? data : this.sampleData;
        
        // 计算visualMap的范围
        if (config.series[0].data.length > 0) {
            const values = config.series[0].data.map(item => item[2] || 0);
            const min = Math.min(...values);
            const max = Math.max(...values);
            if (!properties.minValue) config.visualMap.min = min;
            if (!properties.maxValue) config.visualMap.max = max;
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('GeoCoordinateMap', window.ChartComponents.GeoCoordinateMap);
}