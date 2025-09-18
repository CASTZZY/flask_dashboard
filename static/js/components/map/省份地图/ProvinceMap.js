// 省份地图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.ProvinceMap = {
    name: '省份地图',
    type: 'map',
    category: '地理图表',
    icon: 'map',
    description: '省份地图组件，支持中国各省份数据可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '省份地图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.name) {
                    return params.name + '<br/>' + (params.value ? params.value : '暂无数据');
                }
                return '';
            }
        },
        visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            inRange: {
                color: ['#ffffff', '#313695']
            }
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
        series: [{
            name: '省份地图',
            type: 'map',
            map: 'china',
            roam: false,
            label: {
                show: false
            },
            data: []
        }]
    },
    
    // 示例数据
    sampleData: [
        { name: '北京市', value: 100 },
        { name: '上海市', value: 200 },
        { name: '广东省', value: 300 },
        { name: '江苏省', value: 250 },
        { name: '浙江省', value: 280 },
        { name: '山东省', value: 220 }
    ],
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '省份地图'
        },
        showLabel: {
            type: 'boolean',
            label: '显示标签',
            value: false
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
        },
        mapType: {
            type: 'select',
            label: '省份',
            value: 'china',
            options: [
                { label: '中国', value: 'china' },
                { label: '北京', value: 'beijing' },
                { label: '上海', value: 'shanghai' },
                { label: '广东', value: 'guangdong' },
                { label: '江苏', value: 'jiangsu' },
                { label: '浙江', value: 'zhejiang' },
                { label: '山东', value: 'shandong' },
                { label: '河南', value: 'henan' },
                { label: '河北', value: 'hebei' },
                { label: '山西', value: 'shanxi' },
                { label: '辽宁', value: 'liaoning' },
                { label: '吉林', value: 'jilin' },
                { label: '黑龙江', value: 'heilongjiang' },
                { label: '安徽', value: 'anhui' },
                { label: '福建', value: 'fujian' },
                { label: '江西', value: 'jiangxi' },
                { label: '湖北', value: 'hubei' },
                { label: '湖南', value: 'hunan' },
                { label: '四川', value: 'sichuan' },
                { label: '贵州', value: 'guizhou' },
                { label: '云南', value: 'yunnan' },
                { label: '陕西', value: 'shanxi1' },
                { label: '甘肃', value: 'gansu' },
                { label: '青海', value: 'qinghai' },
                { label: '海南', value: 'hainan' },
                { label: '台湾', value: 'taiwan' },
                { label: '内蒙古', value: 'neimenggu' },
                { label: '广西', value: 'guangxi' },
                { label: '西藏', value: 'xizang' },
                { label: '宁夏', value: 'ningxia' },
                { label: '新疆', value: 'xinjiang' },
                { label: '香港', value: 'xianggang' },
                { label: '澳门', value: 'aomen' }
            ]
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.showLabel !== undefined) config.series[0].label.show = properties.showLabel;
        if (properties.enableRoam !== undefined) config.series[0].roam = properties.enableRoam;
        if (properties.minValue !== undefined) config.visualMap.min = properties.minValue;
        if (properties.maxValue !== undefined) config.visualMap.max = properties.maxValue;
        if (properties.mapType) config.series[0].map = properties.mapType;
        
        // 设置数据
        config.series[0].data = data && data.length > 0 ? data : this.sampleData;
        
        // 计算visualMap的范围
        if (config.series[0].data.length > 0) {
            const values = config.series[0].data.map(item => item.value || 0);
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
    window.ChartComponents.register('ProvinceMap', window.ChartComponents.ProvinceMap);
}