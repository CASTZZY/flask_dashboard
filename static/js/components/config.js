// 组件配置文件
const ComponentConfig = {
    // 图表类型配置
    chartTypes: [
        {
            id: 'bar',
            name: '柱状图',
            icon: '📊',
            category: 'bar',
            subCategories: [
                '基础柱状图',
                '堆叠柱状图',
                '基础条形图',
                '堆叠条形图',
                '正负条形图',
                '折线柱状图混合'
            ]
        },
        {
            id: 'line',
            name: '折线图',
            icon: '📈',
            category: 'line',
            subCategories: [
                '基础折线图',
                '基础面积图',
                '堆叠折线图',
                '堆叠面积图',
                '平滑折线图',
                '阶梯折线图',
                '降雨量折线图'
            ]
        },
        {
            id: 'pie',
            name: '饼图',
            icon: 'PieChart',
            category: 'pie',
            subCategories: [
                '基础饼图',
                '环形图',
                '南丁格尔玫瑰图',
                '玫瑰图',
                '嵌套饼图'
            ]
        },
        {
            id: 'scatter',
            name: '散点图',
            icon: 'ScatterPlot',
            category: 'scatter',
            subCategories: [
                '基础散点图',
                '大规模散点图',
                '散点图矩阵',
                '气泡图'
            ]
        },
        {
            id: 'radar',
            name: '雷达图',
            icon: 'Radar',
            category: 'radar',
            subCategories: [
                '基础雷达图',
                '填充雷达图',
                '多雷达图'
            ]
        },
        {
            id: 'heatmap',
            name: '热力图',
            icon: 'Heatmap',
            category: 'heatmap',
            subCategories: [
                '基础热力图',
                '日历热力图',
                '矩形热力图'
            ]
        },
        {
            id: 'gauge',
            name: '仪表盘',
            icon: 'Gauge',
            category: 'gauge',
            subCategories: [
                '基础仪表盘',
                '刻度仪表盘',
                '多仪表盘'
            ]
        },
        {
            id: 'funnel',
            name: '漏斗图',
            icon: 'Funnel',
            category: 'funnel',
            subCategories: [
                '基础漏斗图',
                '金字塔图'
            ]
        },
        {
            id: 'candlestick',
            name: 'K线图',
            icon: 'Candlestick',
            category: 'candlestick',
            subCategories: [
                '基础K线图',
                'MA K线图',
                'BOLL K线图'
            ]
        },
        {
            id: 'graph',
            name: '关系图',
            icon: 'Graph',
            category: 'graph',
            subCategories: [
                '基础关系图',
                '力导向图',
                '正交关系图'
            ]
        },
        {
            id: 'boxplot',
            name: '盒须图',
            icon: 'Boxplot',
            category: 'boxplot',
            subCategories: [
                '基础盒须图',
                '多系列盒须图'
            ]
        },
        {
            id: 'tree',
            name: '树图',
            icon: 'Tree',
            category: 'tree',
            subCategories: [
                '基础树图',
                '正交树图',
                '径向树图'
            ]
        },
        {
            id: 'treemap',
            name: '矩形树图',
            icon: 'Treemap',
            category: 'treemap',
            subCategories: [
                '基础矩形树图',
                '矩形式树状图',
                '旭日图',
                '磐石图'
            ]
        },
        {
            id: 'map',
            name: '地图',
            icon: 'Map',
            category: 'map',
            subCategories: [
                '基础地图',
                '中国地图',
                '世界地图',
                '省份地图',
                '自定义地图',
                '地理坐标图'
            ]
        },
        {
            id: 'parallel',
            name: '平行坐标系图',
            icon: 'Parallel',
            category: 'parallel',
            subCategories: [
                '基础平行坐标系图',
                '多系列平行坐标系图'
            ]
        },
        {
            id: 'sankey',
            name: '桑基图',
            icon: 'Sankey',
            category: 'sankey',
            subCategories: [
                '基础桑基图',
                '能量桑基图'
            ]
        },
        {
            id: 'themeriver',
            name: '主题河流图',
            icon: 'ThemeRiver',
            category: 'themeRiver',
            subCategories: [
                '基础主题河流图',
                '多系列主题河流图'
            ]
        }
    ],
    
    // 控件类型配置
    controlTypes: [
        {
            id: 'text',
            name: '文本框',
            icon: 'TextFields',
            category: 'basic'
        },
        {
            id: 'button',
            name: '按钮',
            icon: 'Button',
            category: 'basic'
        }
    ],
    
    // 3D图表类型配置
    chart3dTypes: [
        {
            id: 'bar3d',
            name: '3D柱状图',
            icon: 'Bar3D',
            category: 'bar3d'
        },
        {
            id: 'line3d',
            name: '3D折线图',
            icon: 'Line3D',
            category: 'line3d'
        },
        {
            id: 'scatter3d',
            name: '3D散点图',
            icon: 'Scatter3D',
            category: 'scatter3d'
        },
        {
            id: 'surface3d',
            name: '3D曲面图',
            icon: 'Surface3D',
            category: 'surface3d'
        },
        {
            id: 'map3d',
            name: '3D地图',
            icon: 'Map3D',
            category: 'map3d'
        },
        {
            id: 'globe3d',
            name: '3D地球',
            icon: 'Globe3D',
            category: 'globe3d'
        }
    ],
    
    // 自定义图表类型配置
    customTypes: [
        {
            id: 'pictorialBar',
            name: '象形柱图',
            icon: 'PictorialBar',
            category: 'pictorialBar'
        },
        {
            id: 'custom',
            name: '自定义图',
            icon: 'Custom',
            category: 'custom',
            subCategories: [
                '基础自定义图',
                '甘特图',
                '词云图',
                '轮廓图'
            ]
        }
    ]
};

// 将配置添加到全局作用域
window.ComponentConfig = ComponentConfig;
