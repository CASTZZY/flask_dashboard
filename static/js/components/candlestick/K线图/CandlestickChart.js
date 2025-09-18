// K线图组件
window.ChartComponents = window.ChartComponents || {};
window.ChartComponents.CandlestickChart = {
    name: 'K线图',
    type: 'candlestick',
    category: '统计图表',
    icon: 'chart-line',
    description: 'K线图组件，支持金融数据的可视化',
    
    // 默认配置
    defaultConfig: {
        title: {
            text: 'K线图',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            formatter: function(params) {
                const param = params[0];
                const data = param.data;
                return [
                    '时间: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    '开盘: ' + data[0] + '<br/>',
                    '收盘: ' + data[1] + '<br/>',
                    '最低: ' + data[2] + '<br/>',
                    '最高: ' + data[3] + '<br/>'
                ].join('');
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
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [{
            type: 'inside',
            start: 50,
            end: 100
        }, {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100
        }],
        series: [{
            name: 'K线图',
            type: 'candlestick',
            data: [],
            itemStyle: {
                color: '#ef232a',
                color0: '#14b143',
                borderColor: '#ef232a',
                borderColor0: '#14b143'
            }
        }]
    },
    
    // 生成示例数据
    generateSampleData: function() {
        const data = [];
        const xAxisData = [];
        
        let open = 50;
        for (let i = 0; i < 50; i++) {
            const date = new Date(2023, 0, i + 1);
            const dateStr = date.getFullYear() + '-' + 
                           (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                           date.getDate().toString().padStart(2, '0');
            
            const close = open + (Math.random() - 0.5) * 10;
            const lowest = Math.min(open, close) - Math.random() * 5;
            const highest = Math.max(open, close) + Math.random() * 5;
            
            data.push([
                open.toFixed(2),
                close.toFixed(2),
                lowest.toFixed(2),
                highest.toFixed(2)
            ]);
            
            xAxisData.push(dateStr);
            open = close;
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
            value: 'K线图'
        },
        showDataZoom: {
            type: 'boolean',
            label: '显示数据缩放',
            value: true
        },
        upColor: {
            type: 'color',
            label: '上涨颜色',
            value: '#ef232a'
        },
        downColor: {
            type: 'color',
            label: '下跌颜色',
            value: '#14b143'
        }
    },
    
    // 生成配置
    generateConfig: function(properties, data) {
        const config = JSON.parse(JSON.stringify(this.defaultConfig));
        
        // 应用属性
        if (properties.title) config.title.text = properties.title;
        if (properties.showDataZoom !== undefined) {
            config.dataZoom[0].show = properties.showDataZoom;
            config.dataZoom[1].show = properties.showDataZoom;
        }
        if (properties.upColor) {
            config.series[0].itemStyle.color = properties.upColor;
            config.series[0].itemStyle.borderColor = properties.upColor;
        }
        if (properties.downColor) {
            config.series[0].itemStyle.color0 = properties.downColor;
            config.series[0].itemStyle.borderColor0 = properties.downColor;
        }
        
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
    window.ChartComponents.register('CandlestickChart', window.ChartComponents.CandlestickChart);
}