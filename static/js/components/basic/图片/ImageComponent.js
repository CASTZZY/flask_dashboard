// 图片组件
const ImageComponent = {
  id: "image_001",
  type: "basic",
  name: "图片组件",
  icon: " Img",
  category: "基础组件",
  subCategory: "图片",
  defaultProps: {
    imageUrl: "",
    altText: "图片",
    fit: "cover",
    style: {
      width: "100%",
      height: "auto",
      objectFit: "cover"
    }
  },
  dataSchema: {
    type: "object",
    properties: {
      imageUrl: { type: "string", format: "uri", title: "图片URL" },
      altText: { type: "string", title: "替代文本" },
      fit: { type: "string", title: "图片适应方式" },
      style: { 
        type: "object",
        title: "样式设置"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      imageUrl: { 
        type: "string", 
        format: "uri", 
        title: "图片URL" 
      },
      altText: { 
        type: "string", 
        title: "替代文本" 
      },
      fit: { 
        type: "string", 
        title: "图片适应方式",
        enum: ["cover", "contain", "fill", "scale-down", "none"]
      },
      style: { 
        type: "object", 
        title: "样式设置" 
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 创建图片元素
    const img = document.createElement('img');
    img.src = finalOptions.imageUrl;
    img.alt = finalOptions.altText;
    
    // 应用样式
    Object.assign(img.style, finalOptions.style);
    img.style.objectFit = finalOptions.fit;
    
    // 添加到容器
    container.appendChild(img);
    
    return img;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(ImageComponent);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(ImageComponent);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(ImageComponent);
    }
  }, 100);
}
