// 平行坐标图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.ParallelChart = {
    name: '平行坐标图',
    type: 'parallel',
    category: '统计图表',
    icon: 'grip-lines',
    description: '平行坐标图组件，支持多维数据的可视化分析',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '平行坐标图',
            left: 'center'
        },
        parallelAxis: [],
        parallel: {
            left: '5%',
            right: '10%',
            bottom: '10%',
            top: '20%'
        },
        visualMap: {
            show: true,
            min: 0,
            max: 100,
            dimension: 2,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', 
                       '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        series: [{
            name: '平行坐标图',
            type: 'parallel',
            lineStyle: {
                width: 2,
                opacity: 0.5
            },
            data: []
        }]
    },
    
    // 生成示例数据
    generateSampleData: function() {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push([
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100)
            ]);
        }
        return data;
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '平行坐标图'
        },
        lineWidth: {
            type: 'number',
            label: '线宽',
            value: 2,
            min: 1,
            max: 10
        },
        lineOpacity: {
            type: 'number',
            label: '线透明度',
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.1
        },
        dimensionCount: {
            type: 'number',
            label: '维度数量',
            value: 5,
            min: 2,
            max: 10
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.lineWidth) config.series[0].lineStyle.width = properties.lineWidth;
        if (properties.lineOpacity) config.series[0].lineStyle.opacity = properties.lineOpacity;
        
        // 设置维度数量
        const dimensionCount = properties.dimensionCount || 5;
        
        // 生成平行坐标轴
        config.parallelAxis = [];
        for (let i = 0; i < dimensionCount; i++) {
            config.parallelAxis.push({
                dim: i,
                name: '维度' + (i + 1)
            });
        }
        
        // 设置数据
        let chartData;
        if (data && data.length > 0) {
            chartData = data;
        } else {
            chartData = this.generateSampleData();
        }
        
        config.series[0].data = chartData;
        
        // 更新visualMap的dimension
        config.visualMap.dimension = Math.min(2, dimensionCount - 1);
        
        // 计算visualMap的范围
        if (chartData.length > 0 && chartData[0].length > config.visualMap.dimension) {
            const values = chartData.map(item => item[config.visualMap.dimension]);
            config.visualMap.min = Math.min(...values);
            config.visualMap.max = Math.max(...values);
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('ParallelChart', window.ChartComponents.ParallelChart);
}