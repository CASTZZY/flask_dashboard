// 基础按钮组件
const BaseButton = {
  id: "button_001",
  type: "button",
  name: "基础按钮",
  icon: "🔘",
  category: "button",
  subCategory: "基础按钮",
  defaultProps: {
    text: "按钮",
    backgroundColor: "#007bff",
    color: "#ffffff",
    fontSize: 14,
    borderRadius: 4,
    url: "",
    target: "_blank"
  },
  dataSchema: {
    type: "object",
    properties: {
      text: { type: "string", title: "按钮文本" },
      backgroundColor: { type: "string", title: "背景颜色" },
      color: { type: "string", title: "文字颜色" },
      fontSize: { type: "number", title: "字体大小" },
      borderRadius: { type: "number", title: "圆角" },
      url: { type: "string", title: "链接地址" },
      target: { type: "string", title: "打开方式" }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      text: { type: "string", title: "按钮文本" },
      backgroundColor: { type: "string", title: "背景颜色" },
      color: { type: "string", title: "文字颜色" },
      fontSize: { type: "number", title: "字体大小" },
      borderRadius: { type: "number", title: "圆角" },
      url: { type: "string", title: "链接地址" },
      target: { type: "string", enum: ["_blank", "_self"], title: "打开方式" }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建按钮元素
    const button = document.createElement('button');
    button.textContent = finalOptions.text;
    button.style.backgroundColor = finalOptions.backgroundColor;
    button.style.color = finalOptions.color;
    button.style.fontSize = finalOptions.fontSize + 'px';
    button.style.borderRadius = finalOptions.borderRadius + 'px';
    button.style.border = 'none';
    button.style.padding = '8px 16px';
    button.style.cursor = 'pointer';
    button.style.width = '100%';
    button.style.height = '100%';
    button.style.boxSizing = 'border-box';
    
    // 添加点击事件
    if (finalOptions.url) {
      button.addEventListener('click', function() {
        if (finalOptions.target === '_blank') {
          window.open(finalOptions.url, '_blank');
        } else {
          window.location.href = finalOptions.url;
        }
      });
    }
    
    // 清空容器并添加按钮
    container.innerHTML = '';
    container.appendChild(button);
    
    return button;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(BaseButton);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BaseButton);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BaseButton);
    }
  }, 100);
}
