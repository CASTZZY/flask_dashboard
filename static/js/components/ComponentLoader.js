// 组件动态加载器
class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.loadingPromises = new Map();
        this.componentMap = this.initComponentMap();
    }

    // 初始化组件映射表
    initComponentMap() {
        return {
            // 柱状图系列
            'bar_001': 'bar/基础柱状图/BasicBar.js',
            'bar_002': 'bar/堆叠柱状图/StackedBar.js',
            'bar_3d_001': 'bar/3D柱状图/Bar3D.js',
            'bar3d_improved_001': 'bar/3D柱状图/Bar3DImproved.js',
            'bar_h_001': 'bar/基础条形图/BasicBarH.js',
            'bar_stacked_h_001': 'bar/堆叠条形图/StackBarH.js',
            'positive_negative_bar_001': 'bar/正负条形图/PositiveNegativeBar.js',
            'line_bar_mixed_001': 'bar/折线柱状图混合/LineBarMixed.js',
            'bar3d_001': 'bar3d/基础3D柱状图/BasicBar3D.js',
            
            // 折线图系列
            'line_001': 'line/基础折线图/BasicLine.js',
            'line_002': 'line/基础面积图/BasicArea.js',
            'line_003': 'line/堆叠面积图/StackedArea.js',
            'line_004': 'line/平滑折线图/SmoothLine.js',
            'line_step_001': 'line/阶梯折线图/StepLine.js',
            'line_006': 'line/堆叠折线图/StackedLine.js',
            'rainfall_line_001': 'line/降雨量折线图/RainfallLine.js',
            'line_007': 'line/动态排序折线图/DynamicSortingLine.js',
            
            // 饼图系列
            'pie_001': 'pie/基础饼图/BasicPie.js',
            'pie_002': 'pie/环形图/DoughnutPie.js',
            'pie_003': 'pie/玫瑰图/RosePie.js',
            'pie_004': 'pie/嵌套饼图/NestedPie.js',
            'pie_005': 'pie/滚动图例饼图/ScrollLegendPie.js',
            'nightingale_rose_001': 'pie/南丁格尔玫瑰图/NightingaleRose.js',
            
            // 散点图系列
            'scatter_001': 'scatter/基础散点图/BasicScatter.js',
            'scatter_002': 'scatter/气泡图/BubbleScatter.js',
            'scatter_003': 'scatter/涟漪散点图/RippleScatter.js',
            'large_scale_scatter_001': 'scatter/大规模散点图/LargeScaleScatter.js',
            'scatter_matrix_001': 'scatter/散点图矩阵/ScatterMatrix.js',
            'scatter_3d_001': 'scatter/3D散点图/Scatter3D.js',
            'scatter3d_improved_001': 'scatter/3D散点图/Scatter3DImproved.js',
            
            // 雷达图系列
            'basic_radar_001': 'radar/基础雷达图/BasicRadar.js',
            'filled_radar_001': 'radar/填充雷达图/FilledRadar.js',
            'radar_003': 'radar/AQI雷达图/AQIRadar.js',
            'radar_004': 'radar/渐变雷达图/GradientRadar.js',
            'multiple_radar_001': 'radar/多雷达图/MultipleRadar.js',
            
            // 热力图系列
            'heatmap_001': 'heatmap/基础热力图/BasicHeatmap.js',
            'calendar_heatmap_001': 'heatmap/日历热力图/CalendarHeatmap.js',
            'rectangular_heatmap_001': 'heatmap/矩形热力图/RectangularHeatmap.js',
            
            // 仪表盘系列
            'gauge_001': 'gauge/基础仪表盘/BasicGauge.js',
            'scale_gauge_001': 'gauge/刻度仪表盘/ScaleGauge.js',
            'multiple_gauge_001': 'gauge/多仪表盘/MultipleGauge.js',
            
            // 漏斗图系列
            'funnel_001': 'funnel/基础漏斗图/BasicFunnel.js',
            'pyramid_001': 'funnel/金字塔图/Pyramid.js',
            
            // K线图系列
            'candlestick_001': 'candlestick/基础K线图/BasicCandlestick.js',
            'ma_candlestick_001': 'candlestick/MA K线图/MACandlestick.js',
            'boll_candlestick_001': 'candlestick/BOLL K线图/BOLLCandlestick.js',
            
            // 关系图系列
            'graph_001': 'graph/基础关系图/BasicGraph.js',
            'graph_002': 'graph/力导向图/ForceGraph.js',
            'graph_003': 'graph/NPM依赖关系图/NPMGraph.js',
            'orthogonal_graph_001': 'graph/正交关系图/OrthogonalGraph.js',
            
            // 盒须图系列
            'boxplot_001': 'boxplot/基础盒须图/BasicBoxplot.js',
            'multiple_boxplot_001': 'boxplot/多系列盒须图/MultipleBoxplot.js',
            'boxplot_003': 'boxplot/垂直方向盒须图/VerticalBoxplot.js',
            
            // 树图系列
            'tree_001': 'tree/基础树图/BasicTree.js',
            'orthogonal_tree_001': 'tree/正交树图/OrthogonalTree.js',
            'tree_004': 'tree/径向树图/RadialTree.js',
            'tree_003': 'tree/折线树图/LineTree.js',
            
            // 矩形树图系列
            'treemap_001': 'treemap/基础矩形树图/BasicTreemap.js',
            'rectangular_treemap_001': 'treemap/矩形式树状图/RectangularTreemap.js',
            
            // 旭日图系列
            'sunburst_001': 'sunburst/基础旭日图/Sunburst.js',
            
            // 地图系列
            'map_001': 'map/基础地图/BasicMap.js',
            'map_002': 'map/中国地图/ChinaMap.js',
            'map_003': 'map/世界地图/WorldMap.js',
            'world_map_improved_001': 'map/世界地图/WorldMapImproved.js',
            'china_map_enhanced_001': 'map/中国地图/ChinaMapEnhanced.js',
            'custom_map_001': 'map/自定义地图/CustomMap.js',
            'geo_coordinate_map_001': 'map/地理坐标图/GeoCoordinateMap.js',
            'province_map_001': 'map/省份地图/ProvinceMap.js',
            
            // 平行坐标系图系列
            'parallel_001': 'parallel/基础平行坐标系图/BasicParallel.js',
            'multiple_parallel_001': 'parallel/多系列平行坐标系图/MultipleParallel.js',
            
            // 桑基图系列
            'sankey_001': 'sankey/基础桑基图/BasicSankey.js',
            'energy_sankey_001': 'sankey/能量桑基图/EnergySankey.js',
            
            // 主题河流图系列
            'themeRiver_001': 'themeRiver/基础主题河流图/BasicThemeRiver.js',
            'multiple_theme_river_001': 'themeRiver/多系列主题河流图/MultipleThemeRiver.js',
            
            // 3D图表系列
            'surface_001': 'surface/3D曲面图/Surface3D.js',
            'surface3d_improved_001': 'surface/3D曲面图/Surface3DImproved.js',
            'surface3d_001': 'surface3d/基础3D曲面图/BasicSurface3D.js',
            'parametric_surface3d_001': 'surface3d/参数化3D曲面图/ParametricSurface3D.js',
            'line3d_001': 'line3d/基础3D折线图/BasicLine3D.js',
            'parametric_line3d_001': 'line3d/参数3D折线图/ParametricLine3D.js',
            'scatter3d_001': 'scatter3d/基础3D散点图/BasicScatter3D.js',
            'colorful_scatter3d_001': 'scatter3d/彩色3D散点图/ColorfulScatter3D.js',
            'globe3d_001': 'globe3d/3D地球/Globe3D.js',
            'basic_globe3d_001': 'globe3d/基础3D地球/BasicGlobe3D.js',
            
            // 象形柱状图系列
            'pictorialBar_001': 'pictorialBar/基础pictorialBar图/BasicPictorialBar.js',
            'decorative_pictorial_bar_001': 'pictorialBar/装饰pictorialBar图/DecorativePictorialBar.js',
            
            // 自定义图表系列
            'custom_001': 'custom/基础自定义图/BasicCustom.js',
            'gantt_chart_001': 'custom/甘特图/GanttChart.js',
            'word_cloud_001': 'custom/词云图/WordCloud.js',
            'contour_chart_001': 'custom/轮廓图/ContourChart.js',
            
            // 基础组件系列
            'text_001': 'text/基础文本框/BasicText.js',
            'text_002': 'text/增强文本框/EnhancedText.js',
            'textbox_001': 'basic/文本框/TextBox.js',
            'button_001': 'button/基础按钮/BaseButton.js',
            'button_002': 'button/切换按钮/ToggleButton.js',
            'btn_001': 'basic/按钮/PageRedirectButton.js',
            'input_001': 'input/基础输入框/BaseInput.js',
            'image_001': 'basic/图片/ImageComponent.js',
            'time_control_001': 'basic/时间控件/TimeControl.js',
            
            // 布局组件系列
            'canvas_001': 'layout/画布/CanvasComponent.js',
            'card_container_001': 'layout/卡片容器/CardContainer.js',
            'grid_layout_001': 'layout/网格布局/GridLayout.js'
        };
    }

    // 动态加载组件
    async loadComponent(componentId) {
        // 如果已经加载过，直接返回
        if (this.loadedComponents.has(componentId)) {
            return window.ComponentRegistry.get(componentId);
        }

        // 如果正在加载中，返回加载Promise
        if (this.loadingPromises.has(componentId)) {
            return this.loadingPromises.get(componentId);
        }

        // 获取组件文件路径
        const componentPath = this.componentMap[componentId];
        if (!componentPath) {
            console.warn(`未找到组件 ${componentId} 的文件路径`);
            return null;
        }

        // 创建加载Promise
        const loadingPromise = this.loadComponentScript(componentId, componentPath);
        this.loadingPromises.set(componentId, loadingPromise);

        try {
            const component = await loadingPromise;
            this.loadedComponents.add(componentId);
            this.loadingPromises.delete(componentId);
            return component;
        } catch (error) {
            this.loadingPromises.delete(componentId);
            throw error;
        }
    }

    // 加载组件脚本文件
    loadComponentScript(componentId, componentPath) {
        return new Promise((resolve, reject) => {
            // 使用fetch加载脚本内容
            fetch(`/static/js/components/${componentPath}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(scriptContent => {
                    try {
                        // 处理ES6模块语法，将export转换为全局变量注册
                        let processedContent = scriptContent;
                        
                        // 移除已有的ComponentRegistry.register调用（更安全的方式）
                        processedContent = processedContent.replace(
                            /^\s*ComponentRegistry\.register\([^)]+\);?\s*$/gm,
                            '// ComponentRegistry.register removed'
                        );
                        
                        // 替换export default语句（更安全的方式）
                        processedContent = processedContent.replace(
                            /^\s*export\s+default\s+(\w+);?\s*$/gm,
                            'window.$1 = $1; if(typeof window.ComponentRegistry !== "undefined" && $1 && $1.id) { window.ComponentRegistry.register($1); }'
                        );
                        
                        // 创建script标签并执行处理后的代码
                        const script = document.createElement('script');
                        script.textContent = processedContent;
                        
                        // 确保组件有正确的ID
                        if (!componentId) {
                            console.error('组件ID为空');
                            reject(new Error('组件ID为空'));
                            return;
                        }
                        
                        // 监听组件注册事件
                        const handleRegistry = (event) => {
                            if (event.detail.componentId === componentId) {
                                document.removeEventListener('componentRegistered', handleRegistry);
                                const component = window.ComponentRegistry ? window.ComponentRegistry.get(componentId) : null;
                                if (component) {
                                    console.log(`组件 ${componentId} 加载并注册成功`);
                                    resolve(component);
                                } else {
                                    console.warn(`组件 ${componentId} 注册失败`);
                                    resolve(null);
                                }
                            }
                        };
                        
                        document.addEventListener('componentRegistered', handleRegistry);
                        
                        // 设置超时机制
                        setTimeout(() => {
                            document.removeEventListener('componentRegistered', handleRegistry);
                            const component = window.ComponentRegistry ? window.ComponentRegistry.get(componentId) : null;
                            if (component) {
                                console.log(`组件 ${componentId} 加载成功（超时回调）`);
                                resolve(component);
                            } else {
                                console.warn(`组件 ${componentId} 加载超时`);
                                resolve(null);
                            }
                        }, 5000);
                        
                        // 执行脚本
                        document.head.appendChild(script);
                    } catch (error) {
                        console.error(`组件 ${componentId} 脚本执行失败:`, error);
                        reject(error);
                    }
                })
                .catch(error => {
                    console.error(`加载组件 ${componentId} 失败: ${componentPath} - ${error.message}`);
                    reject(new Error(`Failed to load component: ${componentId}`));
                });
        });
    }

    // 批量预加载常用组件
    async preloadCommonComponents() {
        const commonComponents = [
            'bar_001', 'line_001', 'pie_001', 'scatter_001',
            'radar_001', 'heatmap_001', 'gauge_001'
        ];

        const loadPromises = commonComponents.map(componentId => 
            this.loadComponent(componentId).catch(error => {
                console.warn(`预加载组件 ${componentId} 失败:`, error);
                return null;
            })
        );

        await Promise.all(loadPromises);
        console.log('常用组件预加载完成');
    }

    // 获取已加载的组件列表
    getLoadedComponents() {
        return Array.from(this.loadedComponents);
    }

    // 检查组件是否已加载
    isComponentLoaded(componentId) {
        return this.loadedComponents.has(componentId);
    }
    
    // 获取组件配置模式
    getComponentConfigSchema(componentId) {
        const component = window.ComponentRegistry ? window.ComponentRegistry.get(componentId) : null;
        return component ? component.configSchema : null;
    }
}

// 创建全局实例
const componentLoader = new ComponentLoader();

// 确保在浏览器环境中将组件加载器添加到全局对象中
if (typeof window !== 'undefined') {
    window.ComponentLoader = componentLoader;
}

// 页面加载完成后预加载常用组件
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        componentLoader.preloadCommonComponents();
    });
}

// 自定义事件：组件注册完成
if (typeof window !== 'undefined' && !window.CustomEvent) {
    window.CustomEvent = function(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };
}