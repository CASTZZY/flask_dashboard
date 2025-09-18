// 自定义系列组件
const BasicCustom = {
  id: "custom_001",
  type: "echarts",
  name: "基础自定义图",
  icon: "自定义",
  category: "custom",
  subCategory: "基础自定义图",
  defaultProps: {
    title: {
      text: '基础自定义图'
    },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {
      type: 'value'
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
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(BasicCustom);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicCustom);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicCustom);
    }
  }, 100);
}
