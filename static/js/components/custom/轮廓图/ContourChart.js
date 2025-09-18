// 轮廓图组件
const ContourChart = {
  id: "contour_chart_001",
  type: "echarts",
  name: "轮廓图",
  icon: "轮廓",
  category: "custom",
  subCategory: "轮廓图",
  defaultProps: {
    title: {
      text: '轮廓图'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}'
    },
    xAxis: {
      type: 'value',
      min: -5,
      max: 5
    },
    yAxis: {
      type: 'value',
      min: -5,
      max: 5
    },
    series: [
      {
        name: '轮廓图',
        type: 'custom',
        renderItem: function (params, api) {
          const points = [];
          const data = api.dataInsideAll();
          
          // 生成轮廓点
          for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * 2 * Math.PI;
            const x = 3 * Math.cos(angle) + Math.random() * 0.5;
            const y = 3 * Math.sin(angle) + Math.random() * 0.5;
            points.push(api.coord([x, y]));
          }
          
          return {
            type: 'polygon',
            shape: {
              points: points
            },
            style: api.style({
              fill: 'rgba(0, 123, 255, 0.3)',
              stroke: '#007bff',
              lineWidth: 2
            })
          };
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(ContourChart);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ContourChart);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ContourChart);
    }
  }, 100);
}
