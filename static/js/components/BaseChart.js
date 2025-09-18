// 图表组件基类
class BaseChart {
    constructor(options = {}) {
        this.id = options.id || this.generateId();
        this.type = options.type || 'base';
        this.name = options.name || '基础图表';
        this.icon = options.icon || '📊';
        this.category = options.category || 'basic';
        this.subCategory = options.subCategory || '';
        this.defaultProps = options.defaultProps || {};
        this.dataSchema = options.dataSchema || {};
        this.configSchema = options.configSchema || {};
    }

    // 生成唯一ID
    generateId() {
        return `${this.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 渲染图表
    render(container, options = {}) {
        // 合并默认配置和用户配置
        const finalOptions = Object.assign({}, this.defaultProps, options);
        
        // 初始化ECharts实例
        const chart = echarts.init(container);
        
        // 渲染图表
        chart.setOption(finalOptions);
        
        // 返回图表实例以便后续操作
        return chart;
    }

    // 更新数据
    updateData(chartInstance, data) {
        if (chartInstance && typeof chartInstance.setOption === 'function') {
            chartInstance.setOption({
                series: data.series
            });
        }
    }

    // 销毁图表
    dispose(chartInstance) {
        if (chartInstance && typeof chartInstance.dispose === 'function') {
            chartInstance.dispose();
        }
    }

    // 获取配置面板
    getConfigPanel() {
        // 默认返回空面板，子类可以重写
        return document.createElement('div');
    }

    // 验证数据
    validateData(data) {
        // 默认验证逻辑，子类可以重写
        return true;
    }
}

// 将基类添加到全局作用域
window.BaseChart = BaseChart;