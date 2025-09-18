// 基础文本组件
const BasicText = {
  id: "text_001",
  type: "text",
  name: "基础文本框",
  icon: "T",
  category: "text",
  subCategory: "基础文本框",
  defaultProps: {
    content: "这是一段文本内容",
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#ffffff"
  },
  dataSchema: {
    type: "object",
    properties: {
      content: { type: "string", title: "文本内容" },
      fontSize: { type: "number", title: "字体大小" },
      color: { type: "string", title: "文字颜色" },
      backgroundColor: { type: "string", title: "背景颜色" }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      content: { type: "string", title: "文本内容" },
      fontSize: { type: "number", title: "字体大小" },
      color: { type: "string", title: "文字颜色" },
      backgroundColor: { type: "string", title: "背景颜色" }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 设置容器样式
    container.style.fontSize = finalOptions.fontSize + 'px';
    container.style.color = finalOptions.color;
    container.style.backgroundColor = finalOptions.backgroundColor;
    container.style.padding = '10px';
    container.style.width = '100%';
    container.style.height = '100%';
    
    // 设置文本内容
    container.innerHTML = finalOptions.content;
    
    return container;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(BasicText);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BasicText);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BasicText);
    }
  }, 100);
}
