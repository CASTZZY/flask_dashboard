// 卡片容器组件
const CardContainer = {
  id: "card_container_001",
  type: "layout",
  name: "卡片容器",
  icon: "カード",
  category: "布局组件",
  subCategory: "卡片容器",
  defaultProps: {
    title: "卡片标题",
    showHeader: true,
    showFooter: false,
    style: {
      width: 300,
      minHeight: 200,
      backgroundColor: "#ffffff",
      border: "1px solid #d9d9d9",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    },
    headerStyle: {
      backgroundColor: "#f5f5f5",
      padding: "12px 16px",
      borderBottom: "1px solid #d9d9d9"
    },
    bodyStyle: {
      padding: "16px"
    },
    footerStyle: {
      backgroundColor: "#f5f5f5",
      padding: "12px 16px",
      borderTop: "1px solid #d9d9d9"
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      title: { type: "string", title: "标题" },
      showHeader: { type: "boolean", title: "是否显示头部" },
      showFooter: { type: "boolean", title: "是否显示底部" },
      style: { 
        type: "object",
        properties: {
          width: { type: "number", title: "宽度" },
          minHeight: { type: "number", title: "最小高度" },
          backgroundColor: { type: "string", title: "背景色" },
          border: { type: "string", title: "边框" },
          borderRadius: { type: "number", title: "圆角" },
          boxShadow: { type: "string", title: "阴影" }
        },
        title: "容器样式"
      },
      headerStyle: { 
        type: "object",
        properties: {
          backgroundColor: { type: "string", title: "头部背景色" },
          padding: { type: "string", title: "头部内边距" },
          borderBottom: { type: "string", title: "底部边框" }
        },
        title: "头部样式"
      },
      bodyStyle: { 
        type: "object",
        properties: {
          padding: { type: "string", title: "内容区内边距" }
        },
        title: "内容区样式"
      },
      footerStyle: { 
        type: "object",
        properties: {
          backgroundColor: { type: "string", title: "底部背景色" },
          padding: { type: "string", title: "底部内边距" },
          borderTop: { type: "string", title: "顶部边框" }
        },
        title: "底部样式"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      title: { 
        type: "string", 
        title: "卡片标题"
      },
      showHeader: { 
        type: "boolean", 
        title: "是否显示头部"
      },
      showFooter: { 
        type: "boolean", 
        title: "是否显示底部"
      },
      style: { 
        type: "object",
        properties: {
          width: { type: "number", title: "宽度(px)" },
          minHeight: { type: "number", title: "最小高度(px)" },
          backgroundColor: { type: "string", title: "背景色" },
          border: { type: "string", title: "边框样式" },
          borderRadius: { type: "number", title: "圆角(px)" },
          boxShadow: { type: "string", title: "阴影" }
        },
        title: "容器样式"
      },
      headerStyle: { 
        type: "object",
        properties: {
          backgroundColor: { type: "string", title: "头部背景色" },
          padding: { type: "string", title: "头部内边距" },
          borderBottom: { type: "string", title: "底部边框" }
        },
        title: "头部样式"
      },
      bodyStyle: { 
        type: "object",
        properties: {
          padding: { type: "string", title: "内容区内边距" }
        },
        title: "内容区样式"
      },
      footerStyle: { 
        type: "object",
        properties: {
          backgroundColor: { type: "string", title: "底部背景色" },
          padding: { type: "string", title: "底部内边距" },
          borderTop: { type: "string", title: "顶部边框" }
        },
        title: "底部样式"
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建卡片容器元素
    const cardElement = document.createElement('div');
    cardElement.style.width = finalOptions.style.width + 'px';
    cardElement.style.minHeight = finalOptions.style.minHeight + 'px';
    cardElement.style.backgroundColor = finalOptions.style.backgroundColor;
    cardElement.style.border = finalOptions.style.border;
    cardElement.style.borderRadius = finalOptions.style.borderRadius + 'px';
    cardElement.style.boxShadow = finalOptions.style.boxShadow;
    cardElement.style.display = 'flex';
    cardElement.style.flexDirection = 'column';
    
    // 创建头部
    if (finalOptions.showHeader) {
      const headerElement = document.createElement('div');
      headerElement.style.backgroundColor = finalOptions.headerStyle.backgroundColor;
      headerElement.style.padding = finalOptions.headerStyle.padding;
      headerElement.style.borderBottom = finalOptions.headerStyle.borderBottom;
      
      const titleElement = document.createElement('h3');
      titleElement.textContent = finalOptions.title;
      titleElement.style.margin = '0';
      titleElement.style.fontSize = '16px';
      titleElement.style.fontWeight = '600';
      
      headerElement.appendChild(titleElement);
      cardElement.appendChild(headerElement);
    }
    
    // 创建内容区
    const bodyElement = document.createElement('div');
    bodyElement.style.flex = '1';
    bodyElement.style.padding = finalOptions.bodyStyle.padding;
    
    // 添加内容区标识
    const bodyLabel = document.createElement('span');
    bodyLabel.textContent = '卡片内容区';
    bodyLabel.style.color = '#999';
    bodyLabel.style.fontSize = '12px';
    
    bodyElement.appendChild(bodyLabel);
    cardElement.appendChild(bodyElement);
    
    // 创建底部
    if (finalOptions.showFooter) {
      const footerElement = document.createElement('div');
      footerElement.style.backgroundColor = finalOptions.footerStyle.backgroundColor;
      footerElement.style.padding = finalOptions.footerStyle.padding;
      footerElement.style.borderTop = finalOptions.footerStyle.borderTop;
      
      const footerLabel = document.createElement('span');
      footerLabel.textContent = '卡片底部';
      footerLabel.style.color = '#999';
      footerLabel.style.fontSize = '12px';
      
      footerElement.appendChild(footerLabel);
      cardElement.appendChild(footerElement);
    }
    
    // 添加到容器
    container.appendChild(cardElement);
    
    return cardElement;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(CardContainer);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(CardContainer);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(CardContainer);
    }
  }, 100);
}
