// 增强文本组件
const EnhancedText = {
  id: "text_002",
  type: "text",
  name: "增强文本框",
  icon: "📝",
  category: "text",
  subCategory: "增强文本框",
  defaultProps: {
    content: "这是一段文本内容",
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#ffffff",
    opacity: 1,
    fontWeight: "normal",
    textAlign: "left",
    padding: 10,
    borderRadius: 0
  },
  dataSchema: {
    type: "object",
    properties: {
      content: { type: "string", title: "文本内容" },
      fontSize: { type: "number", title: "字体大小" },
      color: { type: "string", title: "文字颜色" },
      backgroundColor: { type: "string", title: "背景颜色" },
      opacity: { type: "number", title: "透明度" },
      fontWeight: { type: "string", title: "字体粗细" },
      textAlign: { type: "string", title: "文本对齐" },
      padding: { type: "number", title: "内边距" },
      borderRadius: { type: "number", title: "圆角" }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      content: { type: "string", title: "文本内容" },
      fontSize: { type: "number", title: "字体大小" },
      color: { type: "string", title: "文字颜色" },
      backgroundColor: { type: "string", title: "背景颜色" },
      opacity: { type: "number", minimum: 0, maximum: 1, title: "透明度" },
      fontWeight: { type: "string", enum: ["normal", "bold", "bolder", "lighter"], title: "字体粗细" },
      textAlign: { type: "string", enum: ["left", "center", "right"], title: "文本对齐" },
      padding: { type: "number", title: "内边距" },
      borderRadius: { type: "number", title: "圆角" }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 设置容器样式
    container.style.fontSize = finalOptions.fontSize + 'px';
    container.style.color = finalOptions.color;
    container.style.backgroundColor = finalOptions.backgroundColor;
    container.style.opacity = finalOptions.opacity;
    container.style.fontWeight = finalOptions.fontWeight;
    container.style.textAlign = finalOptions.textAlign;
    container.style.padding = finalOptions.padding + 'px';
    container.style.borderRadius = finalOptions.borderRadius + 'px';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.boxSizing = 'border-box';
    
    // 设置文本内容
    container.innerHTML = finalOptions.content;
    
    return container;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(EnhancedText);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(EnhancedText);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(EnhancedText);
    }
  }, 100);
}
