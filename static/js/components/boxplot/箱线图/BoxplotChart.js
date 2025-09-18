// 箱线图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.BoxplotChart = {
    name: '箱线图',
    type: 'boxplot',
    category: '统计图表',
    icon: 'square',
    description: '箱线图组件，支持数据分布和异常值的可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '箱线图',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: '值',
            splitArea: {
                show: true
            }
        },
        series: [{
            name: '箱线图',
            type: 'boxplot',
            data: [],
            tooltip: {
                formatter: function(param) {
                    return [
                        '实验 ' + param.name + ': ',
                        '上须: ' + param.data[5],
                        '上四分位数: ' + param.data[4],
                        '中位数: ' + param.data[3],
                        '下四分位数: ' + param.data[2],
                        '下须: ' + param.data[1]
                    ].join('<br/>');
                }
            }
        }]
    },
    
    // 生成示例数据
    generateSampleData: function() {
        const data = [];
        const xAxisData = [];
        
        for (let i = 0; i < 5; i++) {
            const seriesData = [];
            for (let j = 0; j < 20; j++) {
                seriesData.push(Math.random() * 100);
            }
            // 计算箱线图数据
            seriesData.sort((a, b) => a - b);
            const min = seriesData[0];
            const q1 = seriesData[Math.floor(seriesData.length * 0.25)];
            const median = seriesData[Math.floor(seriesData.length * 0.5)];
            const q3 = seriesData[Math.floor(seriesData.length * 0.75)];
            const max = seriesData[seriesData.length - 1];
            
            data.push([min, q1, median, q3, max]);
            xAxisData.push('实验' + (i + 1));
        }
        
        return {
            xAxisData: xAxisData,
            seriesData: data
        };
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '箱线图'
        },
        showSplitArea: {
            type: 'boolean',
            label: '显示分割区域',
            value: true
        },
        name: {
            type: 'text',
            label: 'Y轴名称',
            value: '值'
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.showSplitArea !== undefined) {
            config.yAxis.splitArea.show = properties.showSplitArea;
        }
        if (properties.name) config.yAxis.name = properties.name;
        
        // 设置数据
        let chartData;
        if (data && data.xAxisData && data.seriesData) {
            chartData = data;
        } else {
            chartData = this.generateSampleData();
        }
        
        config.xAxis.data = chartData.xAxisData;
        config.series[0].data = chartData.seriesData;
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('BoxplotChart', window.ChartComponents.BoxplotChart);
}