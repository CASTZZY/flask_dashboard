// 仪表盘组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.GaugeChart = {
    name: '仪表盘',
    type: 'gauge',
    category: '统计图表',
    icon: 'tachometer-alt',
    description: '仪表盘组件，支持单值数据的仪表盘可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '仪表盘',
            left: 'center'
        },
        series: [{
            name: '仪表盘',
            type: 'gauge',
            progress: {
                show: true
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}%'
            },
            data: [
                {
                    value: 50,
                    name: '完成率'
                }
            ]
        }]
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '仪表盘'
        },
        value: {
            type: 'number',
            label: '值',
            value: 50,
            min: 0,
            max: 100
        },
        name: {
            type: 'text',
            label: '名称',
            value: '完成率'
        },
        showProgress: {
            type: 'boolean',
            label: '显示进度',
            value: true
        },
        valueAnimation: {
            type: 'boolean',
            label: '值动画',
            value: true
        },
        min: {
            type: 'number',
            label: '最小值',
            value: 0,
            min: 0,
            max: 1000
        },
        max: {
            type: 'number',
            label: '最大值',
            value: 100,
            min: 1,
            max: 1000
        },
        splitNumber: {
            type: 'number',
            label: '分割段数',
            value: 10,
            min: 1,
            max: 20
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.value !== undefined) config.series[0].data[0].value = properties.value;
        if (properties.name) config.series[0].data[0].name = properties.name;
        if (properties.showProgress !== undefined) config.series[0].progress.show = properties.showProgress;
        if (properties.valueAnimation !== undefined) config.series[0].detail.valueAnimation = properties.valueAnimation;
        if (properties.min !== undefined) config.series[0].min = properties.min;
        if (properties.max !== undefined) config.series[0].max = properties.max;
        if (properties.splitNumber) config.series[0].splitNumber = properties.splitNumber;
        
        // 设置数据（如果提供了自定义数据）
        if (data && data.length > 0 && data[0].value !== undefined) {
            config.series[0].data = data;
        }
        
        // 更新detail的formatter以匹配min/max
        if (properties.max !== undefined) {
            config.series[0].detail.formatter = function(value) {
                return Math.round(value / properties.max * 100) + '%';
            };
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('GaugeChart', window.ChartComponents.GaugeChart);
}