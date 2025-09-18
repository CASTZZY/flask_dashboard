// 基础地图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.BasicMap = {
    name: '基础地图',
    type: 'map',
    category: '地理图表',
    icon: 'map',
    description: '基础的地图组件，支持中国地图和世界地图',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '基础地图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (p / km2)'
        },
        visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '中国地图',
                type: 'map',
                map: 'china',
                roam: false,
                label: {
                    show: true
                },
                data: [
                    { name: '北京', value: 100 },
                    { name: '天津', value: 200 },
                    { name: '上海', value: 300 },
                    { name: '重庆', value: 400 },
                    { name: '河北', value: 500 },
                    { name: '河南', value: 600 },
                    { name: '云南', value: 700 },
                    { name: '辽宁', value: 800 },
                    { name: '黑龙江', value: 900 },
                    { name: '湖南', value: 1000 },
                    { name: '安徽', value: 1100 },
                    { name: '山东', value: 1200 },
                    { name: '新疆', value: 1300 },
                    { name: '江苏', value: 1400 },
                    { name: '浙江', value: 1500 },
                    { name: '江西', value: 1600 },
                    { name: '湖北', value: 1700 },
                    { name: '广西', value: 1800 },
                    { name: '甘肃', value: 1900 },
                    { name: '山西', value: 2000 },
                    { name: '内蒙古', value: 2100 },
                    { name: '陕西', value: 2200 },
                    { name: '吉林', value: 2300 },
                    { name: '福建', value: 2400 },
                    { name: '贵州', value: 2500 },
                    { name: '广东', value: 2600 },
                    { name: '青海', value: 2700 },
                    { name: '西藏', value: 2800 },
                    { name: '四川', value: 2900 },
                    { name: '宁夏', value: 3000 },
                    { name: '海南', value: 3100 },
                    { name: '台湾', value: 3200 },
                    { name: '香港', value: 3300 },
                    { name: '澳门', value: 3400 }
                ]
            }
        ]
    },
    
    // 示例数据
    sampleData: [
        { name: '北京', value: 100 },
        { name: '天津', value: 200 },
        { name: '上海', value: 300 },
        { name: '重庆', value: 400 },
        { name: '河北', value: 500 },
        { name: '河南', value: 600 }
    ],
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '基础地图'
        },
        mapType: {
            type: 'select',
            label: '地图类型',
            value: 'china',
            options: [
                { label: '中国地图', value: 'china' },
                { label: '世界地图', value: 'world' }
            ]
        },
        showLabel: {
            type: 'boolean',
            label: '显示标签',
            value: true
        },
        enableRoam: {
            type: 'boolean',
            label: '启用缩放漫游',
            value: false
        },
        minValue: {
            type: 'number',
            label: '最小值',
            value: 0,
            min: 0,
            max: 10000
        },
        maxValue: {
            type: 'number',
            label: '最大值',
            value: 1000,
            min: 0,
            max: 10000
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.mapType) config.series[0].map = properties.mapType;
        if (properties.showLabel !== undefined) config.series[0].label.show = properties.showLabel;
        if (properties.enableRoam !== undefined) config.series[0].roam = properties.enableRoam;
        if (properties.minValue) config.visualMap.min = properties.minValue;
        if (properties.maxValue) config.visualMap.max = properties.maxValue;
        
        // 设置数据
        config.series[0].data = data && data.length > 0 ? data : this.sampleData;
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('BasicMap', window.ChartComponents.BasicMap);
}