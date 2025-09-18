// 画布组件
const CanvasComponent = {
  id: "canvas_001",
  type: "layout",
  name: "画布",
  icon: "캔버스",
  category: "布局组件",
  subCategory: "画布",
  defaultProps: {
    width: 1920,
    height: 1080,
    backgroundColor: "#f0f0f0",
    gridSize: 20,
    showGrid: true,
    gridColor: "#cccccc",
    style: {
      width: "100%",
      height: "100%",
      position: "relative",
      overflow: "hidden"
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      width: { type: "number", title: "画布宽度" },
      height: { type: "number", title: "画布高度" },
      backgroundColor: { type: "string", title: "背景色" },
      gridSize: { type: "number", title: "网格大小" },
      showGrid: { type: "boolean", title: "是否显示网格" },
      gridColor: { type: "string", title: "网格颜色" },
      style: { 
        type: "object",
        title: "样式设置"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      width: { 
        type: "number", 
        title: "画布宽度" 
      },
      height: { 
        type: "number", 
        title: "画布高度" 
      },
      backgroundColor: { 
        type: "string", 
        title: "背景色" 
      },
      gridSize: { 
        type: "number", 
        title: "网格大小" 
      },
      showGrid: { 
        type: "boolean", 
        title: "是否显示网格" 
      },
      gridColor: { 
        type: "string", 
        title: "网格颜色" 
      },
      style: { 
        type: "object", 
        title: "样式设置" 
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建画布容器
    const canvasContainer = document.createElement('div');
    
    // 应用样式
    Object.assign(canvasContainer.style, finalOptions.style);
    canvasContainer.style.backgroundColor = finalOptions.backgroundColor;
    
    // 如果需要显示网格，则创建网格背景
    if (finalOptions.showGrid) {
      canvasContainer.style.backgroundImage = `
        linear-gradient(${finalOptions.gridColor} 1px, transparent 1px),
        linear-gradient(90deg, ${finalOptions.gridColor} 1px, transparent 1px)
      `;
      canvasContainer.style.backgroundSize = `${finalOptions.gridSize}px ${finalOptions.gridSize}px`;
    }
    
    // 添加到容器
    container.appendChild(canvasContainer);
    
    return canvasContainer;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(CanvasComponent);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(CanvasComponent);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(CanvasComponent);
    }
  }, 100);
}
