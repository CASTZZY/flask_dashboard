/**
 * 组件注册中心
 * 按照需求文档11.1章节设计，负责管理所有可用的组件，提供组件的注册、查询和分类功能
 */

class ComponentRegistry {
    constructor() {
        this.components = new Map(); // 存储所有注册的组件
        this.categories = new Map();  // 按分类存储组件
        this.loadedComponents = new Set(); // 已加载的组件
        
        console.log('📦 ComponentRegistry 初始化');
        this.initializeDefaultComponents();
    }
    
    /**
     * 注册组件
     * @param {Object} componentDefinition - 组件定义
     */
    registerComponent(componentDefinition) {
        const { id, name, icon, category, type, defaultProps, render, updateData, dispose } = componentDefinition;
        
        // 验证必要字段
        if (!id || !name || !render) {
            throw new Error('组件定义缺少必要字段: id, name, render');
        }
        
        const component = {
            id,
            name,
            icon: icon || '📊',
            category: category || '未分类',
            type: type || 'chart',
            defaultProps: defaultProps || {},
            render: render,
            updateData: updateData || this.defaultUpdateData,
            dispose: dispose || this.defaultDispose,
            registeredAt: new Date().toISOString()
        };
        
        // 注册到组件映射
        this.components.set(id, component);
        
        // 注册到分类映射
        if (!this.categories.has(category)) {
            this.categories.set(category, []);
        }
        this.categories.get(category).push(component);
        
        console.log(`✅ 组件注册成功: ${id} - ${name}`);
        
        // 触发注册事件
        this.triggerRegistrationEvent(component);
        
        return component;
    }
    
    /**
     * 获取组件
     * @param {string} componentId - 组件ID
     * @returns {Object|null} 组件定义
     */
    getComponent(componentId) {
        return this.components.get(componentId) || null;
    }
    
    /**
     * 获取所有组件
     * @returns {Array} 所有组件列表
     */
    getAllComponents() {
        return Array.from(this.components.values());
    }
    
    /**
     * 按分类获取组件
     * @param {string} category - 分类名称
     * @returns {Array} 该分类下的组件列表
     */
    getComponentsByCategory(category) {
        return this.categories.get(category) || [];
    }
    
    /**
     * 获取所有分类
     * @returns {Array} 分类列表
     */
    getCategories() {
        return Array.from(this.categories.keys());
    }
    
    /**
     * 搜索组件
     * @param {string} keyword - 搜索关键词
     * @returns {Array} 匹配的组件列表
     */
    searchComponents(keyword) {
        const results = [];
        const searchTerm = keyword.toLowerCase();
        
        this.components.forEach(component => {
            if (component.name.toLowerCase().includes(searchTerm) ||
                component.category.toLowerCase().includes(searchTerm)) {
                results.push(component);
            }
        });
        
        return results;
    }
    
    /**
     * 初始化默认组件
     * 按照需求文档3.1节定义的组件分类体系
     */
    initializeDefaultComponents() {
        // ECharts图表系列 - 折线图系列
        this.registerLineCharts();
        
        // ECharts图表系列 - 柱状图系列
        this.registerBarCharts();
        
        // ECharts图表系列 - 饼图系列
        this.registerPieCharts();
        
        // ECharts图表系列 - 散点图系列
        this.registerScatterCharts();
        
        // ECharts图表系列 - 雷达图系列
        this.registerRadarCharts();
        
        // ECharts图表系列 - 仪表盘系列
        this.registerGaugeCharts();
        
        // ECharts图表系列 - 热力图系列
        this.registerHeatmapCharts();
        
        // ECharts图表系列 - K线图系列
        this.registerCandlestickCharts();
        
        // ECharts图表系列 - 关系图系列
        this.registerGraphCharts();
        
        // ECharts图表系列 - 树图系列
        this.registerTreeCharts();
        
        // ECharts图表系列 - 矩形树图系列
        this.registerTreemapCharts();
        
        // ECharts图表系列 - 漏斗图系列
        this.registerFunnelCharts();
        
        // ECharts图表系列 - 盒须图系列
        this.registerBoxplotCharts();
        
        // ECharts图表系列 - 平行坐标系图系列
        this.registerParallelCharts();
        
        // ECharts图表系列 - 桑基图系列
        this.registerSankeyCharts();
        
        // ECharts图表系列 - 主题河流图系列
        this.registerThemeRiverCharts();
        
        // ECharts图表系列 - 地图系列
        this.registerMapCharts();
        
        // ECharts图表系列 - PictorialBar系列
        this.registerPictorialBarCharts();
        
        // ECharts图表系列 - 自定义系列
        this.registerCustomCharts();
        
        // 3D图表系列
        this.register3DCharts();
        
        // 基础组件系列
        this.registerBasicComponents();
        
        // 新增图表类型
        this.registerAdditionalCharts();
        
        console.log(`🎯 默认组件初始化完成，共注册 ${this.components.size} 个组件`);
        
        // 更新特定组件的属性方法
        this.updateComponentProperties();
    }
    
    /**
     * 注册折线图系列组件
     */
    registerLineCharts() {
        // 基础折线图
        this.registerComponent({
            id: 'line_basic',
            name: '基础折线图',
            icon: '📈',
            category: '折线图',
            type: 'line',
            defaultProps: {
                title: { text: '基础折线图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
                yAxis: { type: 'value' },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330],
                    type: 'line',
                    smooth: false
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getLineChartProperties
        });
        
        // 堆叠面积图
        this.registerComponent({
            id: 'line_area',
            name: '堆叠面积图',
            icon: '🌄',
            category: '折线图',
            type: 'line',
            defaultProps: {
                title: { text: '堆叠面积图', left: 'center' },
                tooltip: { trigger: 'axis' },
                legend: { data: ['邮件营销', '联盟广告', '视频广告'] },
                xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
                yAxis: { type: 'value' },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 平滑折线图
        this.registerComponent({
            id: 'line_smooth',
            name: '平滑折线图',
            icon: '〰️',
            category: '折线图',
            type: 'line',
            defaultProps: {
                title: { text: '平滑折线图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
                yAxis: { type: 'value' },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 8
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getLineChartProperties
        });
        
        // 堆叠折线图
        this.registerComponent({
            id: 'line_stack',
            name: '堆叠折线图',
            icon: '📊',
            category: '折线图',
            type: 'line',
            defaultProps: {
                title: { text: '堆叠折线图', left: 'center' },
                tooltip: { trigger: 'axis' },
                legend: { data: ['邮件营销', '联盟广告', '视频广告'] },
                xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
                yAxis: { type: 'value' },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    }
                ]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getLineChartProperties
        });
        
        // 阶梯线图
        this.registerComponent({
            id: 'line_step',
            name: '阶梯线图',
            icon: '📶',
            category: '折线图',
            type: 'line',
            defaultProps: {
                title: { text: '阶梯线图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                yAxis: { type: 'value' },
                series: [{
                    name: '步进',
                    type: 'line',
                    step: 'start',
                    data: [120, 132, 101, 134, 90, 230, 210]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getLineChartProperties
        });
        
        // 双Y轴折线图
        this.registerComponent({
            id: 'line_dual_axis',
            name: '双Y轴折线图',
            icon: '📈📉',
            category: '折线图',
            type: 'line',
            defaultProps: {
                title: { text: '双Y轴折线图', left: 'center' },
                tooltip: { trigger: 'axis' },
                legend: { data: ['蒸发量', '降水量', '温度'] },
                xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
                yAxis: [
                    { type: 'value', name: '水量', position: 'left' },
                    { type: 'value', name: '温度', position: 'right' }
                ],
                series: [
                    {
                        name: '蒸发量',
                        type: 'line',
                        yAxisIndex: 0,
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: '降水量',
                        type: 'line',
                        yAxisIndex: 0,
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        name: '温度',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getLineChartProperties
        });
    }
    
    /**
     * 注册柱状图系列组件
     */
    registerBarCharts() {
        // 基础柱状图
        this.registerComponent({
            id: 'bar_basic',
            name: '基础柱状图',
            icon: '📊',
            category: '柱状图',
            type: 'bar',
            defaultProps: {
                title: { text: '基础柱状图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E', 'F'] },
                yAxis: { type: 'value' },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [10, 20, 30, 40, 50, 60],
                    itemStyle: { color: '#5470c6' }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 堆叠柱状图
        this.registerComponent({
            id: 'bar_stack',
            name: '堆叠柱状图',
            icon: '📈',
            category: '柱状图',
            type: 'bar',
            defaultProps: {
                title: { text: '堆叠柱状图', left: 'center' },
                tooltip: { trigger: 'axis' },
                legend: { data: ['直接访问', '邮件营销', '联盟广告'] },
                xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五'] },
                yAxis: { type: 'value' },
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        stack: '总量',
                        data: [320, 302, 301, 334, 390]
                    },
                    {
                        name: '邮件营销',
                        type: 'bar',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90]
                    }
                ]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 基础条形图
        this.registerComponent({
            id: 'bar_horizontal',
            name: '基础条形图',
            icon: '📋',
            category: '柱状图',
            type: 'bar',
            defaultProps: {
                title: { text: '基础条形图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'value' },
                yAxis: { type: 'category', data: ['产品A', '产品B', '产品C', '产品D', '产品E'] },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [120, 200, 150, 80, 70],
                    itemStyle: { color: '#91cc75' }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getBarChartProperties
        });
        
        // 瀑布图
        this.registerComponent({
            id: 'bar_waterfall',
            name: '瀑布图',
            icon: '🏔️',
            category: '柱状图',
            type: 'bar',
            defaultProps: {
                title: { text: '瀑布图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['总计', '租房', '水电', '交通', '伙食', '服装', '娱乐', '其他'] },
                yAxis: { type: 'value' },
                series: [{
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        color: function(params) {
                            var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a'];
                            return colorList[params.dataIndex];
                        }
                    },
                    data: [0, 1700, 1400, 1200, 300, 0, -1300, 0]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getBarChartProperties
        });
        
        // 分组柱状图
        this.registerComponent({
            id: 'bar_grouped',
            name: '分组柱状图',
            icon: '📊📊',
            category: '柱状图',
            type: 'bar',
            defaultProps: {
                title: { text: '分组柱状图', left: 'center' },
                tooltip: { trigger: 'axis' },
                legend: { data: ['2021年', '2022年', '2023年'] },
                xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
                yAxis: { type: 'value' },
                series: [
                    {
                        name: '2021年',
                        type: 'bar',
                        data: [120, 200, 150, 80, 70, 110]
                    },
                    {
                        name: '2022年',
                        type: 'bar',
                        data: [130, 220, 160, 90, 80, 120]
                    },
                    {
                        name: '2023年',
                        type: 'bar',
                        data: [140, 240, 170, 100, 90, 130]
                    }
                ]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getBarChartProperties
        });
        
        // 正负条形图
        this.registerComponent({
            id: 'bar_positive_negative',
            name: '正负条形图',
            icon: '📊±',
            category: '柱状图',
            type: 'bar',
            defaultProps: {
                title: { text: '正负条形图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'value', position: 'top' },
                yAxis: { type: 'category', data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'] },
                series: [{
                    name: '2011年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807],
                    itemStyle: {
                        color: function(params) {
                            return params.value > 0 ? '#91cc75' : '#ee6666';
                        }
                    }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getBarChartProperties
        });
    }
    
    /**
     * 注册饼图系列组件
     */
    registerPieCharts() {
        // 基础饼图
        this.registerComponent({
            id: 'pie_basic',
            name: '基础饼图',
            icon: '🥧',
            category: '饼图',
            type: 'pie',
            defaultProps: {
                title: { text: '基础饼图', left: 'center' },
                tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '60%',
                    data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 环形图
        this.registerComponent({
            id: 'pie_doughnut',
            name: '环形图',
            icon: '🍩',
            category: '饼图',
            type: 'pie',
            defaultProps: {
                title: { text: '环形图', left: 'center' },
                tooltip: { trigger: 'item' },
                legend: { orient: 'vertical', left: 'left' },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['60%', '50%'],
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 玫瑰图
        this.registerComponent({
            id: 'pie_rose',
            name: '玫瑰图',
            icon: '🌹',
            category: '饼图',
            type: 'pie',
            defaultProps: {
                title: { text: '玫瑰图', left: 'center' },
                tooltip: { trigger: 'item' },
                series: [{
                    name: '数据',
                    type: 'pie',
                    radius: [20, 100],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: { borderRadius: 8 },
                    data: [
                        { value: 40, name: 'A类' },
                        { value: 38, name: 'B类' },
                        { value: 32, name: 'C类' },
                        { value: 30, name: 'D类' },
                        { value: 28, name: 'E类' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getPieChartProperties
        });
        
        // 嵌套饼图
        this.registerComponent({
            id: 'pie_nested',
            name: '嵌套饼图',
            icon: '🍩🥧',
            category: '饼图',
            type: 'pie',
            defaultProps: {
                title: { text: '嵌套饼图', left: 'center' },
                tooltip: { trigger: 'item' },
                legend: { orient: 'vertical', left: 'left' },
                series: [
                    {
                        name: '外层',
                        type: 'pie',
                        radius: [0, '30%'],
                        itemStyle: { borderRadius: 8 },
                        data: [
                            { value: 40, name: '类别A' },
                            { value: 38, name: '类别B' },
                            { value: 32, name: '类别C' }
                        ]
                    },
                    {
                        name: '内层',
                        type: 'pie',
                        radius: ['40%', '55%'],
                        itemStyle: { borderRadius: 8 },
                        data: [
                            { value: 30, name: '子类A1' },
                            { value: 10, name: '子类A2' },
                            { value: 28, name: '子类B1' },
                            { value: 10, name: '子类B2' },
                            { value: 22, name: '子类C1' },
                            { value: 10, name: '子类C2' }
                        ]
                    }
                ]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getPieChartProperties
        });
        
        // 南丁格尔图
        this.registerComponent({
            id: 'pie_nightingale',
            name: '南丁格尔图',
            icon: '🌹📊',
            category: '饼图',
            type: 'pie',
            defaultProps: {
                title: { text: '南丁格尔图', left: 'center' },
                tooltip: { trigger: 'item' },
                legend: { orient: 'vertical', left: 'left' },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: [20, 100],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: { borderRadius: 8 },
                    data: [
                        { value: 40, name: 'rose 1' },
                        { value: 38, name: 'rose 2' },
                        { value: 32, name: 'rose 3' },
                        { value: 30, name: 'rose 4' },
                        { value: 28, name: 'rose 5' },
                        { value: 26, name: 'rose 6' },
                        { value: 22, name: 'rose 7' },
                        { value: 18, name: 'rose 8' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getPieChartProperties
        });
        
        // 半环形图
        this.registerComponent({
            id: 'pie_semi_circle',
            name: '半环形图',
            icon: '🌓',
            category: '饼图',
            type: 'pie',
            defaultProps: {
                title: { text: '半环形图', left: 'center' },
                tooltip: { trigger: 'item' },
                legend: { orient: 'vertical', left: 'left' },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '70%'],
                    startAngle: 180,
                    endAngle: 360,
                    data: [
                        { value: 1048, name: '搜索引擎' },
                        { value: 735, name: '直接访问' },
                        { value: 580, name: '邮件营销' },
                        { value: 484, name: '联盟广告' },
                        { value: 300, name: '视频广告' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getPieChartProperties
        });
    }
    
    /**
     * 注册散点图系列组件
     */
    registerScatterCharts() {
        // 基础散点图
        this.registerComponent({
            id: 'scatter_basic',
            name: '基础散点图',
            icon: '⚫',
            category: '散点图',
            type: 'scatter',
            defaultProps: {
                title: { text: '基础散点图', left: 'center' },
                tooltip: { trigger: 'item' },
                xAxis: { type: 'value', scale: true },
                yAxis: { type: 'value', scale: true },
                series: [{
                    name: '数据',
                    type: 'scatter',
                    symbolSize: 8,
                    data: [
                        [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33],
                        [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82]
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 气泡图
        this.registerComponent({
            id: 'scatter_bubble',
            name: '气泡图',
            icon: '🫧',
            category: '散点图',
            type: 'scatter',
            defaultProps: {
                title: { text: '气泡图', left: 'center' },
                tooltip: { trigger: 'item' },
                xAxis: { type: 'value' },
                yAxis: { type: 'value' },
                series: [{
                    name: '数据',
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    data: [
                        [28604, 77, 17096869, '澳大利亚', 1990],
                        [31163, 77.4, 27662440, '加拿大', 1990],
                        [1516, 68, 1154605773, '中国', 1990],
                        [13670, 74.7, 10582082, '古巴', 1990],
                        [28599, 75, 4986705, '芬兰', 1990]
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }
    
    /**
     * 注册雷达图系列组件
     */
    registerRadarCharts() {
        // 基础雷达图
        this.registerComponent({
            id: 'radar_basic',
            name: '基础雷达图',
            icon: '🕸️',
            category: '雷达图',
            type: 'radar',
            defaultProps: {
                title: { text: '基础雷达图', left: 'center' },
                tooltip: {},
                radar: {
                    indicator: [
                        { name: '销售', max: 6500 },
                        { name: '管理', max: 16000 },
                        { name: '信息技术', max: 30000 },
                        { name: '客服', max: 38000 },
                        { name: '研发', max: 52000 },
                        { name: '市场', max: 25000 }
                    ]
                },
                series: [{
                    name: '预算 vs 开销',
                    type: 'radar',
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: '预算分配'
                        }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }
    
    /**
     * 注册仪表盘系列组件
     */
    registerGaugeCharts() {
        // 基础仪表盘
        this.registerComponent({
            id: 'gauge_basic',
            name: '基础仪表盘',
            icon: '⏲️',
            category: '仪表盘',
            type: 'gauge',
            defaultProps: {
                title: { text: '基础仪表盘', left: 'center' },
                tooltip: { formatter: '{a} <br/>{b} : {c}%' },
                series: [{
                    name: '业务指标',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: 70, name: '完成率' }]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }
    
    /**
     * 注册热力图系列组件
     */
    registerHeatmapCharts() {
        // 基础热力图
        this.registerComponent({
            id: 'heatmap_basic',
            name: '基础热力图',
            icon: '🔥',
            category: '热力图',
            type: 'heatmap',
            defaultProps: {
                title: { text: '基础热力图', left: 'center' },
                tooltip: { position: 'top' },
                grid: { height: '50%', top: '10%' },
                xAxis: {
                    type: 'category',
                    data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a']
                },
                yAxis: {
                    type: 'category',
                    data: ['周六', '周五', '周四', '周三', '周二', '周一', '周日']
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '15%'
                },
                series: [{
                    name: '热力数据',
                    type: 'heatmap',
                    data: [[0, 0, 5], [0, 1, 1], [0, 2, 0], [1, 0, 1], [1, 1, 8], [1, 2, 2]],
                    label: { show: true }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }
    
    /**
     * 注册K线图系列组件
     */
    registerCandlestickCharts() {
        // 基础K线图
        this.registerComponent({
            id: 'candlestick_basic',
            name: '基础K线图',
            icon: '📈',
            category: 'K线图系列',
            type: 'candlestick',
            defaultProps: {
                title: { text: '基础K线图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05'] },
                yAxis: { type: 'value' },
                series: [{
                    type: 'candlestick',
                    data: [
                        [20, 34, 10, 25],
                        [40, 35, 30, 35],
                        [31, 38, 33, 33],
                        [38, 15, 5, 42],
                        [14, 30, 5, 42]
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });

        // MA K线图
        this.registerComponent({
            id: 'candlestick_ma',
            name: 'MA K线图',
            icon: '📊',
            category: 'K线图系列',
            type: 'candlestick',
            defaultProps: {
                title: { text: 'MA K线图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05'] },
                yAxis: { type: 'value' },
                series: [
                    {
                        type: 'candlestick',
                        data: [
                            [20, 34, 10, 25],
                            [40, 35, 30, 35],
                            [31, 38, 33, 33],
                            [38, 15, 5, 42],
                            [14, 30, 5, 42]
                        ]
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: [23, 35, 34, 27, 26],
                        smooth: false,
                        lineStyle: { opacity: 0.5 }
                    }
                ]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册关系图系列组件
     */
    registerGraphCharts() {
        // 基础关系图
        this.registerComponent({
            id: 'graph_basic',
            name: '基础关系图',
            icon: '🕸️',
            category: '关系图系列',
            type: 'graph',
            defaultProps: {
                title: { text: '基础关系图', left: 'center' },
                tooltip: {},
                series: [{
                    type: 'graph',
                    layout: 'force',
                    data: [
                        { name: '节点1', x: 300, y: 300 },
                        { name: '节点2', x: 800, y: 300 },
                        { name: '节点3', x: 550, y: 100 },
                        { name: '节点4', x: 550, y: 500 }
                    ],
                    links: [
                        { source: 0, target: 1 },
                        { source: 1, target: 2 },
                        { source: 2, target: 0 },
                        { source: 1, target: 3 }
                    ],
                    roam: true,
                    force: {
                        repulsion: 100
                    }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });

        // 力导向图
        this.registerComponent({
            id: 'graph_force',
            name: '力导向图',
            icon: '🌐',
            category: '关系图系列',
            type: 'graph',
            defaultProps: {
                title: { text: '力导向图', left: 'center' },
                tooltip: {},
                series: [{
                    type: 'graph',
                    layout: 'force',
                    data: [
                        { name: '中心', symbolSize: 50, category: 0 },
                        { name: '节点1', symbolSize: 30, category: 1 },
                        { name: '节点2', symbolSize: 30, category: 1 },
                        { name: '节点3', symbolSize: 30, category: 1 },
                        { name: '节点4', symbolSize: 20, category: 2 }
                    ],
                    links: [
                        { source: '中心', target: '节点1' },
                        { source: '中心', target: '节点2' },
                        { source: '中心', target: '节点3' },
                        { source: '节点1', target: '节点4' }
                    ],
                    categories: [
                        { name: '中心节点' },
                        { name: '一级节点' },
                        { name: '二级节点' }
                    ],
                    roam: true,
                    force: {
                        repulsion: 200,
                        edgeLength: 50
                    }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册树图系列组件
     */
    registerTreeCharts() {
        // 基础树图
        this.registerComponent({
            id: 'tree_basic',
            name: '基础树图',
            icon: '🌳',
            category: '树图系列',
            type: 'tree',
            defaultProps: {
                title: { text: '基础树图', left: 'center' },
                tooltip: { trigger: 'item', triggerOn: 'mousemove' },
                series: [{
                    type: 'tree',
                    data: [{
                        name: '根节点',
                        children: [
                            {
                                name: '子节点1',
                                children: [
                                    { name: '叶节点1' },
                                    { name: '叶节点2' }
                                ]
                            },
                            {
                                name: '子节点2',
                                children: [
                                    { name: '叶节点3' },
                                    { name: '叶节点4' }
                                ]
                            }
                        ]
                    }],
                    top: '10%',
                    left: '7%',
                    bottom: '20%',
                    right: '20%',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });

        // 径向树图
        this.registerComponent({
            id: 'tree_radial',
            name: '径向树图',
            icon: '🎯',
            category: '树图系列',
            type: 'tree',
            defaultProps: {
                title: { text: '径向树图', left: 'center' },
                tooltip: { trigger: 'item', triggerOn: 'mousemove' },
                series: [{
                    type: 'tree',
                    data: [{
                        name: '中心',
                        children: [
                            {
                                name: '分支1',
                                children: [
                                    { name: '叶子1' },
                                    { name: '叶子2' }
                                ]
                            },
                            {
                                name: '分支2',
                                children: [
                                    { name: '叶子3' },
                                    { name: '叶子4' }
                                ]
                            }
                        ]
                    }],
                    top: '18%',
                    left: '7%',
                    bottom: '14%',
                    right: '20%',
                    symbolSize: 7,
                    layout: 'radial',
                    label: {
                        position: 'radial',
                        rotate: 'radial',
                        verticalAlign: 'middle',
                        align: 'center',
                        fontSize: 12
                    },
                    expandAndCollapse: true
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册矩形树图系列组件
     */
    registerTreemapCharts() {
        // 基础矩形树图
        this.registerComponent({
            id: 'treemap_basic',
            name: '基础矩形树图',
            icon: '🗂️',
            category: '矩形树图系列',
            type: 'treemap',
            defaultProps: {
                title: { text: '基础矩形树图', left: 'center' },
                tooltip: { trigger: 'item', formatter: '{b}: {c}' },
                series: [{
                    type: 'treemap',
                    data: [
                        {
                            name: '分类A',
                            value: 40,
                            children: [
                                { name: 'A1', value: 15 },
                                { name: 'A2', value: 25 }
                            ]
                        },
                        {
                            name: '分类B',
                            value: 60,
                            children: [
                                { name: 'B1', value: 20 },
                                { name: 'B2', value: 40 }
                            ]
                        }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });

        // 旭日图
        this.registerComponent({
            id: 'sunburst_basic',
            name: '旭日图',
            icon: '☀️',
            category: '矩形树图系列',
            type: 'sunburst',
            defaultProps: {
                title: { text: '旭日图', left: 'center' },
                tooltip: { trigger: 'item' },
                series: [{
                    type: 'sunburst',
                    data: [
                        {
                            name: '中心',
                            children: [
                                {
                                    name: '分支1',
                                    value: 10,
                                    children: [
                                        { name: '叶子1', value: 5 },
                                        { name: '叶子2', value: 5 }
                                    ]
                                },
                                {
                                    name: '分支2',
                                    value: 15,
                                    children: [
                                        { name: '叶子3', value: 8 },
                                        { name: '叶子4', value: 7 }
                                    ]
                                }
                            ]
                        }
                    ],
                    radius: [0, '90%'],
                    center: ['50%', '50%'],
                    sort: null,
                    emphasis: {
                        focus: 'ancestor'
                    },
                    levels: [{}, {
                        r0: '15%',
                        r: '35%',
                        itemStyle: {
                            borderWidth: 2
                        },
                        label: {
                            rotate: 'tangential'
                        }
                    }, {
                        r0: '35%',
                        r: '70%',
                        label: {
                            align: 'right'
                        }
                    }]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册漏斗图系列组件
     */
    registerFunnelCharts() {
        // 基础漏斗图
        this.registerComponent({
            id: 'funnel_basic',
            name: '基础漏斗图',
            icon: '🪣',
            category: '漏斗图系列',
            type: 'funnel',
            defaultProps: {
                title: { text: '基础漏斗图', left: 'center' },
                tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
                legend: { orient: 'vertical', left: 'left' },
                series: [{
                    name: '漏斗图',
                    type: 'funnel',
                    left: '10%',
                    top: 60,
                    width: '80%',
                    height: '80%',
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: [
                        { value: 100, name: '展示' },
                        { value: 80, name: '点击' },
                        { value: 60, name: '访问' },
                        { value: 40, name: '咨询' },
                        { value: 20, name: '订单' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });

        // 金字塔图
        this.registerComponent({
            id: 'funnel_pyramid',
            name: '金字塔图',
            icon: '🔺',
            category: '漏斗图系列',
            type: 'funnel',
            defaultProps: {
                title: { text: '金字塔图', left: 'center' },
                tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
                legend: { orient: 'vertical', left: 'left' },
                series: [{
                    name: '金字塔',
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    sort: 'ascending',
                    label: {
                        position: 'inside'
                    },
                    data: [
                        { value: 20, name: '高级' },
                        { value: 40, name: '中级' },
                        { value: 60, name: '初级' },
                        { value: 80, name: '入门' },
                        { value: 100, name: '基础' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册盒须图系列组件
     */
    registerBoxplotCharts() {
        // 基础盒须图
        this.registerComponent({
            id: 'boxplot_basic',
            name: '基础盒须图',
            icon: '📦',
            category: '盒须图系列',
            type: 'boxplot',
            defaultProps: {
                title: { text: '基础盒须图', left: 'center' },
                tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
                grid: { left: '10%', right: '10%', bottom: '15%' },
                xAxis: { type: 'category', data: ['A组', 'B组', 'C组', 'D组', 'E组'] },
                yAxis: { type: 'value' },
                series: [{
                    name: 'boxplot',
                    type: 'boxplot',
                    data: [
                        [655, 850, 940, 980, 1070],
                        [760, 801, 845, 885, 960],
                        [780, 840, 855, 880, 940],
                        [720, 767, 815, 865, 920],
                        [740, 807, 810, 870, 950]
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册平行坐标系图系列组件
     */
    registerParallelCharts() {
        // 基础平行坐标系图
        this.registerComponent({
            id: 'parallel_basic',
            name: '平行坐标系图',
            icon: '📏',
            category: '平行坐标系图系列',
            type: 'parallel',
            defaultProps: {
                title: { text: '平行坐标系图', left: 'center' },
                tooltip: {},
                parallelAxis: [
                    { dim: 0, name: '价格' },
                    { dim: 1, name: '净重' },
                    { dim: 2, name: '体积' },
                    { dim: 3, name: '评分' }
                ],
                series: [{
                    type: 'parallel',
                    lineStyle: { width: 1 },
                    data: [
                        [12.99, 100, 82, 4.2],
                        [9.99, 80, 78, 4.0],
                        [20, 120, 85, 4.5],
                        [15, 90, 80, 4.1],
                        [18, 110, 88, 4.3]
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册桑基图系列组件
     */
    registerSankeyCharts() {
        // 基础桑基图
        this.registerComponent({
            id: 'sankey_basic',
            name: '桑基图',
            icon: '🌊',
            category: '桑基图系列',
            type: 'sankey',
            defaultProps: {
                title: { text: '桑基图', left: 'center' },
                tooltip: { trigger: 'item', triggerOn: 'mousemove' },
                series: [{
                    type: 'sankey',
                    data: [
                        { name: 'a' },
                        { name: 'b' },
                        { name: 'a1' },
                        { name: 'a2' },
                        { name: 'b1' },
                        { name: 'c' }
                    ],
                    links: [
                        { source: 'a', target: 'a1', value: 5 },
                        { source: 'a', target: 'a2', value: 3 },
                        { source: 'b', target: 'b1', value: 8 },
                        { source: 'a', target: 'b1', value: 3 },
                        { source: 'b1', target: 'a1', value: 1 },
                        { source: 'b1', target: 'c', value: 2 }
                    ],
                    emphasis: { focus: 'adjacency' },
                    levels: [{
                        depth: 0,
                        itemStyle: { color: '#fbb4ae' }
                    }, {
                        depth: 1,
                        itemStyle: { color: '#b3cde3' }
                    }, {
                        depth: 2,
                        itemStyle: { color: '#ccebc5' }
                    }]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册主题河流图系列组件
     */
    registerThemeRiverCharts() {
        // 基础主题河流图
        this.registerComponent({
            id: 'themeRiver_basic',
            name: '主题河流图',
            icon: '🏞️',
            category: '主题河流图系列',
            type: 'themeRiver',
            defaultProps: {
                title: { text: '主题河流图', left: 'center' },
                tooltip: { trigger: 'axis', axisPointer: { type: 'line', lineStyle: { color: 'rgba(0,0,0,0.2)', width: 1, type: 'solid' } } },
                legend: { data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD'] },
                singleAxis: { top: 50, bottom: 50, axisTick: {}, axisLabel: {}, type: 'time', axisPointer: { animation: true, label: { show: true } } },
                series: [{
                    type: 'themeRiver',
                    data: [
                        ['2015/11/08', 10, 'DQ'],
                        ['2015/11/09', 15, 'DQ'],
                        ['2015/11/10', 35, 'DQ'],
                        ['2015/11/11', 38, 'DQ'],
                        ['2015/11/12', 22, 'DQ'],
                        ['2015/11/08', 35, 'TY'],
                        ['2015/11/09', 36, 'TY'],
                        ['2015/11/10', 37, 'TY'],
                        ['2015/11/11', 22, 'TY'],
                        ['2015/11/12', 24, 'TY']
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册地图系列组件
     */
    registerMapCharts() {
        // 中国地图
        this.registerComponent({
            id: 'map_china',
            name: '中国地图',
            icon: '🗾',
            category: '地图系列',
            type: 'map',
            defaultProps: {
                title: { text: '中国地图', left: 'center' },
                tooltip: { trigger: 'item', showDelay: 0, transitionDuration: 0.2 },
                visualMap: {
                    left: 'right',
                    min: 500000,
                    max: 38000000,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    text: ['高', '低'],
                    calculable: true
                },
                series: [{
                    name: '数据',
                    type: 'map',
                    roam: false,
                    map: 'china',
                    emphasis: { label: { show: true } },
                    data: [
                        { name: '北京', value: 21540000 },
                        { name: '天津', value: 15620000 },
                        { name: '上海', value: 24280000 },
                        { name: '重庆', value: 31020000 },
                        { name: '河北', value: 75200000 },
                        { name: '河南', value: 94020000 },
                        { name: '云南', value: 45970000 },
                        { name: '辽宁', value: 43890000 },
                        { name: '黑龙江', value: 38310000 },
                        { name: '湖南', value: 67370000 },
                        { name: '安徽', value: 59500000 },
                        { name: '山东', value: 95790000 },
                        { name: '新疆', value: 22320000 },
                        { name: '江苏', value: 78660000 },
                        { name: '浙江', value: 54430000 },
                        { name: '江西', value: 44570000 },
                        { name: '湖北', value: 57520000 },
                        { name: '广西', value: 46020000 },
                        { name: '甘肃', value: 25020000 },
                        { name: '山西', value: 34480000 },
                        { name: '内蒙古', value: 24710000 },
                        { name: '陕西', value: 37330000 },
                        { name: '吉林', value: 27040000 },
                        { name: '福建', value: 38060000 },
                        { name: '贵州', value: 33860000 },
                        { name: '广东', value: 104300000 },
                        { name: '青海', value: 5630000 },
                        { name: '西藏', value: 3000000 },
                        { name: '四川', value: 80410000 },
                        { name: '宁夏', value: 6301000 },
                        { name: '海南', value: 8900000 },
                        { name: '台湾', value: 23000000 },
                        { name: '香港', value: 7200000 },
                        { name: '澳门', value: 640000 }
                    ]
                }]
            },
            render: this.renderMapComponent.bind(this)
        });

        // 世界地图
        this.registerComponent({
            id: 'map_world',
            name: '世界地图',
            icon: '🌍',
            category: '地图系列',
            type: 'map',
            defaultProps: {
                title: { text: '世界地图', left: 'center' },
                tooltip: { trigger: 'item', showDelay: 0, transitionDuration: 0.2 },
                visualMap: {
                    left: 'right',
                    min: 0,
                    max: 1000000,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    text: ['高', '低'],
                    calculable: true
                },
                series: [{
                    name: '数据',
                    type: 'map',
                    roam: false,
                    map: 'world',
                    emphasis: { label: { show: true } },
                    data: [
                        { name: 'China', value: 1000000 },
                        { name: 'United States', value: 800000 },
                        { name: 'Brazil', value: 600000 },
                        { name: 'Russia', value: 400000 },
                        { name: 'India', value: 350000 }
                    ]
                }]
            },
            render: this.renderMapComponent.bind(this)
        });
    }

    /**
     * 注册PictorialBar系列组件
     */
    registerPictorialBarCharts() {
        // 基础象形柱图
        this.registerComponent({
            id: 'pictorialBar_basic',
            name: '象形柱图',
            icon: '🎭',
            category: 'PictorialBar系列',
            type: 'pictorialBar',
            defaultProps: {
                title: { text: '象形柱图', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
                yAxis: { type: 'value' },
                series: [{
                    type: 'pictorialBar',
                    symbol: 'rect',
                    data: [
                        { value: 123, symbol: 'circle' },
                        { value: 60, symbol: 'rect' },
                        { value: 25, symbol: 'triangle' },
                        { value: 18, symbol: 'diamond' },
                        { value: 12, symbol: 'pin' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册自定义系列组件
     */
    registerCustomCharts() {
        // 基础自定义图
        this.registerComponent({
            id: 'custom_basic',
            name: '自定义图表',
            icon: '🎨',
            category: '自定义系列',
            type: 'custom',
            defaultProps: {
                title: { text: '自定义图表', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
                yAxis: { type: 'value' },
                series: [{
                    type: 'custom',
                    renderItem: function (params, api) {
                        const categoryIndex = api.value(0);
                        const start = api.coord([categoryIndex, 0]);
                        const end = api.coord([categoryIndex, api.value(1)]);
                        const height = start[1] - end[1];
                        const rectShape = echarts.graphic.clipRectByRect({
                            x: start[0] - 20,
                            y: end[1],
                            width: 40,
                            height: height
                        }, {
                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        });
                        return rectShape && {
                            type: 'rect',
                            shape: rectShape,
                            style: api.style()
                        };
                    },
                    data: [120, 200, 150, 80, 70]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });

        // 甘特图
        this.registerComponent({
            id: 'custom_gantt',
            name: '甘特图',
            icon: '📅',
            category: '自定义系列',
            type: 'custom',
            defaultProps: {
                title: { text: '甘特图', left: 'center' },
                tooltip: {},
                grid: { height: '80%' },
                xAxis: { type: 'time' },
                yAxis: {
                    type: 'category',
                    data: ['任务1', '任务2', '任务3', '任务4']
                },
                series: [{
                    type: 'custom',
                    renderItem: function (params, api) {
                        const categoryIndex = api.value(0);
                        const start = api.coord([api.value(1), categoryIndex]);
                        const end = api.coord([api.value(2), categoryIndex]);
                        const height = api.size([0, 1])[1] * 0.6;
                        
                        return {
                            type: 'rect',
                            shape: {
                                x: start[0],
                                y: start[1] - height / 2,
                                width: end[0] - start[0],
                                height: height
                            },
                            style: api.style()
                        };
                    },
                    encode: {
                        x: [1, 2],
                        y: 0
                    },
                    data: [
                        [0, '2023-01-01', '2023-01-15'],
                        [1, '2023-01-10', '2023-01-25'],
                        [2, '2023-01-20', '2023-02-05'],
                        [3, '2023-02-01', '2023-02-15']
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
    }

    /**
     * 注册3D图表系列组件
     */
    register3DCharts() {
        // 3D柱状图
        this.registerComponent({
            id: 'bar3d_basic',
            name: '3D柱状图',
            icon: '📊',
            category: '3D图表系列',
            type: 'bar3D',
            defaultProps: {
                title: { text: '3D柱状图', left: 'center' },
                tooltip: {},
                visualMap: {
                    max: 100,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                xAxis3D: {
                    type: 'category',
                    data: ['A', 'B', 'C', 'D', 'E']
                },
                yAxis3D: {
                    type: 'category',
                    data: ['1', '2', '3', '4', '5']
                },
                zAxis3D: {
                    type: 'value'
                },
                grid3D: {
                    boxWidth: 200,
                    boxDepth: 80,
                    viewControl: {
                        distance: 200
                    },
                    light: {
                        main: {
                            intensity: 1.2,
                            shadow: true
                        },
                        ambient: {
                            intensity: 0.3
                        }
                    }
                },
                series: [{
                    type: 'bar3D',
                    data: [
                        [0, 0, 60], [0, 1, 40], [0, 2, 80], [0, 3, 30], [0, 4, 90],
                        [1, 0, 70], [1, 1, 50], [1, 2, 60], [1, 3, 40], [1, 4, 80],
                        [2, 0, 50], [2, 1, 70], [2, 2, 90], [2, 3, 60], [2, 4, 70],
                        [3, 0, 80], [3, 1, 60], [3, 2, 70], [3, 3, 90], [3, 4, 50],
                        [4, 0, 90], [4, 1, 80], [4, 2, 50], [4, 3, 70], [4, 4, 60]
                    ],
                    shading: 'lambert'
                }]
            },
            render: this.render3DComponent.bind(this)
        });

        // 3D散点图
        this.registerComponent({
            id: 'scatter3d_basic',
            name: '3D散点图',
            icon: '⚫',
            category: '3D图表系列',
            type: 'scatter3D',
            defaultProps: {
                title: { text: '3D散点图', left: 'center' },
                tooltip: {},
                xAxis3D: { type: 'value' },
                yAxis3D: { type: 'value' },
                zAxis3D: { type: 'value' },
                grid3D: {
                    viewControl: {
                        distance: 200
                    }
                },
                series: [{
                    type: 'scatter3D',
                    symbolSize: 12,
                    data: [
                        [1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4], [5, 5, 5],
                        [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 1], [5, 1, 2]
                    ],
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.8)'
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#fff'
                        }
                    }
                }]
            },
            render: this.render3DComponent.bind(this)
        });

        // 3D曲面图
        this.registerComponent({
            id: 'surface_basic',
            name: '3D曲面图',
            icon: '🌊',
            category: '3D图表系列',
            type: 'surface',
            defaultProps: {
                title: { text: '3D曲面图', left: 'center' },
                tooltip: {},
                visualMap: {
                    show: false,
                    dimension: 2,
                    min: -1,
                    max: 1,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                xAxis3D: { type: 'value' },
                yAxis3D: { type: 'value' },
                zAxis3D: { type: 'value' },
                grid3D: {
                    viewControl: {
                        distance: 200
                    }
                },
                series: [{
                    type: 'surface',
                    wireframe: {
                        show: false
                    },
                    equation: {
                        x: { step: 0.1, min: -3, max: 3 },
                        y: { step: 0.1, min: -3, max: 3 },
                        z: function (x, y) {
                            return Math.sin(x * x + y * y) * x / 3.14;
                        }
                    }
                }]
            },
            render: this.render3DComponent.bind(this)
        });

        // 3D地球
        this.registerComponent({
            id: 'globe_basic',
            name: '3D地球',
            icon: '🌍',
            category: '3D图表系列',
            type: 'globe',
            defaultProps: {
                title: { text: '3D地球', left: 'center' },
                globe: {
                    baseTexture: '/static/js/echarts-gl-master/asset/data/world.topo.bathy.200401.jpg',
                    heightTexture: '/static/js/echarts-gl-master/asset/data/world.topo.bathy.200401.jpg',
                    displacementScale: 0.04,
                    shading: 'realistic',
                    environment: '/static/js/echarts-gl-master/asset/data/starfield.jpg',
                    realisticMaterial: {
                        roughness: 0.9
                    },
                    postEffect: {
                        enable: true
                    },
                    light: {
                        main: {
                            intensity: 5,
                            shadow: true
                        },
                        ambientCubemap: {
                            texture: '/static/js/echarts-gl-master/asset/data/pisa.hdr',
                            diffuseIntensity: 0.2
                        }
                    }
                },
                series: []
            },
            render: this.render3DComponent.bind(this)
        });
    }

    /**
     * 注册基础组件系列
     */
    registerBasicComponents() {
        // 文本框
        this.registerComponent({
            id: 'text_basic',
            name: '文本框',
            icon: '📝',
            category: '基础组件系列',
            type: 'text',
            defaultProps: {
                text: '这是文本内容',
                fontSize: 16,
                color: '#333333',
                fontWeight: 'normal',
                textAlign: 'left',
                backgroundColor: 'transparent',
                padding: 12
            },
            render: this.renderTextComponent.bind(this),
            getProperties: (config) => {
                const props = config.props || {};
                return [
                    { id: 'text', label: '文本内容', type: 'textarea', value: props.text || '这是文本内容' },
                    { id: 'fontSize', label: '字体大小', type: 'number', value: props.fontSize || 16 },
                    { id: 'color', label: '字体颜色', type: 'color', value: props.color || '#333333' },
                    { id: 'fontWeight', label: '字体粗细', type: 'select', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'], value: props.fontWeight || 'normal' },
                    { id: 'textAlign', label: '文本对齐', type: 'select', options: ['left', 'center', 'right'], value: props.textAlign || 'left' },
                    { id: 'backgroundColor', label: '背景颜色', type: 'color', value: props.backgroundColor || 'transparent' },
                    { id: 'padding', label: '内边距', type: 'number', value: props.padding || 12 }
                ];
            }
        });
        
        // 图片组件
        this.registerComponent({
            id: 'image_basic',
            name: '图片组件',
            icon: '🖼️',
            category: '基础组件系列',
            type: 'image',
            defaultProps: {
                src: 'https://via.placeholder.com/300x200',
                alt: '图片',
                objectFit: 'cover'
            },
            render: this.renderImageComponent.bind(this),
            getProperties: (config) => {
                const props = config.props || {};
                return [
                    { id: 'src', label: '图片URL', type: 'text', value: props.src || 'https://via.placeholder.com/300x200' },
                    { id: 'alt', label: '替代文本', type: 'text', value: props.alt || '图片' },
                    { id: 'objectFit', label: '适应方式', type: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'], value: props.objectFit || 'cover' }
                ];
            }
        });
        
        // 时间控件
        this.registerComponent({
            id: 'datetime_basic',
            name: '时间控件',
            icon: '🕐',
            category: '基础组件系列',
            type: 'datetime',
            defaultProps: {
                format: 'YYYY-MM-DD HH:mm:ss',
                showSeconds: true
            },
            render: this.renderDateTimeComponent.bind(this),
            getProperties: (config) => {
                const props = config.props || {};
                return [
                    { id: 'format', label: '时间格式', type: 'text', value: props.format || 'YYYY-MM-DD HH:mm:ss' },
                    { id: 'showSeconds', label: '显示秒', type: 'checkbox', value: props.showSeconds !== false },
                    { id: 'fontSize', label: '字体大小', type: 'number', value: props.fontSize || 16 },
                    { id: 'color', label: '字体颜色', type: 'color', value: props.color || '#333333' },
                    { id: 'textAlign', label: '文本对齐', type: 'select', options: ['left', 'center', 'right'], value: props.textAlign || 'center' }
                ];
            }
        });
    }
    
    /**
     * 获取折线图特有属性（使用新配置系统）
     */
    getLineChartProperties(config) {
        if (window.ChartConfigSystem) {
            return window.ChartConfigSystem.generatePropertiesForChart('line', config);
        }
        
        // 兼容旧系统
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 线条设置
            { id: 'smooth', label: '平滑曲线', type: 'checkbox', value: props.smooth || false, category: '线条设置' },
            { id: 'showArea', label: '显示面积', type: 'checkbox', value: props.showArea || false, category: '线条设置' },
            { id: 'lineWidth', label: '线条宽度', type: 'number', min: 1, max: 10, value: props.lineWidth || 2, category: '线条设置' },
            { id: 'lineType', label: '线条类型', type: 'select', options: [
                { value: 'solid', label: '实线' },
                { value: 'dashed', label: '虚线' },
                { value: 'dotted', label: '点线' }
            ], value: props.lineType || 'solid', category: '线条设置' },
            { id: 'step', label: '阶梯线', type: 'select', options: [
                { value: false, label: '无' },
                { value: 'start', label: '起始' },
                { value: 'middle', label: '中间' },
                { value: 'end', label: '结束' }
            ], value: props.step || false, category: '线条设置' },
            { id: 'connectNulls', label: '连接空数据', type: 'checkbox', value: props.connectNulls || false, category: '线条设置' },
            
            // 标记设置
            { id: 'symbolSize', label: '标记大小', type: 'number', min: 0, max: 20, value: props.symbolSize || 4, category: '标记设置' },
            { id: 'showSymbol', label: '显示标记点', type: 'checkbox', value: props.showSymbol !== false, category: '标记设置' },
            { id: 'symbol', label: '标记类型', type: 'select', options: [
                { value: 'circle', label: '圆形' },
                { value: 'rect', label: '矩形' },
                { value: 'roundRect', label: '圆角矩形' },
                { value: 'triangle', label: '三角形' },
                { value: 'diamond', label: '菱形' },
                { value: 'pin', label: '图钉' },
                { value: 'arrow', label: '箭头' }
            ], value: props.symbol || 'circle', category: '标记设置' },
            
            // 数据设置
            { id: 'stack', label: '堆叠分组', type: 'text', value: props.stack || '', category: '数据设置', description: '相同名称的系列会堆叠显示' },
            { id: 'sampling', label: '数据采样', type: 'select', options: [
                { value: null, label: '无采样' },
                { value: 'average', label: '平均值' },
                { value: 'max', label: '最大值' },
                { value: 'min', label: '最小值' },
                { value: 'sum', label: '求和' }
            ], value: props.sampling || null, category: '数据设置' },
            
            // 坐标轴配置
            ...this.getAxisProperties(config, 'line')
        ];
    }

    /**
     * 获取柱状图特有属性（使用新配置系统）
     */
    getBarChartProperties(config) {
        if (window.ChartConfigSystem) {
            return window.ChartConfigSystem.generatePropertiesForChart('bar', config);
        }
        
        // 兼容旧系统
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 柱子设置
            { id: 'barWidth', label: '柱子宽度', type: 'text', value: props.barWidth || 'auto', category: '柱子设置', description: '可以是数字或百分比，如20或"20%"' },
            { id: 'barMaxWidth', label: '柱子最大宽度', type: 'number', min: 1, max: 200, value: props.barMaxWidth || 50, category: '柱子设置' },
            { id: 'barMinWidth', label: '柱子最小宽度', type: 'number', min: 0, max: 50, value: props.barMinWidth || 1, category: '柱子设置' },
            { id: 'barGap', label: '同类柱间距', type: 'text', value: props.barGap || '20%', category: '柱子设置', description: '同一类目下不同系列的柱间距' },
            { id: 'barCategoryGap', label: '类目间距', type: 'text', value: props.barCategoryGap || '20%', category: '柱子设置', description: '不同类目之间的柱间距' },
            
            // 样式设置
            { id: 'showBackground', label: '显示背景柱', type: 'checkbox', value: props.showBackground || false, category: '样式设置' },
            { id: 'backgroundOpacity', label: '背景透明度', type: 'range', min: 0, max: 1, step: 0.1, value: props.backgroundOpacity || 0.1, category: '样式设置' },
            { id: 'borderRadius', label: '圆角半径', type: 'number', min: 0, max: 20, value: props.borderRadius || 0, category: '样式设置' },
            { id: 'borderWidth', label: '边框宽度', type: 'number', min: 0, max: 5, value: props.borderWidth || 0, category: '样式设置' },
            { id: 'borderColor', label: '边框颜色', type: 'color', value: props.borderColor || '#000000', category: '样式设置' },
            
            // 数据设置
            { id: 'stack', label: '堆叠分组', type: 'text', value: props.stack || '', category: '数据设置', description: '相同名称的系列会堆叠显示' },
            { id: 'large', label: '大数据优化', type: 'checkbox', value: props.large || false, category: '数据设置', description: '数据量大于largeThreshold时启用优化' },
            { id: 'largeThreshold', label: '优化阈值', type: 'number', min: 100, max: 10000, value: props.largeThreshold || 400, category: '数据设置' },
            
            // 标签设置
            { id: 'showLabel', label: '显示标签', type: 'checkbox', value: props.showLabel || false, category: '标签设置' },
            { id: 'labelPosition', label: '标签位置', type: 'select', options: [
                { value: 'top', label: '顶部' },
                { value: 'left', label: '左侧' },
                { value: 'right', label: '右侧' },
                { value: 'bottom', label: '底部' },
                { value: 'inside', label: '内部' },
                { value: 'insideLeft', label: '内部左侧' },
                { value: 'insideRight', label: '内部右侧' },
                { value: 'insideTop', label: '内部顶部' },
                { value: 'insideBottom', label: '内部底部' }
            ], value: props.labelPosition || 'top', category: '标签设置' },
            { id: 'labelColor', label: '标签颜色', type: 'color', value: props.labelColor || '#333333', category: '标签设置' },
            
            // 坐标轴配置
            ...this.getAxisProperties(config, 'bar')
        ];
    }

    /**
     * 获取饼图特有属性（使用新配置系统）
     */
    getPieChartProperties(config) {
        if (window.ChartConfigSystem) {
            return window.ChartConfigSystem.generatePropertiesForChart('pie', config);
        }
        
        // 兼容旧系统
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 尺寸设置
            { id: 'radius', label: '饼图半径', type: 'text', value: props.radius || '50%', category: '尺寸设置', description: '可以是数字或百分比，如50或"50%"' },
            { id: 'innerRadius', label: '内半径', type: 'text', value: props.innerRadius || '0%', category: '尺寸设置', description: '环形图的内半径，0%为实心饼图' },
            { id: 'outerRadius', label: '外半径', type: 'text', value: props.outerRadius || '75%', category: '尺寸设置' },
            
            // 位置设置
            { id: 'centerX', label: '中心X坐标', type: 'text', value: props.centerX || '50%', category: '位置设置' },
            { id: 'centerY', label: '中心Y坐标', type: 'text', value: props.centerY || '50%', category: '位置设置' },
            
            // 角度设置
            { id: 'startAngle', label: '起始角度', type: 'number', min: 0, max: 360, value: props.startAngle || 90, category: '角度设置', description: '0度为3点钟方向，90度为12点钟方向' },
            { id: 'endAngle', label: '结束角度', type: 'number', min: 0, max: 360, value: props.endAngle || 450, category: '角度设置' },
            { id: 'clockwise', label: '顺时针', type: 'checkbox', value: props.clockwise !== false, category: '角度设置' },
            { id: 'minAngle', label: '最小扇区角度', type: 'number', min: 0, max: 360, value: props.minAngle || 0, category: '角度设置', description: '小于此角度的扇区将被合并' },
            
            // 样式设置
            { id: 'roseType', label: '玫瑰图类型', type: 'select', options: [
                { value: null, label: '普通饼图' },
                { value: 'radius', label: '半径玫瑰图' },
                { value: 'area', label: '面积玫瑰图' }
            ], value: props.roseType || null, category: '样式设置' },
            { id: 'avoidLabelOverlap', label: '防止标签重叠', type: 'checkbox', value: props.avoidLabelOverlap !== false, category: '样式设置' },
            { id: 'stillShowZeroSum', label: '数据和为0时显示', type: 'checkbox', value: props.stillShowZeroSum || true, category: '样式设置' },
            
            // 标签设置
            { id: 'showLabel', label: '显示标签', type: 'checkbox', value: props.showLabel !== false, category: '标签设置' },
            { id: 'labelPosition', label: '标签位置', type: 'select', options: [
                { value: 'outside', label: '外部' },
                { value: 'inside', label: '内部' },
                { value: 'center', label: '中心' }
            ], value: props.labelPosition || 'outside', category: '标签设置' },
            { id: 'labelColor', label: '标签颜色', type: 'color', value: props.labelColor || '#333333', category: '标签设置' },
            { id: 'labelFontSize', label: '标签字体大小', type: 'number', min: 8, max: 24, value: props.labelFontSize || 12, category: '标签设置' },
            
            // 引导线设置
            { id: 'showLabelLine', label: '显示引导线', type: 'checkbox', value: props.showLabelLine !== false, category: '引导线设置' },
            { id: 'labelLineLength', label: '第一段长度', type: 'number', min: 0, max: 100, value: props.labelLineLength || 15, category: '引导线设置' },
            { id: 'labelLineLength2', label: '第二段长度', type: 'number', min: 0, max: 100, value: props.labelLineLength2 || 15, category: '引导线设置' },
            
            // 选中设置
            { id: 'selectedMode', label: '选中模式', type: 'select', options: [
                { value: false, label: '不可选中' },
                { value: 'single', label: '单选' },
                { value: 'multiple', label: '多选' }
            ], value: props.selectedMode || false, category: '交互设置' },
            { id: 'selectedOffset', label: '选中偏移', type: 'number', min: 0, max: 50, value: props.selectedOffset || 10, category: '交互设置' }
        ];
    }

    /**
     * 获取散点图特有属性
     */
    getScatterChartProperties(config) {
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 散点设置
            { id: 'symbolSize', label: '标记大小', type: 'number', min: 1, max: 50, value: props.symbolSize || 10, category: '散点设置' },
            { id: 'symbol', label: '标记类型', type: 'select', options: [
                { value: 'circle', label: '圆形' },
                { value: 'rect', label: '矩形' },
                { value: 'roundRect', label: '圆角矩形' },
                { value: 'triangle', label: '三角形' },
                { value: 'diamond', label: '菱形' },
                { value: 'pin', label: '图钉' },
                { value: 'arrow', label: '箭头' }
            ], value: props.symbol || 'circle', category: '散点设置' },
            { id: 'large', label: '大数据优化', type: 'checkbox', value: props.large || false, category: '散点设置' },
            { id: 'largeThreshold', label: '优化阈值', type: 'number', min: 100, max: 10000, value: props.largeThreshold || 2000, category: '散点设置' },
            
            // 坐标轴配置
            ...this.getAxisProperties(config, 'scatter')
        ];
    }
    
    /**
     * 获取雷达图特有属性
     */
    getRadarChartProperties(config) {
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 雷达图设置
            { id: 'radarShape', label: '雷达图形状', type: 'select', options: [
                { value: 'polygon', label: '多边形' },
                { value: 'circle', label: '圆形' }
            ], value: props.radarShape || 'polygon', category: '雷达图设置' },
            { id: 'radarRadius', label: '雷达图半径', type: 'text', value: props.radarRadius || '75%', category: '雷达图设置' },
            { id: 'radarCenter', label: '中心位置', type: 'text', value: props.radarCenter || '50%,50%', category: '雷达图设置' },
            { id: 'splitNumber', label: '分割段数', type: 'number', min: 1, max: 20, value: props.splitNumber || 5, category: '雷达图设置' },
            
            // 标签设置
            { id: 'showLabel', label: '显示标签', type: 'checkbox', value: props.showLabel !== false, category: '标签设置' },
            { id: 'labelColor', label: '标签颜色', type: 'color', value: props.labelColor || '#333333', category: '标签设置' }
        ];
    }
    
    /**
     * 获取仪表盘特有属性
     */
    getGaugeChartProperties(config) {
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 仪表盘设置
            { id: 'gaugeRadius', label: '仪表盘半径', type: 'text', value: props.gaugeRadius || '75%', category: '仪表盘设置' },
            { id: 'gaugeCenter', label: '中心位置', type: 'text', value: props.gaugeCenter || '50%,50%', category: '仪表盘设置' },
            { id: 'startAngle', label: '起始角度', type: 'number', min: 0, max: 360, value: props.startAngle || 225, category: '仪表盘设置' },
            { id: 'endAngle', label: '结束角度', type: 'number', min: 0, max: 360, value: props.endAngle || -45, category: '仪表盘设置' },
            { id: 'min', label: '最小值', type: 'number', value: props.min || 0, category: '仪表盘设置' },
            { id: 'max', label: '最大值', type: 'number', value: props.max || 100, category: '仪表盘设置' },
            { id: 'splitNumber', label: '分割段数', type: 'number', min: 1, max: 20, value: props.splitNumber || 10, category: '仪表盘设置' },
            
            // 指针设置
            { id: 'pointerWidth', label: '指针宽度', type: 'number', min: 1, max: 20, value: props.pointerWidth || 6, category: '指针设置' },
            { id: 'pointerLength', label: '指针长度', type: 'text', value: props.pointerLength || '80%', category: '指针设置' }
        ];
    }
    
    /**
     * 获取热力图特有属性
     */
    getHeatmapChartProperties(config) {
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 热力图设置
            { id: 'blurSize', label: '模糊大小', type: 'number', min: 0, max: 100, value: props.blurSize || 30, category: '热力图设置' },
            { id: 'minOpacity', label: '最小透明度', type: 'range', min: 0, max: 1, step: 0.1, value: props.minOpacity || 0, category: '热力图设置' },
            { id: 'maxOpacity', label: '最大透明度', type: 'range', min: 0, max: 1, step: 0.1, value: props.maxOpacity || 1, category: '热力图设置' },
            
            // 视觉映射设置
            { id: 'visualMapMin', label: '映射最小值', type: 'number', value: props.visualMapMin || 0, category: '视觉映射' },
            { id: 'visualMapMax', label: '映射最大值', type: 'number', value: props.visualMapMax || 100, category: '视觉映射' },
            { id: 'visualMapCalculable', label: '可计算', type: 'checkbox', value: props.visualMapCalculable !== false, category: '视觉映射' },
            
            // 坐标轴配置
            ...this.getAxisProperties(config, 'heatmap')
        ];
    }
    
    /**
     * 获取特殊图表通用属性
     */
    getSpecialChartProperties(config) {
        const props = config.props || {};
        return [
            // 基础配置
            ...this.getEChartsBaseProperties(config),
            
            // 特殊图表通用设置
            { id: 'animationDuration', label: '动画时长', type: 'number', min: 0, max: 5000, value: props.animationDuration || 1000, category: '动画设置' },
            { id: 'animationEasing', label: '动画缓动', type: 'select', options: [
                { value: 'linear', label: '线性' },
                { value: 'quadraticIn', label: '二次缓入' },
                { value: 'quadraticOut', label: '二次缓出' },
                { value: 'cubicIn', label: '三次缓入' },
                { value: 'cubicOut', label: '三次缓出' },
                { value: 'elasticOut', label: '弹性缓出' }
            ], value: props.animationEasing || 'cubicOut', category: '动画设置' },
            
            // 标签设置
            { id: 'showLabel', label: '显示标签', type: 'checkbox', value: props.showLabel !== false, category: '标签设置' },
            { id: 'labelColor', label: '标签颜色', type: 'color', value: props.labelColor || '#333333', category: '标签设置' },
            { id: 'labelFontSize', label: '标签字体大小', type: 'number', min: 8, max: 24, value: props.labelFontSize || 12, category: '标签设置' }
        ];
    }
    
    /**
     * ECharts组件基础属性
     */
    getEChartsBaseProperties(config) {
        const props = config.props || {};
        return [
            // 标题配置
            { id: 'title', label: '图表标题', type: 'text', value: props.title?.text || '' },
            { id: 'titlePosition', label: '标题位置', type: 'select', options: ['left', 'center', 'right'], value: props.title?.left || 'center' },
            { id: 'titleTop', label: '标题上边距', type: 'text', value: props.title?.top || 'auto' },
            { id: 'titleTextStyle', label: '标题字体大小', type: 'number', min: 12, max: 48, value: props.title?.textStyle?.fontSize || 18 },
            { id: 'subtitle', label: '副标题', type: 'text', value: props.title?.subtext || '' },
            
            // 图例配置
            { id: 'showLegend', label: '显示图例', type: 'checkbox', value: !!props.legend },
            { id: 'legendPosition', label: '图例位置', type: 'select', options: ['top', 'bottom', 'left', 'right'], value: props.legend?.orient === 'vertical' ? (props.legend?.left || 'right') : (props.legend?.top ? 'top' : 'bottom') },
            { id: 'legendAlign', label: '图例对齐', type: 'select', options: ['auto', 'left', 'center', 'right'], value: props.legend?.align || 'auto' },
            
            // 提示框配置
            { id: 'showTooltip', label: '显示提示框', type: 'checkbox', value: !!props.tooltip },
            { id: 'tooltipTrigger', label: '触发类型', type: 'select', options: ['item', 'axis', 'none'], value: props.tooltip?.trigger || 'item' },
            
            // 工具箱配置
            { id: 'showToolbox', label: '显示工具箱', type: 'checkbox', value: !!props.toolbox },
            { id: 'toolboxFeatures', label: '工具箱功能', type: 'multiselect', options: [
                { value: 'saveAsImage', label: '保存图片' },
                { value: 'dataView', label: '数据视图' },
                { value: 'magicType', label: '图表类型切换' },
                { value: 'restore', label: '还原' },
                { value: 'dataZoom', label: '数据缩放' }
            ], value: this.getToolboxFeatures(props.toolbox) },
            
            // 网格配置
            { id: 'gridLeft', label: '左边距', type: 'text', value: props.grid?.left || '10%' },
            { id: 'gridRight', label: '右边距', type: 'text', value: props.grid?.right || '10%' },
            { id: 'gridTop', label: '上边距', type: 'text', value: props.grid?.top || '60' },
            { id: 'gridBottom', label: '下边距', type: 'text', value: props.grid?.bottom || '60' },
            
            // 动画配置
            { id: 'animation', label: '启用动画', type: 'checkbox', value: props.animation !== false },
            { id: 'animationDuration', label: '动画时长(ms)', type: 'number', min: 0, max: 5000, value: props.animationDuration || 1000 },
            { id: 'animationEasing', label: '缓动效果', type: 'select', options: ['linear', 'quadraticIn', 'quadraticOut', 'quadraticInOut', 'cubicIn', 'cubicOut', 'cubicInOut', 'elasticOut', 'bounceOut'], value: props.animationEasing || 'cubicOut' },
            
            // 主题配置
            { id: 'theme', label: '图表主题', type: 'select', options: ['default', 'dark', 'vintage', 'macarons', 'infographic', 'shine', 'roma'], value: props.theme || 'default' },
            
            // 数据配置
            { id: 'dataUrl', label: '数据接口URL', type: 'text', value: props.dataUrl || '' },
            { id: 'refreshInterval', label: '刷新间隔(秒)', type: 'number', min: 0, max: 3600, value: props.refreshInterval || 0 }
        ];
    }

    /**
     * 获取坐标轴配置属性
     */
    getAxisProperties(config, chartType) {
        const props = config.props || {};
        const properties = [];
        
        if (chartType !== 'pie' && chartType !== 'gauge' && chartType !== 'radar') {
            // X轴配置
            properties.push(
                { id: 'xAxisName', label: 'X轴名称', type: 'text', value: props.xAxis?.name || '' },
                { id: 'xAxisNameLocation', label: 'X轴名称位置', type: 'select', options: ['start', 'middle', 'end'], value: props.xAxis?.nameLocation || 'end' },
                { id: 'xAxisType', label: 'X轴类型', type: 'select', options: ['category', 'value', 'time', 'log'], value: props.xAxis?.type || 'category' },
                { id: 'xAxisShow', label: '显示X轴', type: 'checkbox', value: props.xAxis?.show !== false },
                { id: 'xAxisSplitLine', label: 'X轴分割线', type: 'checkbox', value: !!props.xAxis?.splitLine?.show },
                
                // Y轴配置
                { id: 'yAxisName', label: 'Y轴名称', type: 'text', value: props.yAxis?.name || '' },
                { id: 'yAxisNameLocation', label: 'Y轴名称位置', type: 'select', options: ['start', 'middle', 'end'], value: props.yAxis?.nameLocation || 'end' },
                { id: 'yAxisType', label: 'Y轴类型', type: 'select', options: ['category', 'value', 'time', 'log'], value: props.yAxis?.type || 'value' },
                { id: 'yAxisShow', label: '显示Y轴', type: 'checkbox', value: props.yAxis?.show !== false },
                { id: 'yAxisSplitLine', label: 'Y轴分割线', type: 'checkbox', value: !!props.yAxis?.splitLine?.show },
                
                // 数据缩放
                { id: 'enableDataZoom', label: '启用数据缩放', type: 'checkbox', value: !!props.dataZoom },
                { id: 'dataZoomType', label: '缩放类型', type: 'select', options: ['slider', 'inside', 'both'], value: this.getDataZoomType(props.dataZoom) }
            );
        }
        
        return properties;
    }

    /**
     * 获取工具箱功能列表
     */
    getToolboxFeatures(toolbox) {
        if (!toolbox || !toolbox.feature) return [];
        return Object.keys(toolbox.feature);
    }

    /**
     * 获取数据缩放类型
     */
    getDataZoomType(dataZoom) {
        if (!dataZoom || !Array.isArray(dataZoom)) return 'slider';
        if (dataZoom.length > 1) return 'both';
        return dataZoom[0]?.type || 'slider';
    }
    
    /**
     * 基础组件通用属性获取方法
     */
    getBasicComponentProperties(config) {
        const props = config.props || {};
        return [
            { id: 'backgroundColor', label: '背景颜色', type: 'color', value: props.backgroundColor || 'transparent' },
            { id: 'borderColor', label: '边框颜色', type: 'color', value: props.borderColor || '#e0e0e0' },
            { id: 'borderWidth', label: '边框宽度', type: 'number', value: props.borderWidth || 0 },
            { id: 'borderRadius', label: '圆角半径', type: 'number', value: props.borderRadius || 4 },
            { id: 'opacity', label: '透明度', type: 'range', min: 0, max: 1, step: 0.1, value: props.opacity || 1 }
        ];
    }

    /**
     * ECharts组件通用渲染方法
     */
    renderEChartsComponent(container, options = {}) {
        if (typeof echarts === 'undefined') {
            container.innerHTML = '<div style="color: red; padding: 20px;">ECharts 未加载</div>';
            return null;
        }
        
        try {
            // 清空容器
            container.innerHTML = '';
            
            // 设置容器背景为透明
            container.style.backgroundColor = 'transparent';
            
            // 获取主题设置
            const theme = options.theme || 'default';
            const actualTheme = theme === 'default' ? null : theme;
            console.log(`🎨 ECharts主题设置: ${theme} -> ${actualTheme}`);
            
            // 检查ECharts是否支持该主题
            if (actualTheme && window.echarts) {
                console.log('📋 ECharts对象存在，检查主题支持');
                try {
                    // 尝试获取主题信息
                    const themeObj = window.echarts.getTheme ? window.echarts.getTheme(actualTheme) : null;
                    console.log(`🎭 主题 ${actualTheme} 支持情况:`, themeObj ? '支持' : '不支持');
                } catch (e) {
                    console.warn('⚠️ 主题检查失败:', e);
                }
            }
            
            // 初始化ECharts实例，支持主题
            const chart = echarts.init(container, actualTheme, {
                renderer: 'canvas',
                useDirtyRect: false,
                backgroundColor: 'transparent' // 设置ECharts背景为透明
            });
            
            // 确保容器背景透明
            container.style.backgroundColor = 'transparent';
            
            console.log('✅ ECharts实例已创建，主题:', actualTheme || 'default');
            
            // 处理配置选项 - 需要分离基础配置和用户配置
            let baseOptions = { 
                ...options,
                backgroundColor: 'transparent' // 强制设置透明背景
            };
            let userConfig = {};
            
            // 提取用户配置项（从属性面板传来的配置）
            const userConfigKeys = ['smooth', 'showArea', 'lineWidth', 'symbolSize', 'showSymbol', 'step', 'connectNulls', 'stack', 'sampling',
                                  'barWidth', 'barMaxWidth', 'barMinWidth', 'barGap', 'barCategoryGap', 'showBackground', 'borderRadius',
                                  'radius', 'innerRadius', 'outerRadius', 'centerX', 'centerY', 'startAngle', 'roseType',
                                  'showTitle', 'titleText', 'titleLeft', 'titleTop', 'titleColor', 'titleFontSize',
                                  'showLegend', 'legendPosition', 'legendAlign', 'legendColor',
                                  'showTooltip', 'tooltipTrigger', 'tooltipBackground', 'tooltipColor',
                                  'showToolbox', 'toolboxFeatures', 'toolboxOrient', 'toolboxLeft', 'toolboxTop',
                                  'gridLeft', 'gridRight', 'gridTop', 'gridBottom', 'gridContainLabel',
                                  'animation', 'animationDuration', 'animationEasing', 'theme',
                                  'xAxisName', 'xAxisType', 'xAxisShow', 'xAxisSplitLine', 'enableDataZoom', 'dataZoomType',
                                  'yAxisName', 'yAxisType', 'yAxisShow', 'yAxisSplitLine'];
            
            userConfigKeys.forEach(key => {
                if (options[key] !== undefined) {
                    userConfig[key] = options[key];
                    delete baseOptions[key];
                }
            });
            
            console.log('📊 基础配置:', baseOptions);
            console.log('🎛️ 用户配置:', userConfig);
            
            // 使用新的配置系统处理图表配置
            const chartType = this.detectChartType(baseOptions);
            console.log('🔍 检测到图表类型:', chartType);
            
            // 使用新的配置系统处理配置
            let chartOptions;
            if (window.ChartConfigSystem) {
                chartOptions = window.ChartConfigSystem.processChartConfig(chartType, baseOptions, userConfig);
            } else {
                console.warn('⚠️ ChartConfigSystem未加载，使用旧的配置处理');
                chartOptions = this.processChartOptions(baseOptions, userConfig);
            }
            
            // 确保背景透明
            chartOptions.backgroundColor = 'transparent';
            
            // 设置图表选项
            chart.setOption(chartOptions, true);
            
            // 对于某些图表类型，禁用内部交互以避免拖动冲突
            if (options.type === 'parallel' || options.parallelAxis) {
                try {
                    // 安全地禁用平行坐标系的交互，避免与拖拽冲突
                    const zr = chart.getZr();
                    if (zr && zr.handler && zr.handler.proxy && zr.handler.proxy.style) {
                        zr.handler.proxy.style.pointerEvents = 'none';
                        
                        // 但保留hover效果
                        chart.on('mouseover', () => {
                            if (zr.handler && zr.handler.proxy && zr.handler.proxy.style) {
                                zr.handler.proxy.style.pointerEvents = 'auto';
                            }
                        });
                        chart.on('mouseout', () => {
                            if (zr.handler && zr.handler.proxy && zr.handler.proxy.style) {
                                zr.handler.proxy.style.pointerEvents = 'none';
                            }
                        });
                    }
                } catch (error) {
                    console.warn('设置平行坐标系交互失败:', error);
                }
            }
            
            // 添加resize监听
            const resizeObserver = new ResizeObserver(() => {
                if (chart && !chart.isDisposed()) {
                    chart.resize();
                }
            });
            resizeObserver.observe(container);
            
            return chart;
        } catch (error) {
            console.error('ECharts渲染失败:', error);
            container.innerHTML = `<div style="color: red; padding: 20px;">渲染失败: ${error.message}</div>`;
            return null;
        }
    }
    
    /**
     * 检测图表类型
     */
    detectChartType(options) {
        if (options.series && options.series.length > 0) {
            const firstSeries = options.series[0];
            if (firstSeries.type) {
                return firstSeries.type;
            }
        }
        
        // 根据其他特征检测
        if (options.parallelAxis) return 'parallel';
        if (options.radar) return 'radar';
        if (options.geo) return 'map';
        if (options.xAxis3D || options.yAxis3D || options.zAxis3D) return '3d';
        
        // 默认返回line
        return 'line';
    }

    /**
     * 处理图表配置选项
     * @param {Object} baseOptions - 基础ECharts配置
     * @param {Object} userConfig - 用户配置更改
     */
    processChartOptions(baseOptions, userConfig = {}) {
        console.log('🔧 开始处理图表配置');
        console.log('📊 基础配置:', baseOptions);
        console.log('🎛️ 用户配置:', userConfig);
        
        // 深拷贝基础选项，避免修改原对象
        const processedOptions = JSON.parse(JSON.stringify(baseOptions));
        
        // 确保背景透明
        processedOptions.backgroundColor = 'transparent';
        
        // 使用新的智能配置合并方法
        return this.mergeUserConfig(processedOptions, userConfig);
    }
    
    /**
     * 智能合并用户配置到基础配置（旧方法，已废弃）
     */
    processChartOptionsOld(options) {
        // 处理标题配置 - 支持从属性面板传来的配置
        if (options.title !== undefined || options.titlePosition || options.titleTop || options.titleTextStyle || options.titleColor || options.subtitle) {
            // 获取基础标题对象
            let baseTitle = {};
            let titleText = '';
            
            if (typeof options.title === 'string') {
                titleText = options.title;
                baseTitle.text = options.title;
            } else if (typeof options.title === 'object' && options.title !== null) {
                titleText = options.title.text || '';
                baseTitle = { ...options.title };
            } else if (processedOptions.title && typeof processedOptions.title === 'object') {
                titleText = processedOptions.title.text || '';
                baseTitle = { ...processedOptions.title };
            }
            
            // 应用标题配置 - 优先使用属性面板的值
            processedOptions.title = {
                text: titleText || baseTitle.text || '',
                left: options.titlePosition || baseTitle.left || 'center',
                top: options.titleTop || baseTitle.top || 'auto',
                textStyle: {
                    fontSize: options.titleTextStyle || baseTitle.textStyle?.fontSize || 18,
                    color: options.titleColor || baseTitle.textStyle?.color || '#333'
                },
                subtext: options.subtitle || baseTitle.subtext || ''
            };
            
            console.log('🏷️ 标题配置已处理:', {
                input: { title: options.title, titleText: titleText },
                output: processedOptions.title
            });
        }
        
        // 处理图例配置
        if (options.showLegend !== undefined) {
            if (options.showLegend) {
                processedOptions.legend = {
                    show: true,
                    orient: (options.legendPosition === 'left' || options.legendPosition === 'right') ? 'vertical' : 'horizontal',
                    left: (options.legendPosition === 'left' || options.legendPosition === 'right') ? options.legendPosition : 'auto',
                    top: (options.legendPosition === 'top' || options.legendPosition === 'bottom') ? options.legendPosition : 'auto',
                    align: options.legendAlign || 'auto',
                    textStyle: {
                        color: options.legendColor || '#333'
                    }
                };
            } else {
                processedOptions.legend = { show: false };
            }
        }
        
        // 处理提示框配置
        if (options.showTooltip !== undefined) {
            if (options.showTooltip) {
                processedOptions.tooltip = {
                    show: true,
                    trigger: options.tooltipTrigger || 'item',
                    backgroundColor: options.tooltipBackground || 'rgba(50,50,50,0.7)',
                    textStyle: {
                        color: options.tooltipColor || '#fff'
                    }
                };
            } else {
                processedOptions.tooltip = { show: false };
            }
        }
        
        // 处理工具箱配置
        if (options.showToolbox !== undefined) {
            if (options.showToolbox) {
                const toolboxFeatures = options.toolboxFeatures || ['saveAsImage'];
                console.log('🛠️ 工具箱功能列表:', toolboxFeatures);
                const builtFeatures = this.buildToolboxFeatures(toolboxFeatures);
                console.log('🛠️ 构建的工具箱功能:', builtFeatures);
                processedOptions.toolbox = {
                    show: true,
                    orient: options.toolboxOrient || 'horizontal',
                    left: options.toolboxLeft || 'right',
                    top: options.toolboxTop || 'top',
                    feature: builtFeatures
                };
            } else {
                processedOptions.toolbox = { show: false };
            }
        }
        
        // 处理网格配置
        if (options.gridLeft || options.gridRight || options.gridTop || options.gridBottom) {
            processedOptions.grid = {
                left: options.gridLeft || '10%',
                right: options.gridRight || '10%',
                top: options.gridTop || '60',
                bottom: options.gridBottom || '60',
                containLabel: options.gridContainLabel !== false
            };
        }
        
        // 处理X轴配置
        if (processedOptions.xAxis && (options.xAxisName || options.xAxisType || options.xAxisShow !== undefined || options.xAxisSplitLine !== undefined)) {
            if (Array.isArray(processedOptions.xAxis)) {
                processedOptions.xAxis = processedOptions.xAxis.map(axis => ({
                    ...axis,
                    name: options.xAxisName || axis.name,
                    nameLocation: options.xAxisNameLocation || axis.nameLocation || 'end',
                    type: options.xAxisType || axis.type,
                    show: options.xAxisShow !== false,
                    splitLine: {
                        show: options.xAxisSplitLine || false
                    },
                    axisLabel: {
                        color: options.xAxisLabelColor || '#333'
                    }
                }));
            } else {
                processedOptions.xAxis = {
                    ...processedOptions.xAxis,
                    name: options.xAxisName || processedOptions.xAxis.name,
                    nameLocation: options.xAxisNameLocation || processedOptions.xAxis.nameLocation || 'end',
                    type: options.xAxisType || processedOptions.xAxis.type,
                    show: options.xAxisShow !== false,
                    splitLine: {
                        show: options.xAxisSplitLine || false
                    },
                    axisLabel: {
                        color: options.xAxisLabelColor || '#333'
                    }
                };
            }
        }
        
        // 处理Y轴配置
        if (processedOptions.yAxis && (options.yAxisName || options.yAxisType || options.yAxisShow !== undefined || options.yAxisSplitLine !== undefined)) {
            if (Array.isArray(processedOptions.yAxis)) {
                processedOptions.yAxis = processedOptions.yAxis.map(axis => ({
                    ...axis,
                    name: options.yAxisName || axis.name,
                    nameLocation: options.yAxisNameLocation || axis.nameLocation || 'end',
                    type: options.yAxisType || axis.type,
                    show: options.yAxisShow !== false,
                    splitLine: {
                        show: options.yAxisSplitLine !== false
                    },
                    axisLabel: {
                        color: options.yAxisLabelColor || '#333'
                    }
                }));
            } else {
                processedOptions.yAxis = {
                    ...processedOptions.yAxis,
                    name: options.yAxisName || processedOptions.yAxis.name,
                    nameLocation: options.yAxisNameLocation || processedOptions.yAxis.nameLocation || 'end',
                    type: options.yAxisType || processedOptions.yAxis.type,
                    show: options.yAxisShow !== false,
                    splitLine: {
                        show: options.yAxisSplitLine !== false
                    },
                    axisLabel: {
                        color: options.yAxisLabelColor || '#333'
                    }
                };
            }
        }
        
        // 处理数据缩放配置
        if (options.enableDataZoom !== undefined) {
            if (options.enableDataZoom) {
                processedOptions.dataZoom = this.buildDataZoomConfig(options.dataZoomType || 'slider');
            } else {
                processedOptions.dataZoom = [];
            }
        }
        
        // 处理系列配置
        if (processedOptions.series && Array.isArray(processedOptions.series)) {
            processedOptions.series = processedOptions.series.map(series => {
                const newSeries = { ...series };
                
                // 折线图配置
                if (series.type === 'line') {
                    if (options.smooth !== undefined) {
                        newSeries.smooth = options.smooth;
                        console.log(`📈 应用平滑曲线配置: ${options.smooth}`);
                    }
                    if (options.showArea !== undefined) newSeries.areaStyle = options.showArea ? {} : null;
                    if (options.lineWidth !== undefined) newSeries.lineStyle = { ...newSeries.lineStyle, width: options.lineWidth };
                    if (options.symbolSize !== undefined) newSeries.symbolSize = options.symbolSize;
                    if (options.showSymbol !== undefined) newSeries.showSymbol = options.showSymbol;
                    if (options.step !== undefined) newSeries.step = options.step;
                }
                
                // 柱状图配置
                if (series.type === 'bar') {
                    if (options.barWidth !== undefined) newSeries.barWidth = options.barWidth;
                    if (options.barMaxWidth !== undefined) newSeries.barMaxWidth = options.barMaxWidth;
                    if (options.barGap !== undefined) newSeries.barGap = options.barGap;
                    if (options.showBackground !== undefined) newSeries.backgroundStyle = options.showBackground ? { opacity: 0.1 } : null;
                    if (options.stack !== undefined) newSeries.stack = options.stack || null;
                }
                
                // 饼图配置
                if (series.type === 'pie') {
                    if (options.radius !== undefined) {
                        if (typeof options.radius === 'string') {
                            newSeries.radius = options.radius;
                        } else if (options.innerRadius !== undefined && options.outerRadius !== undefined) {
                            newSeries.radius = [options.innerRadius, options.outerRadius];
                        }
                    }
                    if (options.centerX !== undefined && options.centerY !== undefined) {
                        newSeries.center = [options.centerX, options.centerY];
                    }
                    if (options.startAngle !== undefined) newSeries.startAngle = options.startAngle;
                    if (options.roseType !== undefined) newSeries.roseType = options.roseType || null;
                    if (options.showLabel !== undefined) {
                        newSeries.label = { 
                            show: options.showLabel, 
                            position: options.labelPosition || 'outside',
                            color: options.labelColor || '#333'
                        };
                    }
                }
                
                // 散点图配置
                if (series.type === 'scatter') {
                    if (options.symbolSize !== undefined) {
                        if (typeof options.symbolSize === 'function') {
                            newSeries.symbolSize = options.symbolSize;
                        } else {
                            newSeries.symbolSize = options.symbolSize;
                        }
                    }
                    if (options.symbol !== undefined) newSeries.symbol = options.symbol;
                }
                
                // 通用系列配置
                if (options.seriesColor !== undefined) {
                    newSeries.itemStyle = { ...newSeries.itemStyle, color: options.seriesColor };
                }
                
                return newSeries;
            });
            console.log('📊 处理后的系列配置:', processedOptions.series);
        }
        
        // 处理动画配置
        if (options.animation !== undefined) {
            processedOptions.animation = options.animation;
            if (options.animationDuration !== undefined) {
                processedOptions.animationDuration = options.animationDuration;
            }
            if (options.animationEasing !== undefined) {
                processedOptions.animationEasing = options.animationEasing;
            }
        }
        
        // 处理雷达图配置
        if (options.radarShape || options.radarRadius || options.radarCenter || options.splitNumber) {
            if (!processedOptions.radar) processedOptions.radar = {};
            if (options.radarShape) processedOptions.radar.shape = options.radarShape;
            if (options.radarRadius) processedOptions.radar.radius = options.radarRadius;
            if (options.radarCenter) {
                const center = options.radarCenter.split(',').map(s => s.trim());
                processedOptions.radar.center = center;
            }
            if (options.splitNumber) processedOptions.radar.splitNumber = options.splitNumber;
        }
        
        // 处理仪表盘配置
        if (options.gaugeRadius || options.gaugeCenter || options.startAngle || options.endAngle || options.min !== undefined || options.max !== undefined) {
            processedOptions.series = processedOptions.series?.map(series => {
                if (series.type === 'gauge') {
                    const newSeries = { ...series };
                    if (options.gaugeRadius) newSeries.radius = options.gaugeRadius;
                    if (options.gaugeCenter) {
                        const center = options.gaugeCenter.split(',').map(s => s.trim());
                        newSeries.center = center;
                    }
                    if (options.startAngle !== undefined) newSeries.startAngle = options.startAngle;
                    if (options.endAngle !== undefined) newSeries.endAngle = options.endAngle;
                    if (options.min !== undefined) newSeries.min = options.min;
                    if (options.max !== undefined) newSeries.max = options.max;
                    if (options.splitNumber !== undefined) newSeries.splitNumber = options.splitNumber;
                    if (options.pointerWidth !== undefined) {
                        newSeries.pointer = { ...newSeries.pointer, width: options.pointerWidth };
                    }
                    if (options.pointerLength !== undefined) {
                        newSeries.pointer = { ...newSeries.pointer, length: options.pointerLength };
                    }
                    return newSeries;
                }
                return series;
            });
        }
        
        // 处理热力图配置
        if (options.blurSize || options.minOpacity !== undefined || options.maxOpacity !== undefined) {
            processedOptions.series = processedOptions.series?.map(series => {
                if (series.type === 'heatmap') {
                    const newSeries = { ...series };
                    if (options.blurSize !== undefined) newSeries.blurSize = options.blurSize;
                    if (options.minOpacity !== undefined) newSeries.minOpacity = options.minOpacity;
                    if (options.maxOpacity !== undefined) newSeries.maxOpacity = options.maxOpacity;
                    return newSeries;
                }
                return series;
            });
        }
        
        // 处理视觉映射配置
        if (options.visualMapMin !== undefined || options.visualMapMax !== undefined || options.visualMapCalculable !== undefined) {
            if (!processedOptions.visualMap) processedOptions.visualMap = {};
            if (options.visualMapMin !== undefined) processedOptions.visualMap.min = options.visualMapMin;
            if (options.visualMapMax !== undefined) processedOptions.visualMap.max = options.visualMapMax;
            if (options.visualMapCalculable !== undefined) processedOptions.visualMap.calculable = options.visualMapCalculable;
        }
        
        // 处理主题配置 - 不在这里处理，而是在renderEChartsComponent中处理
        
        // 处理数据刷新配置
        if (options.refreshInterval !== undefined) {
            processedOptions._refreshInterval = options.refreshInterval;
        }
        
        // 处理数据URL配置
        if (options.dataUrl) {
            processedOptions._dataUrl = options.dataUrl;
        }
        
        console.log('🔧 配置处理完成:', {
            input: Object.keys(options),
            inputValues: options,
            output: Object.keys(processedOptions),
            outputValues: processedOptions,
            specialConfigs: {
                theme: processedOptions._theme,
                refreshInterval: processedOptions._refreshInterval,
                dataUrl: processedOptions._dataUrl
            }
        });
        
        return processedOptions;
    }
    
    /**
     * 智能合并用户配置到基础配置
     * @param {Object} baseOptions - 基础ECharts配置
     * @param {Object} userConfig - 用户配置更改
     */
    mergeUserConfig(baseOptions, userConfig) {
        console.log('🔀 开始合并用户配置');
        
        // 处理标题配置
        this.mergeTitle(baseOptions, userConfig);
        
        // 处理图例配置
        this.mergeLegend(baseOptions, userConfig);
        
        // 处理工具箱配置
        this.mergeToolbox(baseOptions, userConfig);
        
        // 处理系列配置（最重要 - 保持图表特有配置）
        this.mergeSeries(baseOptions, userConfig);
        
        // 处理坐标轴配置
        this.mergeAxis(baseOptions, userConfig);
        
        // 处理其他配置
        this.mergeOtherOptions(baseOptions, userConfig);
        
        console.log('✅ 配置合并完成:', baseOptions);
        return baseOptions;
    }
    
    /**
     * 合并标题配置
     */
    mergeTitle(baseOptions, userConfig) {
        if (userConfig.showTitle !== undefined) {
            if (userConfig.showTitle) {
                baseOptions.title = baseOptions.title || {};
                if (userConfig.titleText !== undefined) baseOptions.title.text = userConfig.titleText;
                if (userConfig.titleLeft !== undefined) baseOptions.title.left = userConfig.titleLeft;
                if (userConfig.titleTop !== undefined) baseOptions.title.top = userConfig.titleTop;
                if (userConfig.titleColor !== undefined || userConfig.titleFontSize !== undefined) {
                    baseOptions.title.textStyle = baseOptions.title.textStyle || {};
                    if (userConfig.titleColor !== undefined) baseOptions.title.textStyle.color = userConfig.titleColor;
                    if (userConfig.titleFontSize !== undefined) baseOptions.title.textStyle.fontSize = userConfig.titleFontSize;
                }
            } else {
                baseOptions.title = { show: false };
            }
        }
    }
    
    /**
     * 合并图例配置
     */
    mergeLegend(baseOptions, userConfig) {
        if (userConfig.showLegend !== undefined) {
            if (userConfig.showLegend) {
                baseOptions.legend = baseOptions.legend || {};
                baseOptions.legend.show = true;
                
                if (userConfig.legendPosition !== undefined) {
                    const pos = userConfig.legendPosition;
                    baseOptions.legend.orient = (pos === 'left' || pos === 'right') ? 'vertical' : 'horizontal';
                    if (pos === 'left' || pos === 'right') {
                        baseOptions.legend.left = pos;
                        baseOptions.legend.top = 'middle';
                    } else {
                        baseOptions.legend.top = pos;
                        baseOptions.legend.left = 'center';
                    }
                }
                
                if (userConfig.legendAlign !== undefined) {
                    baseOptions.legend.align = userConfig.legendAlign;
                }
                
                if (userConfig.legendColor !== undefined) {
                    baseOptions.legend.textStyle = baseOptions.legend.textStyle || {};
                    baseOptions.legend.textStyle.color = userConfig.legendColor;
                }
            } else {
                baseOptions.legend = { show: false };
            }
        }
    }
    
    /**
     * 合并工具箱配置
     */
    mergeToolbox(baseOptions, userConfig) {
        if (userConfig.showToolbox !== undefined) {
            if (userConfig.showToolbox) {
                baseOptions.toolbox = {
                    show: true,
                    orient: userConfig.toolboxOrient || 'horizontal',
                    left: userConfig.toolboxLeft || 'right',
                    top: userConfig.toolboxTop || 'top',
                    feature: this.buildToolboxFeatures(userConfig.toolboxFeatures || ['saveAsImage'])
                };
                console.log('🛠️ 工具箱配置已应用:', baseOptions.toolbox);
            } else {
                baseOptions.toolbox = { show: false };
            }
        }
    }
    
    /**
     * 合并系列配置（保持图表特有配置）
     */
    mergeSeries(baseOptions, userConfig) {
        if (baseOptions.series && Array.isArray(baseOptions.series)) {
            baseOptions.series = baseOptions.series.map(series => {
                const newSeries = { ...series };
                
                // 折线图配置
                if (series.type === 'line') {
                    if (userConfig.smooth !== undefined) {
                        newSeries.smooth = userConfig.smooth;
                        console.log(`📈 应用平滑曲线配置: ${userConfig.smooth}`);
                    }
                    if (userConfig.showArea !== undefined) {
                        newSeries.areaStyle = userConfig.showArea ? (newSeries.areaStyle || {}) : null;
                    }
                    if (userConfig.lineWidth !== undefined) {
                        newSeries.lineStyle = newSeries.lineStyle || {};
                        newSeries.lineStyle.width = userConfig.lineWidth;
                    }
                    if (userConfig.symbolSize !== undefined) newSeries.symbolSize = userConfig.symbolSize;
                    if (userConfig.showSymbol !== undefined) newSeries.showSymbol = userConfig.showSymbol;
                    if (userConfig.step !== undefined) newSeries.step = userConfig.step;
                }
                
                // 柱状图配置
                if (series.type === 'bar') {
                    if (userConfig.barWidth !== undefined) newSeries.barWidth = userConfig.barWidth;
                    if (userConfig.barMaxWidth !== undefined) newSeries.barMaxWidth = userConfig.barMaxWidth;
                    if (userConfig.showBackground !== undefined) {
                        newSeries.backgroundStyle = userConfig.showBackground ? { opacity: 0.1 } : null;
                    }
                }
                
                // 饼图配置
                if (series.type === 'pie') {
                    if (userConfig.radius !== undefined) newSeries.radius = userConfig.radius;
                    if (userConfig.centerX !== undefined && userConfig.centerY !== undefined) {
                        newSeries.center = [userConfig.centerX, userConfig.centerY];
                    }
                    if (userConfig.startAngle !== undefined) newSeries.startAngle = userConfig.startAngle;
                    if (userConfig.roseType !== undefined) newSeries.roseType = userConfig.roseType || null;
                }
                
                return newSeries;
            });
        }
    }
    
    /**
     * 合并坐标轴配置
     */
    mergeAxis(baseOptions, userConfig) {
        // X轴配置
        if (userConfig.xAxisName !== undefined || userConfig.xAxisShow !== undefined) {
            baseOptions.xAxis = baseOptions.xAxis || {};
            if (userConfig.xAxisName !== undefined) {
                baseOptions.xAxis.name = userConfig.xAxisName;
            }
            if (userConfig.xAxisShow !== undefined) {
                baseOptions.xAxis.show = userConfig.xAxisShow;
            }
        }
        
        // Y轴配置
        if (userConfig.yAxisName !== undefined || userConfig.yAxisShow !== undefined) {
            baseOptions.yAxis = baseOptions.yAxis || {};
            if (userConfig.yAxisName !== undefined) {
                baseOptions.yAxis.name = userConfig.yAxisName;
            }
            if (userConfig.yAxisShow !== undefined) {
                baseOptions.yAxis.show = userConfig.yAxisShow;
            }
        }
        
        // 数据缩放配置
        if (userConfig.enableDataZoom !== undefined) {
            if (userConfig.enableDataZoom) {
                baseOptions.dataZoom = this.buildDataZoomConfig(userConfig.dataZoomType || 'slider');
            } else {
                baseOptions.dataZoom = [];
            }
        }
    }
    
    /**
     * 合并其他配置
     */
    mergeOtherOptions(baseOptions, userConfig) {
        // 动画配置
        if (userConfig.animation !== undefined) {
            baseOptions.animation = userConfig.animation;
            if (userConfig.animationDuration !== undefined) {
                baseOptions.animationDuration = userConfig.animationDuration;
            }
        }
        
        // 网格配置
        if (userConfig.gridLeft || userConfig.gridRight || userConfig.gridTop || userConfig.gridBottom) {
            baseOptions.grid = baseOptions.grid || {};
            if (userConfig.gridLeft !== undefined) baseOptions.grid.left = userConfig.gridLeft;
            if (userConfig.gridRight !== undefined) baseOptions.grid.right = userConfig.gridRight;
            if (userConfig.gridTop !== undefined) baseOptions.grid.top = userConfig.gridTop;
            if (userConfig.gridBottom !== undefined) baseOptions.grid.bottom = userConfig.gridBottom;
        }
    }
    
    /**
     * 构建工具箱功能
     */
    buildToolboxFeatures(features) {
        const toolboxFeatures = {};
        
        features.forEach(feature => {
            switch (feature) {
                case 'saveAsImage':
                    toolboxFeatures.saveAsImage = { show: true };
                    break;
                case 'dataView':
                    toolboxFeatures.dataView = { show: true, readOnly: false };
                    break;
                case 'magicType':
                    toolboxFeatures.magicType = { show: true, type: ['line', 'bar'] };
                    break;
                case 'restore':
                    toolboxFeatures.restore = { show: true };
                    break;
                case 'dataZoom':
                    toolboxFeatures.dataZoom = { show: true };
                    break;
            }
        });
        
        return toolboxFeatures;
    }
    
    /**
     * 构建数据缩放配置
     */
    buildDataZoomConfig(type) {
        const configs = [];
        
        if (type === 'slider' || type === 'both') {
            configs.push({
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100
            });
        }
        
        if (type === 'inside' || type === 'both') {
            configs.push({
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100
            });
        }
        
        return configs;
    }
    
    /**
     * 文本组件渲染方法
     */
    renderTextComponent(container, options = {}) {
        container.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: ${options.textAlign || 'left'};
            width: 100%;
            height: 100%;
            padding: ${options.padding || 12}px;
            box-sizing: border-box;
            font-size: ${options.fontSize || 16}px;
            color: ${options.color || '#333333'};
            font-weight: ${options.fontWeight || 'normal'};
            background-color: ${options.backgroundColor || 'transparent'};
            word-wrap: break-word;
            overflow: hidden;
        `;
        
        container.textContent = options.text || '文本内容';
        return { type: 'text', element: container };
    }
    
    /**
     * 图片组件渲染方法
     */
    renderImageComponent(container, options = {}) {
        const img = document.createElement('img');
        img.src = options.src || 'https://via.placeholder.com/300x200';
        img.alt = options.alt || '图片';
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: ${options.objectFit || 'cover'};
        `;
        
        container.innerHTML = '';
        container.appendChild(img);
        return { type: 'image', element: img };
    }
    
    /**
     * 时间控件渲染方法
     */
    renderDateTimeComponent(container, options = {}) {
        const now = new Date();
        const formatTime = (date) => {
            const format = options.format || 'YYYY-MM-DD HH:mm:ss';
            return format
                .replace('YYYY', date.getFullYear())
                .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
                .replace('DD', String(date.getDate()).padStart(2, '0'))
                .replace('HH', String(date.getHours()).padStart(2, '0'))
                .replace('mm', String(date.getMinutes()).padStart(2, '0'))
                .replace('ss', String(date.getSeconds()).padStart(2, '0'));
        };
        
        container.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            font-size: 16px;
            color: #333;
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
        `;
        
        const updateTime = () => {
            container.textContent = formatTime(new Date());
        };
        
        updateTime();
        const timer = setInterval(updateTime, 1000);
        
        return { type: 'datetime', timer: timer };
    }
    
    /**
     * 默认数据更新方法
     */
    defaultUpdateData(componentInstance, data) {
        if (componentInstance && typeof componentInstance.setOption === 'function') {
            componentInstance.setOption(data, true);
        }
    }
    
    /**
     * 地图组件渲染方法
     */
    renderMapComponent(container, options = {}) {
        if (typeof echarts === 'undefined') {
            container.innerHTML = '<div style="color: red; padding: 20px;">ECharts 未加载</div>';
            return null;
        }
        
        try {
            // 清空容器
            container.innerHTML = '';
            
            // 设置容器背景为透明
            container.style.backgroundColor = 'transparent';
            
            // 初始化ECharts实例
            const chart = echarts.init(container, null, {
                renderer: 'canvas',
                useDirtyRect: false,
                backgroundColor: 'transparent'
            });
            
            // 对于地图组件，需要先注册地图数据
            if (options.series && options.series[0] && options.series[0].map) {
                const mapName = options.series[0].map;
                
                // 如果是中国地图，尝试加载中国地图数据
                if (mapName === 'china') {
                    this.loadChinaMap().then(() => {
                        chart.setOption(options, true);
                    }).catch(() => {
                        // 如果加载失败，使用默认配置
                        console.warn('中国地图数据加载失败，使用默认配置');
                        chart.setOption(options, true);
                    });
                } else if (mapName === 'world') {
                    this.loadWorldMap().then(() => {
                        chart.setOption(options, true);
                    }).catch(() => {
                        // 如果加载失败，使用默认配置
                        console.warn('世界地图数据加载失败，使用默认配置');
                        chart.setOption(options, true);
                    });
                } else {
                    // 其他地图直接设置
                    chart.setOption(options, true);
                }
            } else {
                // 设置图表选项
                chart.setOption(options, true);
            }
            
            // 添加resize监听
            const resizeObserver = new ResizeObserver(() => {
                if (chart && !chart.isDisposed()) {
                    chart.resize();
                }
            });
            resizeObserver.observe(container);
            
            return chart;
        } catch (error) {
            console.error('地图渲染失败:', error);
            container.innerHTML = `<div style="color: red; padding: 20px;">地图渲染失败: ${error.message}</div>`;
            return null;
        }
    }
    
    /**
     * 3D组件渲染方法
     */
    render3DComponent(container, options = {}) {
        if (typeof echarts === 'undefined') {
            container.innerHTML = '<div style="color: red; padding: 20px;">ECharts 未加载</div>';
            return null;
        }
        
        // 检查ECharts GL是否加载
        if (typeof window.echarts.graphic === 'undefined' || !window.echarts.graphic.extendShape) {
            container.innerHTML = '<div style="color: red; padding: 20px;">ECharts GL 未加载，无法渲染3D图表</div>';
            return null;
        }
        
        try {
            // 清空容器
            container.innerHTML = '';
            
            // 设置容器背景为透明
            container.style.backgroundColor = 'transparent';
            
            // 初始化ECharts实例，3D图表需要特殊配置
            const chart = echarts.init(container, null, {
                renderer: 'canvas',
                useDirtyRect: false,
                devicePixelRatio: 1,
                backgroundColor: 'transparent'
            });
            
            // 设置图表选项
            chart.setOption(options, true);
            
            // 添加resize监听
            const resizeObserver = new ResizeObserver(() => {
                if (chart && !chart.isDisposed()) {
                    setTimeout(() => {
                        chart.resize();
                    }, 100);
                }
            });
            resizeObserver.observe(container);
            
            return chart;
        } catch (error) {
            console.error('3D图表渲染失败:', error);
            container.innerHTML = `<div style="color: red; padding: 20px;">3D图表渲染失败: ${error.message}</div>`;
            return null;
        }
    }
    
    /**
     * 注册额外的图表类型
     */
    registerAdditionalCharts() {
        // 漏斗图
        this.registerComponent({
            id: 'funnel_basic',
            name: '基础漏斗图',
            icon: '🔽',
            category: '漏斗图',
            type: 'funnel',
            defaultProps: {
                title: { text: '基础漏斗图', left: 'center' },
                tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
                legend: { data: ['展现', '点击', '访问', '咨询', '订单'] },
                series: [{
                    name: '漏斗图',
                    type: 'funnel',
                    left: '10%',
                    top: 60,
                    bottom: 60,
                    width: '80%',
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: { show: true, position: 'inside' },
                    labelLine: { length: 10, lineStyle: { width: 1, type: 'solid' } },
                    itemStyle: { borderColor: '#fff', borderWidth: 1 },
                    emphasis: { label: { fontSize: 20 } },
                    data: [
                        { value: 100, name: '展现' },
                        { value: 80, name: '点击' },
                        { value: 60, name: '访问' },
                        { value: 40, name: '咨询' },
                        { value: 20, name: '订单' }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 水球图（liquidfill）
        this.registerComponent({
            id: 'liquidfill_basic',
            name: '水球图',
            icon: '💧',
            category: '特殊图表',
            type: 'liquidFill',
            defaultProps: {
                title: { text: '水球图', left: 'center' },
                series: [{
                    type: 'liquidFill',
                    data: [0.6],
                    color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
                    center: ['50%', '50%'],
                    radius: '50%',
                    amplitude: '8%',
                    waveLength: '80%',
                    backgroundStyle: { borderWidth: 1, borderColor: '#294D99', color: 'transparent' },
                    label: {
                        normal: {
                            formatter: '60%',
                            textStyle: { fontSize: 50, color: '#294D99' }
                        }
                    }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 词云图
        this.registerComponent({
            id: 'wordcloud_basic',
            name: '词云图',
            icon: '☁️',
            category: '特殊图表',
            type: 'wordCloud',
            defaultProps: {
                title: { text: '词云图', left: 'center' },
                series: [{
                    type: 'wordCloud',
                    gridSize: 2,
                    sizeRange: [12, 50],
                    rotationRange: [-90, 90],
                    shape: 'pentagon',
                    width: '100%',
                    height: '100%',
                    drawOutOfBound: true,
                    textStyle: {
                        normal: {
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: { shadowBlur: 10, shadowColor: '#333' }
                    },
                    data: [
                        { name: 'ECharts', value: 10000 },
                        { name: 'JavaScript', value: 8000 },
                        { name: 'Vue', value: 6000 },
                        { name: 'React', value: 5000 },
                        { name: 'Angular', value: 4000 },
                        { name: 'Node.js', value: 3500 },
                        { name: 'Python', value: 3000 },
                        { name: 'Java', value: 2800 }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 旭日图
        this.registerComponent({
            id: 'sunburst_basic',
            name: '旭日图',
            icon: '☀️',
            category: '特殊图表',
            type: 'sunburst',
            defaultProps: {
                title: { text: '旭日图', left: 'center' },
                series: [{
                    type: 'sunburst',
                    data: [{
                        name: 'Grandpa',
                        children: [{
                            name: 'Uncle Leo',
                            value: 15,
                            children: [{
                                name: 'Cousin Jack',
                                value: 2
                            }, {
                                name: 'Cousin Mary',
                                value: 5,
                                children: [{
                                    name: 'Jackson',
                                    value: 2
                                }]
                            }, {
                                name: 'Cousin Ben',
                                value: 4
                            }]
                        }, {
                            name: 'Father',
                            value: 10,
                            children: [{
                                name: 'Me',
                                value: 5
                            }, {
                                name: 'Brother Peter',
                                value: 1
                            }]
                        }]
                    }, {
                        name: 'Nancy',
                        children: [{
                            name: 'Uncle Nike',
                            children: [{
                                name: 'Cousin Betty',
                                value: 1
                            }, {
                                name: 'Cousin Jenny',
                                value: 2
                            }]
                        }]
                    }],
                    radius: [0, '90%'],
                    label: { rotate: 'radial' }
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        // 象形柱图
        this.registerComponent({
            id: 'pictorialbar_basic',
            name: '象形柱图',
            icon: '🏛️',
            category: '特殊图表',
            type: 'pictorialBar',
            defaultProps: {
                title: { text: '象形柱图', left: 'center' },
                tooltip: {},
                xAxis: {
                    data: ['A', 'B', 'C', 'D', 'E'],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: { textStyle: { color: '#e54035' } }
                },
                yAxis: {
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: { show: false }
                },
                series: [{
                    name: '数据',
                    type: 'pictorialBar',
                    barCategoryGap: '-130%',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    data: [
                        { value: 123, symbolSize: [50, 60] },
                        { value: 60, symbolSize: [50, 30] },
                        { value: 25, symbolSize: [50, 15] },
                        { value: 18, symbolSize: [50, 10] },
                        { value: 12, symbolSize: [50, 8] }
                    ]
                }]
            },
            render: this.renderEChartsComponent.bind(this),
            getProperties: this.getEChartsProperties
        });
        
        console.log('📊 额外图表类型注册完成');
    }
    
    /**
     * 加载中国地图数据
     */
    async loadChinaMap() {
        try {
            // 尝试加载中国地图JSON数据
            const response = await fetch('/static/js/maps/china.json');
            if (response.ok) {
                const chinaJson = await response.json();
                echarts.registerMap('china', chinaJson);
                console.log('✅ 中国地图数据加载成功');
            } else {
                throw new Error('中国地图数据文件不存在');
            }
        } catch (error) {
            console.warn('⚠️ 中国地图数据加载失败:', error.message);
            // 使用简化的中国地图数据
            echarts.registerMap('china', {
                type: 'FeatureCollection',
                features: []
            });
        }
    }
    
    /**
     * 加载世界地图数据
     */
    async loadWorldMap() {
        try {
            // 尝试加载世界地图JSON数据
            const response = await fetch('/static/js/maps/world.json');
            if (response.ok) {
                const worldJson = await response.json();
                echarts.registerMap('world', worldJson);
                console.log('✅ 世界地图数据加载成功');
            } else {
                throw new Error('世界地图数据文件不存在');
            }
        } catch (error) {
            console.warn('⚠️ 世界地图数据加载失败:', error.message);
            // 使用简化的世界地图数据
            echarts.registerMap('world', {
                type: 'FeatureCollection',
                features: []
            });
        }
    }

    /**
     * 默认销毁方法
     */
    defaultDispose(componentInstance) {
        if (componentInstance) {
            if (typeof componentInstance.dispose === 'function') {
                componentInstance.dispose();
            }
            if (componentInstance.timer) {
                clearInterval(componentInstance.timer);
            }
        }
    }
    
    /**
     * 更新组件的getProperties方法
     */
    updateComponentProperties() {
        // 为折线图组件设置特定的属性方法
        const lineComponents = ['line_basic', 'line_area', 'line_smooth', 'line_stack', 'line_step', 'line_dual_axis'];
        lineComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getLineChartProperties.bind(this);
            }
        });
        
        // 为柱状图组件设置特定的属性方法
        const barComponents = ['bar_basic', 'bar_stack', 'bar_horizontal', 'bar_waterfall', 'bar_grouped', 'bar_positive_negative'];
        barComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getBarChartProperties.bind(this);
            }
        });
        
        // 为饼图组件设置特定的属性方法
        const pieComponents = ['pie_basic', 'pie_doughnut', 'pie_rose', 'pie_nested', 'pie_nightingale', 'pie_semi_circle'];
        pieComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getPieChartProperties.bind(this);
            }
        });
        
        // 为散点图组件设置特定的属性方法
        const scatterComponents = ['scatter_basic', 'scatter_bubble'];
        scatterComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getScatterChartProperties.bind(this);
            }
        });
        
        // 为雷达图组件设置特定的属性方法
        const radarComponents = ['radar_basic'];
        radarComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getRadarChartProperties.bind(this);
            }
        });
        
        // 为仪表盘组件设置特定的属性方法
        const gaugeComponents = ['gauge_basic'];
        gaugeComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getGaugeChartProperties.bind(this);
            }
        });
        
        // 为热力图组件设置特定的属性方法
        const heatmapComponents = ['heatmap_basic', 'heatmap_calendar'];
        heatmapComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getHeatmapChartProperties.bind(this);
            }
        });
        
        // 为特殊图表设置通用配置方法
        const specialComponents = ['funnel_basic', 'liquidfill_basic', 'wordcloud_basic', 'sunburst_basic', 'pictorialbar_basic'];
        specialComponents.forEach(id => {
            const component = this.components.get(id);
            if (component) {
                component.getProperties = this.getSpecialChartProperties.bind(this);
            }
        });
    }

    /**
     * 触发注册事件
     */
    triggerRegistrationEvent(component) {
        const event = new CustomEvent('componentRegistered', {
            detail: component
        });
        document.dispatchEvent(event);
    }
}

// 创建全局组件注册中心实例
window.ComponentRegistry = new ComponentRegistry();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentRegistry;
}
