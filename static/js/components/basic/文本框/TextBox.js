// 基础文本框组件
const TextBox = {
  id: "textbox_001",
  type: "basic",
  name: "文本框",
  icon: "T",
  category: "基础组件",
  subCategory: "文本框",
  defaultProps: {
    text: "文本框",
    style: {
      fontSize: 16,
      color: "#333333",
      fontWeight: "normal",
      textAlign: "left",
      fontFamily: "Arial, sans-serif"
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      text: { type: "string", title: "显示文本" },
      style: { 
        type: "object",
        properties: {
          fontSize: { type: "number", title: "字体大小" },
          color: { type: "string", title: "文字颜色" },
          fontWeight: { type: "string", title: "字体粗细" },
          textAlign: { type: "string", title: "对齐方式" },
          fontFamily: { type: "string", title: "字体" }
        },
        title: "样式设置"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      text: { 
        type: "string", 
        title: "显示文本" 
      },
      style: { 
        type: "object",
        properties: {
          fontSize: { type: "number", title: "字体大小" },
          color: { type: "string", title: "文字颜色" },
          fontWeight: { type: "string", title: "字体粗细" },
          textAlign: { type: "string", title: "对齐方式" },
          fontFamily: { type: "string", title: "字体" }
        },
        title: "样式设置"
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建文本元素
    const textElement = document.createElement('div');
    textElement.textContent = finalOptions.text;
    
    // 应用样式
    Object.assign(textElement.style, finalOptions.style);
    
    // 添加到容器
    container.appendChild(textElement);
    
    return textElement;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(TextBox);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(TextBox);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(TextBox);
    }
  }, 100);
}
