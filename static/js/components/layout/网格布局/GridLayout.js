// 网格布局组件
const GridLayout = {
  id: "grid_layout_001",
  type: "layout",
  name: "网格布局",
  icon: "⊞",
  category: "布局组件",
  subCategory: "网格布局",
  defaultProps: {
    columns: 3,
    rows: 3,
    gap: 10,
    style: {
      width: 800,
      height: 600,
      backgroundColor: "#f5f5f5",
      border: "1px solid #d9d9d9",
      borderRadius: 4
    },
    cellStyle: {
      backgroundColor: "#ffffff",
      border: "1px solid #e8e8e8",
      borderRadius: 4
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      columns: { type: "number", title: "列数" },
      rows: { type: "number", title: "行数" },
      gap: { type: "number", title: "间距" },
      style: { 
        type: "object",
        properties: {
          width: { type: "number", title: "宽度" },
          height: { type: "number", title: "高度" },
          backgroundColor: { type: "string", title: "背景色" },
          border: { type: "string", title: "边框" },
          borderRadius: { type: "number", title: "圆角" }
        },
        title: "容器样式"
      },
      cellStyle: { 
        type: "object",
        properties: {
          backgroundColor: { type: "string", title: "单元格背景色" },
          border: { type: "string", title: "单元格边框" },
          borderRadius: { type: "number", title: "单元格圆角" }
        },
        title: "单元格样式"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      columns: { 
        type: "number", 
        title: "列数",
        minimum: 1,
        maximum: 12
      },
      rows: { 
        type: "number", 
        title: "行数",
        minimum: 1,
        maximum: 12
      },
      gap: { 
        type: "number", 
        title: "间距(px)",
        minimum: 0,
        maximum: 50
      },
      style: { 
        type: "object",
        properties: {
          width: { type: "number", title: "宽度(px)" },
          height: { type: "number", title: "高度(px)" },
          backgroundColor: { type: "string", title: "背景色" },
          border: { type: "string", title: "边框样式" },
          borderRadius: { type: "number", title: "圆角(px)" }
        },
        title: "容器样式"
      },
      cellStyle: { 
        type: "object",
        properties: {
          backgroundColor: { type: "string", title: "单元格背景色" },
          border: { type: "string", title: "单元格边框" },
          borderRadius: { type: "number", title: "单元格圆角(px)" }
        },
        title: "单元格样式"
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建网格布局元素
    const gridLayoutElement = document.createElement('div');
    gridLayoutElement.style.width = finalOptions.style.width + 'px';
    gridLayoutElement.style.height = finalOptions.style.height + 'px';
    gridLayoutElement.style.backgroundColor = finalOptions.style.backgroundColor;
    gridLayoutElement.style.border = finalOptions.style.border;
    gridLayoutElement.style.borderRadius = finalOptions.style.borderRadius + 'px';
    gridLayoutElement.style.display = 'grid';
    gridLayoutElement.style.gridTemplateColumns = `repeat(${finalOptions.columns}, 1fr)`;
    gridLayoutElement.style.gridTemplateRows = `repeat(${finalOptions.rows}, 1fr)`;
    gridLayoutElement.style.gap = finalOptions.gap + 'px';
    gridLayoutElement.style.padding = finalOptions.gap + 'px';
    
    // 创建网格单元格
    const totalCells = finalOptions.columns * finalOptions.rows;
    for (let i = 0; i < totalCells; i++) {
      const cellElement = document.createElement('div');
      cellElement.style.backgroundColor = finalOptions.cellStyle.backgroundColor;
      cellElement.style.border = finalOptions.cellStyle.border;
      cellElement.style.borderRadius = finalOptions.cellStyle.borderRadius + 'px';
      cellElement.style.display = 'flex';
      cellElement.style.alignItems = 'center';
      cellElement.style.justifyContent = 'center';
      cellElement.style.overflow = 'hidden';
      
      // 添加单元格标识
      const cellLabel = document.createElement('span');
      cellLabel.textContent = `单元格 ${i + 1}`;
      cellLabel.style.color = '#999';
      cellLabel.style.fontSize = '12px';
      
      cellElement.appendChild(cellLabel);
      gridLayoutElement.appendChild(cellElement);
    }
    
    // 添加到容器
    container.appendChild(gridLayoutElement);
    
    return gridLayoutElement;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(GridLayout);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(GridLayout);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(GridLayout);
    }
  }, 100);
}
