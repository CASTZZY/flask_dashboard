// 热力图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.HeatmapChart = {
    name: '热力图',
    type: 'heatmap',
    category: '统计图表',
    icon: 'th',
    description: '热力图组件，支持二维数据的热力可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: '热力图',
            left: 'center'
        },
        tooltip: {
            position: 'top',
            formatter: function(params) {
                return params.name[1] + '<br/>' + 
                       params.name[0] + '<br/>' + 
                       '值: ' + params.value[2];
            }
        },
        animation: false,
        grid: {
            height: '50%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: [],
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: [],
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [{
            name: '热力图',
            type: 'heatmap',
            data: [],
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    },
    
    // 生成示例数据
    generateSampleData: function() {
        const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                       '7a', '8a', '9a','10a','11a',
                       '12p', '1p', '2p', '3p', '4p', '5p',
                       '6p', '7p', '8p', '9p', '10p', '11p'];
        const days = ['Saturday', 'Friday', 'Thursday',
                      'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
        
        const data = [];
        for (let i = 0; i < days.length; i++) {
            for (let j = 0; j < hours.length; j++) {
                data.push([j, i, Math.floor(Math.random() * 100)]);
            }
        }
        
        return {
            xAxisData: hours,
            yAxisData: days,
            seriesData: data
        };
    },
    
    // 属性配置
    properties: {
        title: {
            type: 'text',
            label: '标题',
            value: '热力图'
        },
        showLabel: {
            type: 'boolean',
            label: '显示标签',
            value: true
        },
        minValue: {
            type: 'number',
            label: '最小值',
            value: 0,
            min: 0,
            max: 1000
        },
        maxValue: {
            type: 'number',
            label: '最大值',
            value: 100,
            min: 0,
            max: 1000
        },
        enableAnimation: {
            type: 'boolean',
            label: '启用动画',
            value: false
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.showLabel !== undefined) config.series[0].label.show = properties.showLabel;
        if (properties.minValue !== undefined) config.visualMap.min = properties.minValue;
        if (properties.maxValue !== undefined) config.visualMap.max = properties.maxValue;
        if (properties.enableAnimation !== undefined) config.animation = properties.enableAnimation;
        
        // 设置数据
        let chartData;
        if (data && data.xAxisData && data.yAxisData && data.seriesData) {
            chartData = data;
        } else {
            chartData = this.generateSampleData();
        }
        
        config.xAxis.data = chartData.xAxisData;
        config.yAxis.data = chartData.yAxisData;
        config.series[0].data = chartData.seriesData;
        
        // 计算visualMap的范围
        if (chartData.seriesData.length > 0) {
            const values = chartData.seriesData.map(item => item[2]);
            const min = Math.min(...values);
            const max = Math.max(...values);
            if (!properties.minValue) config.visualMap.min = min;
            if (!properties.maxValue) config.visualMap.max = max;
        }
        
        return config;
    }
};

// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(HeatmapChart);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(HeatmapChart);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(HeatmapChart);
    }
  }, 100);
}

// 导出组件
// 组件已通过 ComponentRegistry 注册到全局