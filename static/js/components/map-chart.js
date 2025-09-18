// 地图图表组件
class MapChartComponent {
    static getType() {
        return 'map';
    }

    static getTitle() {
        return '地图';
    }

    static getIcon() {
        return 'fas fa-map';
    }

    static getDefaultConfig() {
        return {
            title: '地图示例',
            mapType: 'china',
            data: [
                { name: '北京', value: 100 },
                { name: '上海', value: 80 },
                { name: '广东', value: 85 },
                { name: '深圳', value: 75 },
                { name: '杭州', value: 90 }
            ]
        };
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(option);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(option);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(option);
    }
  }, 100);
}
