// 曲面图组件
class SurfaceChartComponent {
    static getType() {
        return 'surface';
    }

    static getTitle() {
        return '曲面图';
    }

    static getIcon() {
        return 'fas fa-cube';
    }

    static getDefaultConfig() {
        // 生成示例数据 - 球面参数方程
        const data = [];
        for (let u = -Math.PI; u <= Math.PI; u += Math.PI / 20) {
            for (let v = 0; v <= Math.PI; v += Math.PI / 20) {
                const x = Math.sin(v) * Math.sin(u);
                const y = Math.sin(v) * Math.cos(u);
                const z = Math.cos(v);
                data.push([x, y, z]);
            }
        }
        
        return {
            title: '曲面图示例',
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
