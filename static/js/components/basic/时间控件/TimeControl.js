// 时间控件组件
const TimeControl = {
  id: "time_control_001",
  type: "basic",
  name: "时间控件",
  icon: "⏰",
  category: "基础组件",
  subCategory: "时间控件",
  defaultProps: {
    format: "YYYY-MM-DD HH:mm:ss",
    defaultValue: new Date(),
    showTime: true,
    style: {
      width: 200,
      height: 32,
      fontSize: 14,
      color: "#333333",
      backgroundColor: "#ffffff",
      border: "1px solid #d9d9d9",
      borderRadius: 4
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      format: { type: "string", title: "时间格式" },
      defaultValue: { type: "string", format: "date-time", title: "默认值" },
      showTime: { type: "boolean", title: "是否显示时间" },
      style: { 
        type: "object",
        properties: {
          width: { type: "number", title: "宽度" },
          height: { type: "number", title: "高度" },
          fontSize: { type: "number", title: "字体大小" },
          color: { type: "string", title: "文字颜色" },
          backgroundColor: { type: "string", title: "背景色" },
          border: { type: "string", title: "边框" },
          borderRadius: { type: "number", title: "圆角" }
        },
        title: "样式设置"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      format: { 
        type: "string", 
        title: "时间格式",
        description: "时间显示格式，如 YYYY-MM-DD HH:mm:ss"
      },
      defaultValue: { 
        type: "string", 
        format: "date-time", 
        title: "默认值" 
      },
      showTime: { 
        type: "boolean", 
        title: "是否显示时间",
        description: "是否显示时间选择器"
      },
      style: { 
        type: "object",
        properties: {
          width: { type: "number", title: "宽度(px)" },
          height: { type: "number", title: "高度(px)" },
          fontSize: { type: "number", title: "字体大小(px)" },
          color: { type: "string", title: "文字颜色" },
          backgroundColor: { type: "string", title: "背景色" },
          border: { type: "string", title: "边框样式" },
          borderRadius: { type: "number", title: "圆角(px)" }
        },
        title: "样式设置"
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建时间控件元素
    const timeControlElement = document.createElement('div');
    
    // 创建输入框
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = finalOptions.defaultValue.toLocaleString();
    inputElement.style.width = finalOptions.style.width + 'px';
    inputElement.style.height = finalOptions.style.height + 'px';
    inputElement.style.fontSize = finalOptions.style.fontSize + 'px';
    inputElement.style.color = finalOptions.style.color;
    inputElement.style.backgroundColor = finalOptions.style.backgroundColor;
    inputElement.style.border = finalOptions.style.border;
    inputElement.style.borderRadius = finalOptions.style.borderRadius + 'px';
    inputElement.style.padding = '4px 11px';
    inputElement.style.boxSizing = 'border-box';
    
    // 添加到容器
    timeControlElement.appendChild(inputElement);
    container.appendChild(timeControlElement);
    
    // 添加时间选择功能
    let isPickerOpen = false;
    inputElement.addEventListener('click', function() {
      if (!isPickerOpen) {
        isPickerOpen = true;
        // 这里可以添加时间选择器的实现
        // 为简化示例，我们只显示一个简单的提示
        alert('时间选择器已打开');
        isPickerOpen = false;
      }
    });
    
    return timeControlElement;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(TimeControl);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(TimeControl);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(TimeControl);
    }
  }, 100);
}
