// 切换按钮组件
const ToggleButton = {
  id: "button_002",
  type: "button",
  name: "切换按钮",
  icon: "🔄",
  category: "button",
  subCategory: "切换按钮",
  defaultProps: {
    textOn: "开启",
    textOff: "关闭",
    backgroundColorOn: "#28a745",
    backgroundColorOff: "#dc3545",
    color: "#ffffff",
    fontSize: 14,
    borderRadius: 4,
    isOn: false,
    urlOn: "",
    urlOff: "",
    targetOn: "_blank",
    targetOff: "_blank"
  },
  dataSchema: {
    type: "object",
    properties: {
      textOn: { type: "string", title: "开启状态文本" },
      textOff: { type: "string", title: "关闭状态文本" },
      backgroundColorOn: { type: "string", title: "开启状态背景色" },
      backgroundColorOff: { type: "string", title: "关闭状态背景色" },
      color: { type: "string", title: "文字颜色" },
      fontSize: { type: "number", title: "字体大小" },
      borderRadius: { type: "number", title: "圆角" },
      isOn: { type: "boolean", title: "初始状态" },
      urlOn: { type: "string", title: "开启状态链接" },
      urlOff: { type: "string", title: "关闭状态链接" },
      targetOn: { type: "string", title: "开启状态打开方式" },
      targetOff: { type: "string", title: "关闭状态打开方式" }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      textOn: { type: "string", title: "开启状态文本" },
      textOff: { type: "string", title: "关闭状态文本" },
      backgroundColorOn: { type: "string", title: "开启状态背景色" },
      backgroundColorOff: { type: "string", title: "关闭状态背景色" },
      color: { type: "string", title: "文字颜色" },
      fontSize: { type: "number", title: "字体大小" },
      borderRadius: { type: "number", title: "圆角" },
      isOn: { type: "boolean", title: "初始状态" },
      urlOn: { type: "string", title: "开启状态链接" },
      urlOff: { type: "string", title: "关闭状态链接" },
      targetOn: { type: "string", enum: ["_blank", "_self"], title: "开启状态打开方式" },
      targetOff: { type: "string", enum: ["_blank", "_self"], title: "关闭状态打开方式" }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建按钮元素
    const button = document.createElement('button');
    button.textContent = finalOptions.isOn ? finalOptions.textOn : finalOptions.textOff;
    button.style.backgroundColor = finalOptions.isOn ? finalOptions.backgroundColorOn : finalOptions.backgroundColorOff;
    button.style.color = finalOptions.color;
    button.style.fontSize = finalOptions.fontSize + 'px';
    button.style.borderRadius = finalOptions.borderRadius + 'px';
    button.style.border = 'none';
    button.style.padding = '8px 16px';
    button.style.cursor = 'pointer';
    button.style.width = '100%';
    button.style.height = '100%';
    button.style.boxSizing = 'border-box';
    
    // 添加切换功能
    button.addEventListener('click', function() {
      finalOptions.isOn = !finalOptions.isOn;
      button.textContent = finalOptions.isOn ? finalOptions.textOn : finalOptions.textOff;
      button.style.backgroundColor = finalOptions.isOn ? finalOptions.backgroundColorOn : finalOptions.backgroundColorOff;
      
      // 执行链接跳转
      const url = finalOptions.isOn ? finalOptions.urlOn : finalOptions.urlOff;
      const target = finalOptions.isOn ? finalOptions.targetOn : finalOptions.targetOff;
      if (url) {
        if (target === '_blank') {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }
    });
    
    // 清空容器并添加按钮
    container.innerHTML = '';
    container.appendChild(button);
    
    return button;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(ToggleButton);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ToggleButton);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ToggleButton);
    }
  }, 100);
}
