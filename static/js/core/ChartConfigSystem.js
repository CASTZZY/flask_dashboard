/**
 * 图表配置系统 - 重新设计的清晰架构
 * 每个图表类型都有自己的专属配置项和处理逻辑
 */

class ChartConfigSystem {
    constructor() {
        this.configDefinitions = new Map();
        this.configProcessors = new Map();
        this.initializeChartConfigs();
    }

    /**
     * 初始化所有图表类型的配置定义
     */
    initializeChartConfigs() {
        // 折线图配置
        this.registerChartConfig('line', {
            name: '折线图',
            categories: {
                basic: '基础配置',
                line: '线条设置', 
                point: '数据点设置',
                area: '面积设置',
                axis: '坐标轴',
                interaction: '交互功能'
            },
            properties: this.getLineChartProperties(),
            processor: this.processLineChartConfig.bind(this)
        });

        // 柱状图配置
        this.registerChartConfig('bar', {
            name: '柱状图',
            categories: {
                basic: '基础配置',
                bar: '柱子设置',
                axis: '坐标轴', 
                interaction: '交互功能'
            },
            properties: this.getBarChartProperties(),
            processor: this.processBarChartConfig.bind(this)
        });

        // 饼图配置
        this.registerChartConfig('pie', {
            name: '饼图',
            categories: {
                basic: '基础配置',
                pie: '饼图设置',
                label: '标签设置',
                interaction: '交互功能'
            },
            properties: this.getPieChartProperties(),
            processor: this.processPieChartConfig.bind(this)
        });

        // 散点图配置
        this.registerChartConfig('scatter', {
            name: '散点图',
            categories: {
                basic: '基础配置',
                scatter: '散点设置',
                axis: '坐标轴',
                interaction: '交互功能'
            },
            properties: this.getScatterChartProperties(),
            processor: this.processScatterChartConfig.bind(this)
        });
    }

    /**
     * 注册图表配置
     */
    registerChartConfig(chartType, config) {
        this.configDefinitions.set(chartType, config);
        this.configProcessors.set(chartType, config.processor);
    }

    /**
     * 获取图表类型的配置定义
     */
    getChartConfig(chartType) {
        return this.configDefinitions.get(chartType);
    }

    /**
     * 根据图表类型生成属性面板配置
     */
    generatePropertiesForChart(chartType, currentConfig = {}) {
        const config = this.getChartConfig(chartType);
        if (!config) {
            console.warn(`未找到图表类型 ${chartType} 的配置定义`);
            return [];
        }

        return config.properties.map(prop => ({
            ...prop,
            value: this.getPropertyValue(prop, currentConfig)
        }));
    }

    /**
     * 获取属性值
     */
    getPropertyValue(prop, currentConfig) {
        if (prop.path) {
            // 支持嵌套路径，如 'series.0.smooth'
            return this.getNestedValue(currentConfig, prop.path) ?? prop.defaultValue;
        }
        return currentConfig[prop.id] ?? prop.defaultValue;
    }

    /**
     * 获取嵌套值
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            if (current && typeof current === 'object') {
                return current[key];
            }
            return undefined;
        }, obj);
    }

    /**
     * 处理图表配置
     */
    processChartConfig(chartType, baseConfig, userConfig) {
        const processor = this.configProcessors.get(chartType);
        if (!processor) {
            console.warn(`未找到图表类型 ${chartType} 的配置处理器`);
            return baseConfig;
        }

        console.log(`🔧 处理 ${chartType} 图表配置`);
        console.log('📊 基础配置:', baseConfig);
        console.log('🎛️ 用户配置:', userConfig);

        const result = processor(baseConfig, userConfig);
        console.log('✅ 处理结果:', result);
        return result;
    }

    // ===========================================
    // 折线图配置定义和处理
    // ===========================================

    /**
     * 折线图属性定义
     */
    getLineChartProperties() {
        return [
            // 基础配置
            { id: 'showTitle', label: '显示标题', type: 'checkbox', defaultValue: true, category: 'basic' },
            { id: 'titleText', label: '标题文本', type: 'text', defaultValue: '折线图', category: 'basic', dependsOn: 'showTitle' },
            { id: 'showLegend', label: '显示图例', type: 'checkbox', defaultValue: true, category: 'basic' },
            { id: 'legendPosition', label: '图例位置', type: 'select', options: [
                { value: 'top', label: '上方' },
                { value: 'bottom', label: '下方' },
                { value: 'left', label: '左侧' },
                { value: 'right', label: '右侧' }
            ], defaultValue: 'bottom', category: 'basic', dependsOn: 'showLegend' },

            // 线条设置
            { id: 'smooth', label: '平滑曲线', type: 'checkbox', defaultValue: false, category: 'line', path: 'series.0.smooth' },
            { id: 'lineWidth', label: '线条宽度', type: 'number', min: 1, max: 10, defaultValue: 2, category: 'line', path: 'series.0.lineStyle.width' },
            { id: 'lineType', label: '线条类型', type: 'select', options: [
                { value: 'solid', label: '实线' },
                { value: 'dashed', label: '虚线' },
                { value: 'dotted', label: '点线' }
            ], defaultValue: 'solid', category: 'line', path: 'series.0.lineStyle.type' },
            { id: 'connectNulls', label: '连接空值', type: 'checkbox', defaultValue: false, category: 'line', path: 'series.0.connectNulls' },

            // 数据点设置
            { id: 'showSymbol', label: '显示数据点', type: 'checkbox', defaultValue: true, category: 'point', path: 'series.0.showSymbol' },
            { id: 'symbolSize', label: '数据点大小', type: 'number', min: 2, max: 20, defaultValue: 4, category: 'point', path: 'series.0.symbolSize', dependsOn: 'showSymbol' },
            { id: 'symbolType', label: '数据点类型', type: 'select', options: [
                { value: 'circle', label: '圆形' },
                { value: 'rect', label: '矩形' },
                { value: 'roundRect', label: '圆角矩形' },
                { value: 'triangle', label: '三角形' },
                { value: 'diamond', label: '菱形' }
            ], defaultValue: 'circle', category: 'point', path: 'series.0.symbol', dependsOn: 'showSymbol' },

            // 面积设置
            { id: 'showArea', label: '显示面积', type: 'checkbox', defaultValue: false, category: 'area' },
            { id: 'areaOpacity', label: '面积透明度', type: 'range', min: 0, max: 1, step: 0.1, defaultValue: 0.3, category: 'area', dependsOn: 'showArea' },

            // 坐标轴
            { id: 'xAxisName', label: 'X轴名称', type: 'text', defaultValue: '', category: 'axis' },
            { id: 'yAxisName', label: 'Y轴名称', type: 'text', defaultValue: '', category: 'axis' },
            { id: 'showXAxisLine', label: '显示X轴线', type: 'checkbox', defaultValue: true, category: 'axis' },
            { id: 'showYAxisLine', label: '显示Y轴线', type: 'checkbox', defaultValue: true, category: 'axis' },
            { id: 'xAxisLabelRotate', label: 'X轴标签旋转角度', type: 'number', min: -90, max: 90, defaultValue: 0, category: 'axis', path: 'xAxis.axisLabel.rotate' },
            { id: 'yAxisLabelRotate', label: 'Y轴标签旋转角度', type: 'number', min: -90, max: 90, defaultValue: 0, category: 'axis', path: 'yAxis.axisLabel.rotate' },

            // 交互功能
            { id: 'showToolbox', label: '显示工具箱', type: 'checkbox', defaultValue: true, category: 'interaction' },
            { id: 'toolboxFeatures', label: '工具箱功能', type: 'multiselect', options: [
                { value: 'saveAsImage', label: '保存图片' },
                { value: 'dataView', label: '数据视图' },
                { value: 'magicType', label: '图表切换' },
                { value: 'restore', label: '还原' }
            ], defaultValue: ['saveAsImage'], category: 'interaction', dependsOn: 'showToolbox' },
            { id: 'enableDataZoom', label: '启用数据缩放', type: 'checkbox', defaultValue: false, category: 'interaction' },
            { id: 'dataZoomType', label: '缩放类型', type: 'select', options: [
                { value: 'slider', label: '滑块' },
                { value: 'inside', label: '内置' },
                { value: 'both', label: '两者' }
            ], defaultValue: 'slider', category: 'interaction', dependsOn: 'enableDataZoom' }
        ];
    }

    /**
     * 折线图配置处理器
     */
    processLineChartConfig(baseConfig, userConfig) {
        const result = JSON.parse(JSON.stringify(baseConfig));

        // 处理标题
        if (userConfig.showTitle !== undefined) {
            if (userConfig.showTitle && userConfig.titleText) {
                result.title = result.title || {};
                result.title.text = userConfig.titleText;
                result.title.show = true;
            } else if (!userConfig.showTitle) {
                result.title = { show: false };
            }
        }

        // 处理图例 - 只在用户明确设置时才修改
        if (userConfig.showLegend !== undefined) {
            if (userConfig.showLegend) {
                result.legend = result.legend || {};
                result.legend.show = true;
                if (userConfig.legendPosition) {
                    if (userConfig.legendPosition === 'left' || userConfig.legendPosition === 'right') {
                        result.legend.orient = 'vertical';
                        result.legend.left = userConfig.legendPosition;
                        result.legend.top = 'middle';
                    } else {
                        result.legend.orient = 'horizontal';
                        result.legend.top = userConfig.legendPosition;
                        result.legend.left = 'center';
                    }
                }
            } else {
                result.legend = { show: false };
            }
        }
        // 如果用户没有设置图例相关配置，保持原有的图例配置不变

        // 处理系列配置
        if (result.series && result.series.length > 0) {
            result.series = result.series.map(series => {
                if (series.type === 'line') {
                    const newSeries = { ...series };

                    // 平滑曲线
                    if (userConfig.smooth !== undefined) {
                        newSeries.smooth = userConfig.smooth;
                    }

                    // 线条样式
                    if (userConfig.lineWidth !== undefined || userConfig.lineType !== undefined) {
                        newSeries.lineStyle = newSeries.lineStyle || {};
                        if (userConfig.lineWidth !== undefined) newSeries.lineStyle.width = userConfig.lineWidth;
                        if (userConfig.lineType !== undefined) newSeries.lineStyle.type = userConfig.lineType;
                    }

                    // 数据点
                    if (userConfig.showSymbol !== undefined) newSeries.showSymbol = userConfig.showSymbol;
                    if (userConfig.symbolSize !== undefined) newSeries.symbolSize = userConfig.symbolSize;
                    if (userConfig.symbolType !== undefined) newSeries.symbol = userConfig.symbolType;

                    // 连接空值
                    if (userConfig.connectNulls !== undefined) newSeries.connectNulls = userConfig.connectNulls;

                    // 面积
                    if (userConfig.showArea !== undefined) {
                        if (userConfig.showArea) {
                            newSeries.areaStyle = newSeries.areaStyle || {};
                            if (userConfig.areaOpacity !== undefined) {
                                newSeries.areaStyle.opacity = userConfig.areaOpacity;
                            }
                        } else {
                            newSeries.areaStyle = null;
                        }
                    }

                    return newSeries;
                }
                return series;
            });
        }

        // 处理坐标轴
        if (userConfig.xAxisName !== undefined) {
            result.xAxis = result.xAxis || {};
            result.xAxis.name = userConfig.xAxisName;
        }
        if (userConfig.yAxisName !== undefined) {
            result.yAxis = result.yAxis || {};
            result.yAxis.name = userConfig.yAxisName;
        }
        if (userConfig.showXAxisLine !== undefined) {
            result.xAxis = result.xAxis || {};
            result.xAxis.axisLine = result.xAxis.axisLine || {};
            result.xAxis.axisLine.show = userConfig.showXAxisLine;
        }
        if (userConfig.showYAxisLine !== undefined) {
            result.yAxis = result.yAxis || {};
            result.yAxis.axisLine = result.yAxis.axisLine || {};
            result.yAxis.axisLine.show = userConfig.showYAxisLine;
        }
        if (userConfig.xAxisLabelRotate !== undefined) {
            result.xAxis = result.xAxis || {};
            result.xAxis.axisLabel = result.xAxis.axisLabel || {};
            result.xAxis.axisLabel.rotate = userConfig.xAxisLabelRotate;
        }
        if (userConfig.yAxisLabelRotate !== undefined) {
            result.yAxis = result.yAxis || {};
            result.yAxis.axisLabel = result.yAxis.axisLabel || {};
            result.yAxis.axisLabel.rotate = userConfig.yAxisLabelRotate;
        }

        // 处理数据缩放
        if (userConfig.enableDataZoom !== undefined) {
            if (userConfig.enableDataZoom) {
                result.dataZoom = this.buildDataZoomConfig(userConfig.dataZoomType || 'slider');
            } else {
                result.dataZoom = [];
            }
        }

        // 处理工具箱
        console.log('🔧 处理折线图工具箱配置:', {
            showToolbox: userConfig.showToolbox,
            toolboxFeatures: userConfig.toolboxFeatures
        });
        
        if (userConfig.showToolbox !== undefined) {
            if (userConfig.showToolbox) {
                result.toolbox = {
                    show: true,
                    feature: this.buildToolboxFeatures(userConfig.toolboxFeatures || ['saveAsImage'])
                };
            } else {
                result.toolbox = { show: false };
            }
        } else {
            // 如果用户没有设置，使用默认值（显示工具箱）
            result.toolbox = {
                show: true,
                feature: this.buildToolboxFeatures(['saveAsImage'])
            };
        }
        
        console.log('🔧 最终折线图工具箱配置:', result.toolbox);

        return result;
    }

    // ===========================================
    // 柱状图配置定义和处理
    // ===========================================

    /**
     * 柱状图属性定义
     */
    getBarChartProperties() {
        return [
            // 基础配置
            { id: 'showTitle', label: '显示标题', type: 'checkbox', defaultValue: true, category: 'basic' },
            { id: 'titleText', label: '标题文本', type: 'text', defaultValue: '柱状图', category: 'basic', dependsOn: 'showTitle' },
            { id: 'showLegend', label: '显示图例', type: 'checkbox', defaultValue: true, category: 'basic' },
            { id: 'legendPosition', label: '图例位置', type: 'select', options: [
                { value: 'top', label: '上方' },
                { value: 'bottom', label: '下方' },
                { value: 'left', label: '左侧' },
                { value: 'right', label: '右侧' }
            ], defaultValue: 'bottom', category: 'basic', dependsOn: 'showLegend' },

            // 柱子设置
            { id: 'barWidth', label: '柱子宽度', type: 'text', defaultValue: 'auto', category: 'bar', path: 'series.0.barWidth' },
            { id: 'barMaxWidth', label: '最大宽度', type: 'number', min: 10, max: 200, defaultValue: 100, category: 'bar', path: 'series.0.barMaxWidth' },
            { id: 'showBarLabel', label: '显示数值标签', type: 'checkbox', defaultValue: false, category: 'bar' },
            { id: 'barLabelPosition', label: '标签位置', type: 'select', options: [
                { value: 'top', label: '顶部' },
                { value: 'inside', label: '内部' },
                { value: 'bottom', label: '底部' }
            ], defaultValue: 'top', category: 'bar', dependsOn: 'showBarLabel' },

            // 坐标轴
            { id: 'xAxisName', label: 'X轴名称', type: 'text', defaultValue: '', category: 'axis' },
            { id: 'yAxisName', label: 'Y轴名称', type: 'text', defaultValue: '', category: 'axis' },
            { id: 'xAxisLabelRotate', label: 'X轴标签旋转角度', type: 'number', min: -90, max: 90, defaultValue: 0, category: 'axis', path: 'xAxis.axisLabel.rotate' },
            { id: 'yAxisLabelRotate', label: 'Y轴标签旋转角度', type: 'number', min: -90, max: 90, defaultValue: 0, category: 'axis', path: 'yAxis.axisLabel.rotate' },

            // 交互功能
            { id: 'showToolbox', label: '显示工具箱', type: 'checkbox', defaultValue: true, category: 'interaction' },
            { id: 'toolboxFeatures', label: '工具箱功能', type: 'multiselect', options: [
                { value: 'saveAsImage', label: '保存图片' },
                { value: 'dataView', label: '数据视图' },
                { value: 'magicType', label: '图表切换' },
                { value: 'restore', label: '还原' }
            ], defaultValue: ['saveAsImage'], category: 'interaction', dependsOn: 'showToolbox' },
            { id: 'enableDataZoom', label: '启用数据缩放', type: 'checkbox', defaultValue: false, category: 'interaction' },
            { id: 'dataZoomType', label: '缩放类型', type: 'select', options: [
                { value: 'slider', label: '滑块' },
                { value: 'inside', label: '内置' },
                { value: 'both', label: '两者' }
            ], defaultValue: 'slider', category: 'interaction', dependsOn: 'enableDataZoom' }
        ];
    }

    /**
     * 柱状图配置处理器
     */
    processBarChartConfig(baseConfig, userConfig) {
        const result = JSON.parse(JSON.stringify(baseConfig));

        // 处理标题
        if (userConfig.showTitle !== undefined) {
            if (userConfig.showTitle && userConfig.titleText) {
                result.title = result.title || {};
                result.title.text = userConfig.titleText;
                result.title.show = true;
            } else if (!userConfig.showTitle) {
                result.title = { show: false };
            }
        }

        // 处理图例 - 只在用户明确设置时才修改
        if (userConfig.showLegend !== undefined) {
            if (userConfig.showLegend) {
                result.legend = result.legend || {};
                result.legend.show = true;
                if (userConfig.legendPosition) {
                    if (userConfig.legendPosition === 'left' || userConfig.legendPosition === 'right') {
                        result.legend.orient = 'vertical';
                        result.legend.left = userConfig.legendPosition;
                        result.legend.top = 'middle';
                    } else {
                        result.legend.orient = 'horizontal';
                        result.legend.top = userConfig.legendPosition;
                        result.legend.left = 'center';
                    }
                }
            } else {
                result.legend = { show: false };
            }
        }
        // 如果用户没有设置图例相关配置，保持原有的图例配置不变

        // 处理系列配置
        if (result.series && result.series.length > 0) {
            result.series = result.series.map(series => {
                if (series.type === 'bar') {
                    const newSeries = { ...series };

                    // 柱子宽度
                    if (userConfig.barWidth !== undefined) newSeries.barWidth = userConfig.barWidth;
                    if (userConfig.barMaxWidth !== undefined) newSeries.barMaxWidth = userConfig.barMaxWidth;

                    // 标签
                    if (userConfig.showBarLabel !== undefined) {
                        if (userConfig.showBarLabel) {
                            newSeries.label = {
                                show: true,
                                position: userConfig.barLabelPosition || 'top'
                            };
                        } else {
                            newSeries.label = { show: false };
                        }
                    }

                    return newSeries;
                }
                return series;
            });
        }

        // 处理工具箱
        console.log('🔧 处理柱状图工具箱配置:', {
            showToolbox: userConfig.showToolbox,
            toolboxFeatures: userConfig.toolboxFeatures
        });
        
        if (userConfig.showToolbox !== undefined) {
            if (userConfig.showToolbox) {
                result.toolbox = {
                    show: true,
                    feature: this.buildToolboxFeatures(userConfig.toolboxFeatures || ['saveAsImage'])
                };
            } else {
                result.toolbox = { show: false };
            }
        } else {
            // 如果用户没有设置，使用默认值（显示工具箱）
            result.toolbox = {
                show: true,
                feature: this.buildToolboxFeatures(['saveAsImage'])
            };
        }
        
        console.log('🔧 最终柱状图工具箱配置:', result.toolbox);

        // 处理坐标轴标签旋转角度
        if (userConfig.xAxisLabelRotate !== undefined) {
            result.xAxis = result.xAxis || {};
            result.xAxis.axisLabel = result.xAxis.axisLabel || {};
            result.xAxis.axisLabel.rotate = userConfig.xAxisLabelRotate;
        }
        if (userConfig.yAxisLabelRotate !== undefined) {
            result.yAxis = result.yAxis || {};
            result.yAxis.axisLabel = result.yAxis.axisLabel || {};
            result.yAxis.axisLabel.rotate = userConfig.yAxisLabelRotate;
        }

        // 处理数据缩放
        if (userConfig.enableDataZoom !== undefined) {
            if (userConfig.enableDataZoom) {
                result.dataZoom = this.buildDataZoomConfig(userConfig.dataZoomType || 'slider');
            } else {
                result.dataZoom = [];
            }
        }

        return result;
    }

    // ===========================================
    // 饼图配置定义和处理
    // ===========================================

    /**
     * 饼图属性定义
     */
    getPieChartProperties() {
        return [
            // 基础配置
            { id: 'showTitle', label: '显示标题', type: 'checkbox', defaultValue: true, category: 'basic' },
            { id: 'titleText', label: '标题文本', type: 'text', defaultValue: '饼图', category: 'basic', dependsOn: 'showTitle' },
            { id: 'showLegend', label: '显示图例', type: 'checkbox', defaultValue: true, category: 'basic' },

            // 饼图设置
            { id: 'radius', label: '饼图半径', type: 'text', defaultValue: '50%', category: 'pie', path: 'series.0.radius' },
            { id: 'innerRadius', label: '内半径', type: 'text', defaultValue: '0%', category: 'pie' },
            { id: 'startAngle', label: '起始角度', type: 'number', min: 0, max: 360, defaultValue: 90, category: 'pie', path: 'series.0.startAngle' },
            { id: 'roseType', label: '玫瑰图类型', type: 'select', options: [
                { value: '', label: '无' },
                { value: 'radius', label: '半径' },
                { value: 'area', label: '面积' }
            ], defaultValue: '', category: 'pie', path: 'series.0.roseType' },

            // 标签设置
            { id: 'showLabel', label: '显示标签', type: 'checkbox', defaultValue: true, category: 'label' },
            { id: 'labelPosition', label: '标签位置', type: 'select', options: [
                { value: 'outside', label: '外部' },
                { value: 'inside', label: '内部' },
                { value: 'center', label: '中心' }
            ], defaultValue: 'outside', category: 'label', dependsOn: 'showLabel' }
        ];
    }

    /**
     * 饼图配置处理器
     */
    processPieChartConfig(baseConfig, userConfig) {
        const result = JSON.parse(JSON.stringify(baseConfig));

        // 处理系列配置
        if (result.series && result.series.length > 0) {
            result.series = result.series.map(series => {
                if (series.type === 'pie') {
                    const newSeries = { ...series };

                    // 饼图设置
                    if (userConfig.radius !== undefined) newSeries.radius = userConfig.radius;
                    if (userConfig.innerRadius !== undefined && userConfig.innerRadius !== '0%') {
                        newSeries.radius = [userConfig.innerRadius, userConfig.radius || '50%'];
                    }
                    if (userConfig.startAngle !== undefined) newSeries.startAngle = userConfig.startAngle;
                    if (userConfig.roseType !== undefined) newSeries.roseType = userConfig.roseType || null;

                    // 标签
                    if (userConfig.showLabel !== undefined) {
                        newSeries.label = newSeries.label || {};
                        newSeries.label.show = userConfig.showLabel;
                        if (userConfig.showLabel && userConfig.labelPosition) {
                            newSeries.label.position = userConfig.labelPosition;
                        }
                    }

                    return newSeries;
                }
                return series;
            });
        }

        return result;
    }

    // ===========================================
    // 散点图配置定义和处理
    // ===========================================

    /**
     * 散点图属性定义
     */
    getScatterChartProperties() {
        return [
            // 基础配置
            { id: 'showTitle', label: '显示标题', type: 'checkbox', defaultValue: true, category: 'basic' },
            { id: 'titleText', label: '标题文本', type: 'text', defaultValue: '散点图', category: 'basic', dependsOn: 'showTitle' },

            // 散点设置
            { id: 'symbolSize', label: '散点大小', type: 'number', min: 2, max: 50, defaultValue: 10, category: 'scatter', path: 'series.0.symbolSize' },
            { id: 'symbolType', label: '散点类型', type: 'select', options: [
                { value: 'circle', label: '圆形' },
                { value: 'rect', label: '矩形' },
                { value: 'triangle', label: '三角形' },
                { value: 'diamond', label: '菱形' }
            ], defaultValue: 'circle', category: 'scatter', path: 'series.0.symbol' },

            // 坐标轴
            { id: 'xAxisName', label: 'X轴名称', type: 'text', defaultValue: '', category: 'axis' },
            { id: 'yAxisName', label: 'Y轴名称', type: 'text', defaultValue: '', category: 'axis' }
        ];
    }

    /**
     * 散点图配置处理器
     */
    processScatterChartConfig(baseConfig, userConfig) {
        const result = JSON.parse(JSON.stringify(baseConfig));

        // 处理系列配置
        if (result.series && result.series.length > 0) {
            result.series = result.series.map(series => {
                if (series.type === 'scatter') {
                    const newSeries = { ...series };

                    if (userConfig.symbolSize !== undefined) newSeries.symbolSize = userConfig.symbolSize;
                    if (userConfig.symbolType !== undefined) newSeries.symbol = userConfig.symbolType;

                    return newSeries;
                }
                return series;
            });
        }

        return result;
    }

    // ===========================================
    // 工具方法
    // ===========================================

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
     * 构建工具箱功能
     */
    buildToolboxFeatures(features) {
        const toolboxFeatures = {};
        
        features.forEach(feature => {
            switch (feature) {
                case 'saveAsImage':
                    toolboxFeatures.saveAsImage = { 
                        show: true,
                        title: '保存为图片',
                        type: 'png',
                        name: 'chart'
                    };
                    break;
                case 'dataView':
                    toolboxFeatures.dataView = { 
                        show: true, 
                        readOnly: false,
                        title: '数据视图'
                    };
                    break;
                case 'magicType':
                    toolboxFeatures.magicType = { 
                        show: true, 
                        type: ['line', 'bar'],
                        title: {
                            line: '切换为折线图',
                            bar: '切换为柱状图'
                        }
                    };
                    break;
                case 'restore':
                    toolboxFeatures.restore = { 
                        show: true,
                        title: '还原'
                    };
                    break;
            }
        });
        
        console.log('🔧 构建工具箱功能:', toolboxFeatures);
        return toolboxFeatures;
    }
}

// 导出配置系统实例
window.ChartConfigSystem = new ChartConfigSystem();

console.log('🎛️ 图表配置系统已初始化');

