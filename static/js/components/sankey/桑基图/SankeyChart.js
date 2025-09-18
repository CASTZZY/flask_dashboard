// 桑基图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.SankeyChart = {
    name: '桑基图',
    type: 'sankey',
    category: '关系图表',
    icon: 'project-diagram',
    description: '桑基图组件，支持流量和能量流动的可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '桑基图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: function(params) {
                if (params.dataType === 'node') {
                    return params.name + '<br/>值: ' + (params.value || '无');
                } else if (params.dataType === 'edge') {
                    return params.data.source + ' -> ' + params.data.target + '<br/>流量: ' + (params.data.value || '无');
                }
                return '';
            }
        },
        series: [{
            name: '桑基图',
            type: 'sankey',
            data: [],
            links: [],
            emphasis: {
                focus: 'adjacency'
            },
            levels: [
                {
                    depth: 0,
                    itemStyle: {
                        color: '#fbb4ae'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                },
                {
                    depth: 1,
                    itemStyle: {
                        color: '#b3cde3'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                },
                {
                    depth: 2,
                    itemStyle: {
                        color: '#ccebc5'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                },
                {
                    depth: 3,
                    itemStyle: {
                        color: '#decbe4'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                }
            ],
            lineStyle: {
                curveness: 0.5
            }
        }]
    },
    
    // 示例数据
    sampleData: {
        nodes: [
            { name: '访问' },
            { name: '浏览' },
            { name: '交互' },
            { name: '下单' },
            { name: '付款' },
            { name: '完成' }
        ],
        links: [
            { source: '访问', target: '浏览', value: 100 },
            { source: '浏览', target: '交互', value: 80 },
            { source: '交互', target: '下单', value: 60 },
            { source: '下单', target: '付款', value: 50 },
            { source: '付款', target: '完成', value: 40 },
            { source: '浏览', target: '下单', value: 10 },
            { source: '交互', target: '付款', value: 5 }
        ]
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '桑基图'
        },
        curveness: {
            type: 'number',
            label: '曲线弯曲度',
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.1
        },
        focusNodeAdjacency: {
            type: 'boolean',
            label: '聚焦邻接节点',
            value: true
        },
        nodeWidth: {
            type: 'number',
            label: '节点宽度',
            value: 20,
            min: 5,
            max: 50
        },
        nodeGap: {
            type: 'number',
            label: '节点间距',
            value: 8,
            min: 1,
            max: 30
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.curveness !== undefined) config.series[0].lineStyle.curveness = properties.curveness;
        if (properties.focusNodeAdjacency !== undefined) {
            config.series[0].emphasis.focus = properties.focusNodeAdjacency ? 'adjacency' : 'none';
        }
        if (properties.nodeWidth) config.series[0].nodeWidth = properties.nodeWidth;
        if (properties.nodeGap) config.series[0].nodeGap = properties.nodeGap;
        
        // 设置数据
        if (data && data.nodes && data.links) {
            config.series[0].data = data.nodes;
            config.series[0].links = data.links;
        } else {
            config.series[0].data = this.sampleData.nodes;
            config.series[0].links = this.sampleData.links;
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('SankeyChart', window.ChartComponents.SankeyChart);
}