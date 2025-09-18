// 主题河流图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.ThemeRiverChart = {
    name: '主题河流图',
    type: 'themeRiver',
    category: '统计图表',
    icon: 'water',
    description: '主题河流图组件，支持时间序列多主题数据的可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '主题河流图',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(0,0,0,0.2)',
                    width: 1,
                    type: 'solid'
                }
            },
            formatter: function(params) {
                let html = params[0].name + '<br/>';
                params.forEach(param => {
                    html += param.marker + param.seriesName + ': ' + param.data[2] + '<br/>';
                });
                return html;
            }
        },
        legend: {
            top: 'bottom'
        },
        singleAxis: {
            top: '10%',
            bottom: '20%',
            axisTick: {},
            axisLabel: {},
            type: 'time',
            axisPointer: {
                animation: true,
                label: {
                    show: true
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    opacity: 0.2
                }
            }
        },
        series: [{
            type: 'themeRiver',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                }
            }
        }]
    },
    
    // 生成示例数据
    generateSampleData: function() {
        const themes = ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD'];
        const data = [];
        
        for (let i = 0; i < 100; i++) {
            const date = new Date(2023, 0, i + 1);
            const dateStr = date.getFullYear() + '-' + 
                           (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                           date.getDate().toString().padStart(2, '0');
            
            themes.forEach(theme => {
                data.push([dateStr, theme, Math.random() * 100]);
            });
        }
        
        return data;
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '主题河流图'
        },
        showLegend: {
            type: 'boolean',
            label: '显示图例',
            value: true
        },
        showSplitLine: {
            type: 'boolean',
            label: '显示分割线',
            value: true
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.showLegend !== undefined) {
            config.legend.show = properties.showLegend;
        }
        if (properties.showSplitLine !== undefined) {
            config.singleAxis.splitLine.show = properties.showSplitLine;
        }
        
        // 设置数据
        config.series[0].data = data && data.length > 0 ? data : this.generateSampleData();
        
        return config;
    }
};

// 注册组件
if (window.ChartComponents && window.ChartComponents.register) {
    window.ChartComponents.register('ThemeRiverChart', window.ChartComponents.ThemeRiverChart);
}