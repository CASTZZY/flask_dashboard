// 组件注册器
class ComponentRegistry {
    constructor() {
        this.components = new Map();
    }

    // 注册组件
    register(component) {
        if (!component.id) {
            console.error('组件必须包含id属性');
            return;
        }
        
        if (this.components.has(component.id)) {
            console.warn(`组件 ${component.id} 已经注册，将被覆盖`);
        }
        
        this.components.set(component.id, component);
        console.log(`组件 ${component.id} 注册成功`);
    }

    // 获取组件
    get(componentId) {
        return this.components.get(componentId);
    }

    // 获取所有组件
    getAll() {
        return Array.from(this.components.values());
    }

    // 根据类型获取组件
    getByType(type) {
        return Array.from(this.components.values()).filter(component => component.type === type);
    }

    // 根据分类获取组件
    getByCategory(category) {
        return Array.from(this.components.values()).filter(component => component.category === category);
    }
}

// 创建全局实例
const componentRegistry = new ComponentRegistry();

// 暴露到全局
if (typeof window !== 'undefined') {
    window.ComponentRegistry = componentRegistry;
    window.ComponentRegistryClass = ComponentRegistry;
    console.log('ComponentRegistry 已初始化并暴露到全局');
}

// 组件注册器已添加到全局作用域