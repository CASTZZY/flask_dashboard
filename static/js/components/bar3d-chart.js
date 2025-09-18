// 3D柱状图组件
class Bar3DChartComponent {
    static getType() {
        return 'bar3D';
    }

    static getTitle() {
        return '3D柱状图';
    }

    static getIcon() {
        return 'fas fa-cube';
    }

    static getDefaultConfig() {
        return {
            title: '3D柱状图示例',
            data: [
                { x: '周一', y: '类别1', z: 120 },
                { x: '周二', y: '类别1', z: 200 },
                { x: '周三', y: '类别1', z: 150 },
                { x: '周四', y: '类别1', z: 80 },
                { x: '周五', y: '类别1', z: 70 },
                { x: '周一', y: '类别2', z: 100 },
                { x: '周二', y: '类别2', z: 180 },
                { x: '周三', y: '类别2', z: 130 },
                { x: '周四', y: '类别2', z: 90 },
                { x: '周五', y: '类别2', z: 110 }
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
