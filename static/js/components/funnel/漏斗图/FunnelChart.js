// 漏斗图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.FunnelChart = {
    name: '漏斗图',
    type: 'funnel',
    category: '统计图表',
    icon: 'filter',
    description: '漏斗图组件，支持流程和转化率的可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '漏斗图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.name + '<br/>' + 
                       '值: ' + params.value + '<br/>' +
                       '占比: ' + params.percent + '%';
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: []
        }]
    },
    
    // 示例数据
    sampleData: [
        { value: 100, name: '访问' },
        { value: 80, name: '浏览' },
        { value: 60, name: '交互' },
        { value: 40, name: '下单' },
        { value: 20, name: '付款' }
    ],
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '漏斗图'
        },
        showLabel: {
            type: 'boolean',
            label: '显示标签',
            value: true
        },
        labelPosition: {
            type: 'select',
            label: '标签位置',
            value: 'inside',
            options: [
                { label: '内部', value: 'inside' },
                { label: '左侧', value: 'left' },
                { label: '右侧', value: 'right' },
                { label: '顶部', value: 'top' },
                { label: '底部', value: 'bottom' }
            ]
        },
        sort: {
            type: 'select',
            label: '排序方式',
            value: 'descending',
            options: [
                { label: '降序', value: 'descending' },
                { label: '升序', value: 'ascending' },
                { label: '无排序', value: 'none' }
            ]
        },
        gap: {
            type: 'number',
            label: '间距',
            value: 2,
            min: 0,
            max: 10
        },
        maxSize: {
            type: 'number',
            label: '最大尺寸%',
            value: 100,
            min: 50,
            max: 100
        },
        minSize: {
            type: 'number',
            label: '最小尺寸%',
            value: 0,
            min: 0,
            max: 50
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.showLabel !== undefined) config.series[0].label.show = properties.showLabel;
        if (properties.labelPosition) config.series[0].label.position = properties.labelPosition;
        if (properties.sort) config.series[0].sort = properties.sort;
        if (properties.gap) config.series[0].gap = properties.gap;
        if (properties.maxSize) config.series[0].maxSize = properties.maxSize + '%';
        if (properties.minSize) config.series[0].minSize = properties.minSize + '%';
        
        // 设置数据
        config.series[0].data = data && data.length > 0 ? data : this.sampleData;
        
        // 计算最大值和最小值
        if (config.series[0].data.length > 0) {
            const values = config.series[0].data.map(item => item.value);
            config.series[0].max = Math.max(...values);
            config.series[0].min = Math.min(...values);
        }
        
        return config;
    }
};

// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(FunnelChart);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(FunnelChart);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(FunnelChart);
    }
  }, 100);
}

// 导出组件
// 组件已通过 ComponentRegistry 注册到全局