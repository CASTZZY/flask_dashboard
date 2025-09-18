// 3D地图组件
class Map3DChartComponent {
    static getType() {
        return 'map3D';
    }

    static getTitle() {
        return '3D地图';
    }

    static getIcon() {
        return 'fas fa-globe';
    }

    static getDefaultConfig() {
        // 示例数据
        const data = [
            { name: '中国', value: 100, height: 2 },
            { name: '美国', value: 90, height: 1.8 },
            { name: '日本', value: 80, height: 1.5 },
            { name: '德国', value: 75, height: 1.4 },
            { name: '英国', value: 70, height: 1.3 }
        ];
        
        return {
            title: '3D地图示例',
            mapType: 'world',
            data: data
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
