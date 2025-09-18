// 组件索引文件 - ES5版本
// 此文件不再使用import/export，而是通过script标签依次加载各个组件文件

// 注意：需要在HTML中按以下顺序加载组件文件：
// 1. 首先加载基础组件
// <script src="static/js/components/ComponentRegistry.js"></script>
// <script src="static/js/components/BaseChart.js"></script>
// <script src="static/js/components/config.js"></script>

// 2. 然后加载各类图表组件（按需加载）
// 柱状图组件
// <script src="static/js/components/bar/基础柱状图/BasicBar.js"></script>
// <script src="static/js/components/bar/堆叠柱状图/StackedBar.js"></script>
// <script src="static/js/components/bar/3D柱状图/Bar3D.js"></script>

// 折线图组件
// <script src="static/js/components/line/基础折线图/BasicLine.js"></script>
// <script src="static/js/components/line/堆叠折线图/StackedLine.js"></script>
// <script src="static/js/components/line/基础面积图/BasicArea.js"></script>

// 饼图组件
// <script src="static/js/components/pie/基础饼图/BasicPie.js"></script>
// <script src="static/js/components/pie/环形图/DoughnutPie.js"></script>
// <script src="static/js/components/pie/玫瑰图/RosePie.js"></script>

// 散点图组件
// <script src="static/js/components/scatter/基础散点图/BasicScatter.js"></script>
// <script src="static/js/components/scatter/3D散点图/Scatter3D.js"></script>

// 雷达图组件
// <script src="static/js/components/radar/基础雷达图/BasicRadar.js"></script>

// 热力图组件
// <script src="static/js/components/heatmap/基础热力图/BasicHeatmap.js"></script>

// K线图组件
// <script src="static/js/components/candlestick/基础K线图/BasicCandlestick.js"></script>

// 漏斗图组件
// <script src="static/js/components/funnel/基础漏斗图/Funnel.js"></script>

// 关系图组件
// <script src="static/js/components/graph/基础关系图/Graph.js"></script>

// 盒须图组件
// <script src="static/js/components/boxplot/基础盒须图/Boxplot.js"></script>

// 树图组件
// <script src="static/js/components/tree/基础树图/Tree.js"></script>

// 矩形树图组件
// <script src="static/js/components/treemap/基础矩形树图/Treemap.js"></script>

// 旭日图组件
// <script src="static/js/components/sunburst/基础旭日图/Sunburst.js"></script>

// 桑基图组件
// <script src="static/js/components/sankey/基础桑基图/Sankey.js"></script>

// 主题河流图组件
// <script src="static/js/components/themeriver/基础主题河流图/ThemeRiver.js"></script>

// 平行坐标系图组件
// <script src="static/js/components/parallel/基础平行坐标系图/Parallel.js"></script>

// 仪表盘组件
// <script src="static/js/components/gauge/基础仪表盘/BasicGauge.js"></script>

// 地图组件
// <script src="static/js/components/map/中国地图/ChinaMap.js"></script>
// <script src="static/js/components/map/世界地图/WorldMap.js"></script>

// 文本组件
// <script src="static/js/components/text/基础文本框/BasicText.js"></script>

// 3D曲面图组件
// <script src="static/js/components/surface/3D曲面图/Surface3D.js"></script>

// 按钮组件
// <script src="static/js/components/button/基础按钮/BaseButton.js"></script>

// 输入框组件
// <script src="static/js/components/input/基础输入框/BaseInput.js"></script>

// 所有组件将通过各自的文件添加到全局作用域中
// 组件注册将在各个组件文件中完成