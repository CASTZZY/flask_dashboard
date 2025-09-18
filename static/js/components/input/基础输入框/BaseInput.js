// 基础输入框组件
const BaseInput = {
  id: "input_001",
  type: "input",
  name: "基础输入框",
  icon: "⌨️",
  category: "input",
  subCategory: "基础输入框",
  defaultProps: {
    placeholder: "请输入内容",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: 14,
    borderRadius: 4,
    borderColor: "#ced4da"
  },
  dataSchema: {
    type: "object",
    properties: {
      placeholder: { type: "string", title: "占位符文本" },
      backgroundColor: { type: "string", title: "背景颜色" },
      color: { type: "string", title: "文字颜色" },
      fontSize: { type: "number", title: "字体大小" },
      borderRadius: { type: "number", title: "圆角" },
      borderColor: { type: "string", title: "边框颜色" }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      placeholder: { type: "string", title: "占位符文本" },
      backgroundColor: { type: "string", title: "背景颜色" },
      color: { type: "string", title: "文字颜色" },
      fontSize: { type: "number", title: "字体大小" },
      borderRadius: { type: "number", title: "圆角" },
      borderColor: { type: "string", title: "边框颜色" }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建输入框元素
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = finalOptions.placeholder;
    input.style.backgroundColor = finalOptions.backgroundColor;
    input.style.color = finalOptions.color;
    input.style.fontSize = finalOptions.fontSize + 'px';
    input.style.borderRadius = finalOptions.borderRadius + 'px';
    input.style.borderColor = finalOptions.borderColor;
    input.style.border = '1px solid ' + finalOptions.borderColor;
    input.style.padding = '8px 12px';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.boxSizing = 'border-box';
    
    // 清空容器并添加输入框
    container.innerHTML = '';
    container.appendChild(input);
    
    return input;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(BaseInput);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(BaseInput);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(BaseInput);
    }
  }, 100);
}
