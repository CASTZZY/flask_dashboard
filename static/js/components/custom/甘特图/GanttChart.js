// 甘特图组件
const GanttChart = {
  id: "gantt_chart_001",
  type: "echarts",
  name: "甘特图",
  icon: "甘特",
  category: "custom",
  subCategory: "甘特图",
  defaultProps: {
    title: {
      text: '甘特图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const data = params[0].data;
        return data[3] + '<br/>' + data[4] + ' - ' + data[5];
      }
    },
    xAxis: {
      type: 'time',
      position: 'top'
    },
    yAxis: {
      type: 'category',
      data: ['任务1', '任务2', '任务3', '任务4', '任务5']
    },
    series: [
      {
        type: 'custom',
        renderItem: function (params, api) {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const height = 20;
          
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
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(GanttChart);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(GanttChart);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(GanttChart);
    }
  }, 100);
}
