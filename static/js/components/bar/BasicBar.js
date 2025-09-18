// 基类BaseChart已在全局作用域中可用

// 基础柱状图组件
class BasicBar extends BaseChart {
    constructor(options = {}) {
        super({
            id: options.id || 'bar_001',
            type: 'bar',
            name: options.name || '基础柱状图',
            icon: options.icon || '📊',
            category: options.category || 'bar',
            subCategory: options.subCategory || '基础柱状图',
            defaultProps: options.defaultProps || {
                title: {
                    text: '基础柱状图'
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [120, 200, 150, 80, 70, 110, 130]
                }]
            },
            dataSchema: options.dataSchema || {
                type: "object",
                properties: {
                    xAxis: { 
                        type: "array", 
                        items: { type: "string" },
                        title: "X轴数据"
                    },
                    series: { 
                        type: "array", 
                        items: { 
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                data: { type: "array", items: { type: "number" } },
                                type: { type: "string" }
                            }
                        },
                        title: "系列数据"
                    }
                }
            },
            configSchema: options.configSchema || {
                type: "object",
                properties: {
                    title: { 
                        type: "object", 
                        properties: {
                            text: { type: "string", title: "图表标题" }
                        },
                        title: "标题设置"
                    },
                    xAxis: { 
                        type: "object", 
                        properties: {
                            type: { type: "string", title: "X轴类型" },
                            data: { type: "array", items: { type: "string" }, title: "X轴数据" }
                        },
                        title: "X轴设置"
                    },
                    yAxis: { 
                        type: "object", 
                        properties: {
                            type: { type: "string", title: "Y轴类型" }
                        },
                        title: "Y轴设置"
                    }
                }
            }
        });
    }

    // 重写渲染方法
    render(container, options = {}) {
        // 合并默认配置和用户配置
        const finalOptions = Object.assign({}, this.defaultProps, options);
        
        // 初始化ECharts实例
        const chart = echarts.init(container);
        
        // 渲染图表
        chart.setOption(finalOptions);
        
        // 添加点击事件
        chart.on('click', (params) => {
            console.log('图表被点击', params);
        });
        
        // 返回图表实例以便后续操作
        return chart;
    }

    // 获取配置面板
    getConfigPanel() {
        const panel = document.createElement('div');
        panel.className = 'chart-config-panel';
        panel.innerHTML = `
            <div class="mb-3">
                <label class="form-label">图表标题</label>
                <input type="text" class="form-control" id="chart-title" value="${this.defaultProps.title.text}">
            </div>
            <div class="mb-3">
                <label class="form-label">系列名称</label>
                <input type="text" class="form-control" id="series-name" value="${this.defaultProps.series[0].name}">
            </div>
        `;
        return panel;
    }
}

// 创建实例
const basicBar = new BasicBar();

// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(basicBar);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(basicBar);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(basicBar);
    }
  }, 100);
}

// 将组件添加到全局作用域
window.BasicBar = basicBar;