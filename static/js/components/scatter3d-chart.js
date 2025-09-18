// 3D散点图组件
class Scatter3DChartComponent {
    static getType() {
        return 'scatter3D';
    }

    static getTitle() {
        return '3D散点图';
    }

    static getIcon() {
        return 'fas fa-cubes';
    }

    static getDefaultConfig() {
        // 生成示例数据
        const data = [];
        for (let i = 0; i < 20; i++) {
            data.push([
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100 // 第四个维度用于颜色映射
            ]);
        }
        
        return {
            title: '3D散点图示例',
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
