// 树图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.TreeChart = {
    name: '树图',
    type: 'tree',
    category: '关系图表',
    icon: 'sitemap',
    description: '树图组件，支持层次结构数据的可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '树图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: function(params) {
                return params.name + '<br/>值: ' + (params.value || '无');
            }
        },
        series: [{
            name: '树图',
            type: 'tree',
            data: [],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 7,
            symbol: 'circle',
            orient: 'LR',
            expandAndCollapse: true,
            label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
            },
            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            },
            emphasis: {
                focus: 'descendant'
            },
            animationDuration: 500,
            animationDurationUpdate: 750
        }]
    },
    
    // 示例数据
    sampleData: {
        name: '根节点',
        children: [
            {
                name: '分支1',
                children: [
                    { name: '叶子1.1', value: 10 },
                    { name: '叶子1.2', value: 20 },
                    { 
                        name: '分支1.3',
                        children: [
                            { name: '叶子1.3.1', value: 30 },
                            { name: '叶子1.3.2', value: 40 }
                        ]
                    }
                ]
            },
            {
                name: '分支2',
                children: [
                    { name: '叶子2.1', value: 50 },
                    { name: '叶子2.2', value: 60 }
                ]
            },
            {
                name: '分支3',
                children: [
                    { name: '叶子3.1', value: 70 },
                    { name: '叶子3.2', value: 80 },
                    { name: '叶子3.3', value: 90 }
                ]
            }
        ]
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '树图'
        },
        orientation: {
            type: 'select',
            label: '方向',
            value: 'LR',
            options: [
                { label: '从左到右', value: 'LR' },
                { label: '从右到左', value: 'RL' },
                { label: '从上到下', value: 'TB' },
                { label: '从下到上', value: 'BT' }
            ]
        },
        symbolSize: {
            type: 'number',
            label: '节点大小',
            value: 7,
            min: 1,
            max: 20
        },
        expandAndCollapse: {
            type: 'boolean',
            label: '展开/折叠',
            value: true
        },
        labelPosition: {
            type: 'select',
            label: '标签位置',
            value: 'left',
            options: [
                { label: '左侧', value: 'left' },
                { label: '右侧', value: 'right' },
                { label: '上方', value: 'top' },
                { label: '下方', value: 'bottom' }
            ]
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.orientation) config.series[0].orient = properties.orientation;
        if (properties.symbolSize) config.series[0].symbolSize = properties.symbolSize;
        if (properties.expandAndCollapse !== undefined) config.series[0].expandAndCollapse = properties.expandAndCollapse;
        if (properties.labelPosition) {
            config.series[0].label.position = properties.labelPosition;
            if (properties.labelPosition === 'left' || properties.labelPosition === 'right') {
                config.series[0].label.verticalAlign = 'middle';
                config.series[0].label.align = properties.labelPosition === 'left' ? 'right' : 'left';
            } else {
                config.series[0].label.verticalAlign = properties.labelPosition === 'top' ? 'bottom' : 'top';
                config.series[0].label.align = 'center';
            }
        }
        
        // 设置数据
        config.series[0].data = data && data.name ? [data] : [this.sampleData];
        
        return config;
    }
};

// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(window.ChartComponents.TreeChart);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(window.ChartComponents.TreeChart);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(window.ChartComponents.TreeChart);
    }
  }, 100);
}

// 导出组件
// 组件已通过 ComponentRegistry 注册到全局