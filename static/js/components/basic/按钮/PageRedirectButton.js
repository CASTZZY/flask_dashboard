// 页面切换按钮组件
const PageRedirectButton = {
  id: "btn_001",
  type: "basic",
  name: "页面切换按钮",
  icon: "Btn",
  category: "基础组件",
  subCategory: "按钮",
  defaultProps: {
    buttonText: "点击跳转",
    targetUrl: "",
    buttonStyle: {
      backgroundColor: "#007bff",
      color: "#ffffff",
      borderRadius: "4px",
      border: "1px solid #007bff",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px"
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      buttonText: { type: "string", title: "按钮文本" },
      targetUrl: { type: "string", format: "uri", title: "目标URL" },
      buttonStyle: { 
        type: "object",
        title: "按钮样式"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      buttonText: { 
        type: "string", 
        title: "按钮文本" 
      },
      targetUrl: { 
        type: "string", 
        format: "uri", 
        title: "目标URL" 
      },
      buttonStyle: { 
        type: "object", 
        title: "按钮样式" 
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建按钮元素
    const button = document.createElement('button');
    button.textContent = finalOptions.buttonText;
    
    // 应用样式
    Object.assign(button.style, finalOptions.buttonStyle);
    
    // 绑定点击事件
    button.onclick = () => {
      if (finalOptions.targetUrl) {
        window.location.href = finalOptions.targetUrl;
      }
    };
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(PageRedirectButton);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(PageRedirectButton);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(PageRedirectButton);
    }
  }, 100);
}
