// 力导向图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.ForceGraph = {
    name: '力导向图',
    type: 'graph',
    category: '关系图表',
    icon: 'project-diagram',
    description: '力导向图组件，支持节点和连线的关系可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '力导向图',
            left: 'center'
        },
        tooltip: {
            formatter: function(params) {
                if (params.dataType === 'node') {
                    return params.name + '<br/>值: ' + (params.value || '无');
                } else if (params.dataType === 'edge') {
                    return params.data.source + ' -> ' + params.data.target + '<br/>权重: ' + (params.data.value || '无');
                }
                return '';
            }
        },
        series: [{
            name: '力导向图',
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 100,
                gravity: 0.1,
                edgeLength: 200,
                layoutAnimation: true
            },
            data: [],
            links: [],
            categories: [],
            roam: true,
            label: {
                show: true,
                position: 'right',
                formatter: '{b}'
            },
            labelLayout: {
                hideOverlap: true
            },
            emphasis: {
                focus: 'adjacency',
                lineStyle: {
                    width: 10
                }
            },
            lineStyle: {
                color: 'source',
                curveness: 0
            }
        }]
    },
    
    // 示例数据
    sampleData: {
        nodes: [
            { id: '0', name: '节点0', value: 10, category: 0 },
            { id: '1', name: '节点1', value: 20, category: 0 },
            { id: '2', name: '节点2', value: 30, category: 0 },
            { id: '3', name: '节点3', value: 40, category: 0 },
            { id: '4', name: '节点4', value: 50, category: 1 },
            { id: '5', name: '节点5', value: 60, category: 1 },
            { id: '6', name: '节点6', value: 70, category: 1 },
            { id: '7', name: '节点7', value: 80, category: 2 },
            { id: '8', name: '节点8', value: 90, category: 2 },
            { id: '9', name: '节点9', value: 100, category: 2 }
        ],
        links: [
            { source: '0', target: '1', value: 1 },
            { source: '0', target: '2', value: 2 },
            { source: '0', target: '3', value: 3 },
            { source: '1', target: '4', value: 4 },
            { source: '1', target: '5', value: 5 },
            { source: '2', target: '6', value: 6 },
            { source: '2', target: '7', value: 7 },
            { source: '3', target: '8', value: 8 },
            { source: '3', target: '9', value: 9 },
            { source: '4', target: '5', value: 10 },
            { source: '6', target: '7', value: 11 },
            { source: '8', target: '9', value: 12 }
        ],
        categories: [
            { name: '类别A' },
            { name: '类别B' },
            { name: '类别C' }
        ]
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '力导向图'
        },
        enableRoam: {
            type: 'boolean',
            label: '启用缩放漫游',
            value: true
        },
        repulsion: {
            type: 'number',
            label: '节点斥力',
            value: 100,
            min: 10,
            max: 500
        },
        gravity: {
            type: 'number',
            label: '重力',
            value: 0.1,
            min: 0,
            max: 1,
            step: 0.01
        },
        edgeLength: {
            type: 'number',
            label: '边长度',
            value: 200,
            min: 10,
            max: 500
        },
        showLabel: {
            type: 'boolean',
            label: '显示标签',
            value: true
        },
        layoutAnimation: {
            type: 'boolean',
            label: '布局动画',
            value: true
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.enableRoam !== undefined) config.series[0].roam = properties.enableRoam;
        if (properties.repulsion) config.series[0].force.repulsion = properties.repulsion;
        if (properties.gravity !== undefined) config.series[0].force.gravity = properties.gravity;
        if (properties.edgeLength) config.series[0].force.edgeLength = properties.edgeLength;
        if (properties.showLabel !== undefined) config.series[0].label.show = properties.showLabel;
        if (properties.layoutAnimation !== undefined) config.series[0].force.layoutAnimation = properties.layoutAnimation;
        
        // 设置数据
        if (data && data.nodes && data.links) {
            config.series[0].data = data.nodes;
            config.series[0].links = data.links;
            config.series[0].categories = data.categories || [];
        } else {
            config.series[0].data = this.sampleData.nodes;
            config.series[0].links = this.sampleData.links;
            config.series[0].categories = this.sampleData.categories;
        }
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('ForceGraph', window.ChartComponents.ForceGraph);
}