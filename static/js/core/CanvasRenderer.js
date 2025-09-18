/**
 * 画布渲染引擎
 * 按照需求文档11.3章节设计，负责将页面配置渲染为可视化的页面
 */

class CanvasRenderer {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.components = new Map(); // 存储组件实例
        this.isPublishedMode = canvasElement.id === 'published-canvas'; // 检测是否为发布页面模式
        
        // 根据模式设置画布配置
        if (this.isPublishedMode) {
            this.canvasConfig = {
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: '#000',
                backgroundImage: ''
            };
        } else {
            this.canvasConfig = {
                width: 1920,
                height: 1080,
                backgroundColor: '#f0f0f0',
                backgroundImage: ''
            };
        }
        
        console.log('🎨 CanvasRenderer 初始化', this.isPublishedMode ? '(发布模式)' : '(编辑模式)');
        this.init();
    }
    
    /**
     * 初始化渲染引擎
     */
    init() {
        this.setupCanvas();
        this.bindEvents();
    }
    
    /**
     * 设置画布
     */
    setupCanvas() {
        if (!this.canvas) {
            console.error('画布元素未找到');
            return;
        }
        
        // 应用画布样式
        this.applyCanvasStyle();
        
        // 设置画布容器样式
        const canvasWrapper = this.canvas.parentElement;
        if (canvasWrapper) {
            canvasWrapper.style.overflow = 'auto';
            canvasWrapper.style.padding = '20px';
            canvasWrapper.style.backgroundColor = '#f5f5f5';
        }
    }
    
    /**
     * 应用画布样式
     */
    applyCanvasStyle() {
        Object.assign(this.canvas.style, {
            width: `${this.canvasConfig.width}px`,
            height: `${this.canvasConfig.height}px`,
            backgroundColor: this.canvasConfig.backgroundColor,
            position: 'relative',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            margin: '0 auto',
            overflow: 'hidden'
        });
        
        // 设置背景图片
        if (this.canvasConfig.backgroundImage) {
            this.canvas.style.backgroundImage = `url(${this.canvasConfig.backgroundImage})`;
            this.canvas.style.backgroundSize = 'cover';
            this.canvas.style.backgroundPosition = 'center';
            this.canvas.style.backgroundRepeat = 'no-repeat';
        } else {
            this.canvas.style.backgroundImage = 'none';
        }
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.resizeAllComponents();
        });
        
        // 监听组件删除事件
        document.addEventListener('deleteComponent', (e) => {
            this.removeComponent(e.detail.componentId);
        });
    }
    
    /**
     * 渲染页面配置
     */
    async renderPage(pageConfig) {
        console.log('🎨 开始渲染页面:', pageConfig.name || pageConfig.id);
        
        try {
            // 清除现有内容
            this.clearCanvas();
            
            // 应用画布配置
            if (pageConfig.canvas) {
                this.updateCanvasConfig(pageConfig.canvas);
            }
            
            // 渲染所有组件
            if (pageConfig.components && pageConfig.components.length > 0) {
                for (const componentConfig of pageConfig.components) {
                    await this.renderComponent(componentConfig);
                }
            }
            
            console.log('✅ 页面渲染完成');
            
            // 重新初始化拖拽功能
            this.reinitializeDragAndResize();
            
        } catch (error) {
            console.error('❌ 页面渲染失败:', error);
            throw error;
        }
    }
    
    /**
     * 重新初始化拖拽和缩放功能
     */
    reinitializeDragAndResize() {
        console.log('🔄 重新初始化拖拽和缩放功能');
        
        // 通知DragLayoutEngine重新初始化
        if (window.DragLayoutEngine) {
            window.DragLayoutEngine.reinitialize();
        }
        
        // 为所有组件添加拖拽和缩放功能
        const components = this.canvas.querySelectorAll('.canvas-component');
        components.forEach(element => {
            // 确保组件可以被选中和拖拽
            element.style.cursor = 'move';
            
            // 添加选中事件
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectComponent(element.dataset.componentId);
            });
            
            // 如果DragLayoutEngine存在，确保组件被正确管理
            if (window.DragLayoutEngine) {
                window.DragLayoutEngine.addComponent(element);
            }
        });
        
        console.log('✅ 拖拽和缩放功能重新初始化完成');
    }
    
    /**
     * 选中组件
     */
    selectComponent(componentId) {
        // 清除之前的选中状态
        this.canvas.querySelectorAll('.canvas-component.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // 选中当前组件
        const element = this.canvas.querySelector(`[data-component-id="${componentId}"]`);
        if (element) {
            element.classList.add('selected');
            
            // 通知配置管理器
            if (window.ConfigManager) {
                const componentInfo = this.components.get(componentId);
                if (componentInfo) {
                    window.ConfigManager.showComponentConfig(componentInfo);
                }
            }
            
            console.log('🎯 组件已选中:', componentId);
        }
    }
    
    /**
     * 渲染单个组件
     */
    async renderComponent(componentConfig) {
        try {
            console.log('🔧 渲染组件:', componentConfig.id);
            
            // 获取组件定义
            const component = window.ComponentRegistry?.getComponent(componentConfig.type);
            if (!component) {
                throw new Error(`组件类型 ${componentConfig.type} 不存在`);
            }
            
            // 创建组件容器
            const componentElement = this.createComponentContainer(componentConfig);
            
            // 渲染组件内容
            const instance = component.render(componentElement, componentConfig.props || component.defaultProps);
            
            // 保存组件信息
            const componentInfo = {
                id: componentConfig.id,
                type: componentConfig.type,
                componentType: componentConfig.type, // 用于查找组件定义
                element: componentElement,
                instance: instance,
                config: { 
                    ...componentConfig,
                    props: componentConfig.props || { ...component.defaultProps },
                    apiEndpoint: componentConfig.apiEndpoint || `/api/components/${componentConfig.id}/data` // 确保有API端点
                }
            };
            
            this.components.set(componentConfig.id, componentInfo);
            
            // 添加到画布
            this.canvas.appendChild(componentElement);
            
            console.log('✅ 组件渲染成功:', componentConfig.id);
            
            return componentInfo;
            
        } catch (error) {
            console.error('❌ 组件渲染失败:', componentConfig.id, error);
            
            // 创建错误占位符
            const errorElement = this.createErrorPlaceholder(componentConfig, error);
            this.canvas.appendChild(errorElement);
            
            throw error;
        }
    }
    
    /**
     * 创建组件容器
     */
    createComponentContainer(componentConfig) {
        const container = document.createElement('div');
        container.className = 'canvas-component';
        container.dataset.componentId = componentConfig.id;
        container.dataset.componentType = componentConfig.type;
        
        // 设置基础样式
        this.setComponentStyle(container, componentConfig);
        
        return container;
    }
    
    /**
     * 设置组件样式
     */
    setComponentStyle(element, config) {
        let x, y, width, height;
        
        if (this.isPublishedMode) {
            // 发布模式：将组件位置和尺寸按比例缩放到窗口尺寸
            const originalCanvasWidth = 1920; // 原始画布宽度
            const originalCanvasHeight = 1080; // 原始画布高度
            const currentCanvasWidth = window.innerWidth;
            const currentCanvasHeight = window.innerHeight;
            
            const scaleX = currentCanvasWidth / originalCanvasWidth;
            const scaleY = currentCanvasHeight / originalCanvasHeight;
            
            x = (config.x || 0) * scaleX;
            y = (config.y || 0) * scaleY;
            width = (config.width || 400) * scaleX;
            height = (config.height || 300) * scaleY;
        } else {
            // 编辑模式：使用原始尺寸
            x = config.x || 0;
            y = config.y || 0;
            width = config.width || 400;
            height = config.height || 300;
        }
        
        Object.assign(element.style, {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            border: this.isPublishedMode ? 'none' : '2px solid transparent',
            cursor: this.isPublishedMode ? 'default' : 'pointer',
            overflow: 'hidden',
            borderRadius: `${config.borderRadius || 4}px`,
            backgroundColor: this.isPublishedMode ? 'transparent' : (config.backgroundColor || 'transparent'),
            borderColor: config.borderColor || '#e0e0e0',
            borderWidth: `${config.borderWidth || 0}px`,
            borderStyle: 'solid',
            opacity: config.opacity || 1,
            zIndex: config.zIndex || 1,
            boxShadow: this.isPublishedMode ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
        });
        
        // 应用自定义CSS
        if (config.customCSS) {
            try {
                const style = document.createElement('style');
                style.textContent = `[data-component-id="${config.id}"] { ${config.customCSS} }`;
                document.head.appendChild(style);
            } catch (error) {
                console.warn('自定义CSS应用失败:', error);
            }
        }
    }
    
    /**
     * 创建错误占位符
     */
    createErrorPlaceholder(componentConfig, error) {
        const container = this.createComponentContainer(componentConfig);
        
        container.innerHTML = `
            <div class="error-placeholder">
                <div class="error-icon">⚠️</div>
                <div class="error-title">组件加载失败</div>
                <div class="error-message">${error.message}</div>
                <div class="error-info">
                    <small>组件ID: ${componentConfig.id}</small><br>
                    <small>组件类型: ${componentConfig.type}</small>
                </div>
            </div>
        `;
        
        container.style.backgroundColor = '#fff2f0';
        container.style.borderColor = '#ff4d4f';
        container.style.color = '#ff4d4f';
        
        return container;
    }
    
    /**
     * 添加组件
     */
    addComponent(componentInfo) {
        this.components.set(componentInfo.id, componentInfo);
        console.log('📌 组件已添加:', componentInfo.id);
    }
    
    /**
     * 移除组件
     */
    removeComponent(componentId) {
        const componentInfo = this.components.get(componentId);
        if (!componentInfo) {
            console.warn('组件不存在:', componentId);
            return;
        }
        
        // 销毁组件实例
        if (componentInfo.instance) {
            const component = window.ComponentRegistry?.getComponent(componentInfo.type);
            if (component && component.dispose) {
                component.dispose(componentInfo.instance);
            }
        }
        
        // 从DOM移除
        if (componentInfo.element && componentInfo.element.parentNode) {
            componentInfo.element.parentNode.removeChild(componentInfo.element);
        }
        
        // 从映射中移除
        this.components.delete(componentId);
        
        console.log('🗑️ 组件已移除:', componentId);
    }
    
    /**
     * 获取组件
     */
    getComponent(componentId) {
        return this.components.get(componentId);
    }
    
    /**
     * 获取所有组件
     */
    getAllComponents() {
        return Array.from(this.components.values());
    }
    
    /**
     * 更新组件配置
     */
    updateComponentConfig(componentId, updates) {
        const componentInfo = this.components.get(componentId);
        if (!componentInfo) {
            console.warn('组件不存在:', componentId);
            return;
        }
        
        // 分离位置尺寸配置和组件属性配置
        const positionUpdates = {};
        const propsUpdates = {};
        
        // 位置尺寸相关的配置
        const positionKeys = ['x', 'y', 'width', 'height', 'backgroundColor', 'borderColor', 'borderWidth', 'borderRadius', 'opacity', 'zIndex'];
        
        for (const [key, value] of Object.entries(updates)) {
            if (positionKeys.includes(key)) {
                positionUpdates[key] = value;
            } else {
                propsUpdates[key] = value;
            }
        }
        
        // 更新位置尺寸配置
        Object.assign(componentInfo.config, positionUpdates);
        
        // 更新组件属性配置
        if (Object.keys(propsUpdates).length > 0) {
            if (!componentInfo.config.props) {
                componentInfo.config.props = {};
            }
            Object.assign(componentInfo.config.props, propsUpdates);
        }
        
        // 更新DOM样式
        if (componentInfo.element) {
            this.setComponentStyle(componentInfo.element, componentInfo.config);
        }
        
        // 如果是ECharts组件，需要重新渲染图表
        if (componentInfo.instance && componentInfo.type !== 'text' && componentInfo.type !== 'image' && componentInfo.type !== 'datetime') {
            this.updateEChartsComponent(componentInfo, propsUpdates);
        }
        
        // 如果是基础组件，需要重新渲染
        if (componentInfo.type === 'text' || componentInfo.type === 'image' || componentInfo.type === 'datetime') {
            this.updateBasicComponent(componentInfo, propsUpdates);
        }
        
        console.log('🔄 组件配置已更新:', componentId, updates);
    }
    
    /**
     * 更新ECharts组件
     */
    updateEChartsComponent(componentInfo, propsUpdates) {
        if (!componentInfo.instance || !componentInfo.element) return;
        
        try {
            const componentDef = window.ComponentRegistry?.getComponent(componentInfo.componentType);
            if (!componentDef) return;
            
            // 合并所有配置：默认配置 + 组件配置 + 更新配置
            const baseProps = componentDef.defaultProps || {};
            const currentProps = componentInfo.config.props || {};
            const mergedProps = { ...baseProps, ...currentProps, ...propsUpdates };
            
            // 确保背景透明
            mergedProps.backgroundColor = 'transparent';
            
            // 销毁旧实例
            if (componentInfo.instance && typeof componentInfo.instance.dispose === 'function') {
                componentInfo.instance.dispose();
            }
            
            // 保持容器的透明背景
            componentInfo.element.style.backgroundColor = 'transparent';
            
            // 清空容器
            componentInfo.element.innerHTML = '';
            
            // 重新渲染组件，传递完整的合并配置
            componentInfo.instance = componentDef.render(componentInfo.element, mergedProps);
            
            // 更新配置信息
            componentInfo.config.props = mergedProps;
            
            console.log('📊 ECharts组件已更新:', componentInfo.id, mergedProps);
            
        } catch (error) {
            console.error('ECharts组件更新失败:', error);
        }
    }
    
    /**
     * 更新基础组件
     */
    updateBasicComponent(componentInfo, propsUpdates) {
        if (!componentInfo.element) return;
        
        try {
            const componentDef = window.ComponentRegistry?.getComponent(componentInfo.componentType);
            if (!componentDef) return;
            
            // 合并新的配置
            const newProps = { ...componentDef.defaultProps, ...componentInfo.config.props };
            
            // 重新渲染组件
            componentInfo.element.innerHTML = '';
            componentInfo.instance = componentDef.render(componentInfo.element, newProps);
            
        } catch (error) {
            console.error('基础组件更新失败:', error);
        }
    }
    
    /**
     * 更新画布配置
     */
    updateCanvasConfig(canvasConfig) {
        Object.assign(this.canvasConfig, canvasConfig);
        this.applyCanvasStyle();
        
        // 触发所有ECharts组件重绘
        this.resizeAllComponents();
        
        console.log('🎨 画布配置已更新');
    }
    
    /**
     * 更新画布尺寸
     */
    updateCanvasSize(width, height) {
        if (width) this.canvasConfig.width = width;
        if (height) this.canvasConfig.height = height;
        
        this.applyCanvasStyle();
        this.resizeAllComponents();
        
        console.log('📏 画布尺寸已更新:', this.canvasConfig.width, 'x', this.canvasConfig.height);
    }
    
    /**
     * 更新画布背景
     */
    updateCanvasBackground(options) {
        if (options.color !== undefined) {
            this.canvasConfig.backgroundColor = options.color;
        }
        if (options.image !== undefined) {
            this.canvasConfig.backgroundImage = options.image;
        }
        
        this.applyCanvasStyle();
        
        console.log('🎨 画布背景已更新');
    }
    
    /**
     * 重新调整所有组件大小
     */
    resizeAllComponents() {
        this.components.forEach((componentInfo) => {
            if (componentInfo.instance && typeof componentInfo.instance.resize === 'function') {
                setTimeout(() => {
                    componentInfo.instance.resize();
                }, 10);
            }
        });
    }
    
    /**
     * 清除画布
     */
    clearCanvas() {
        // 销毁所有组件
        this.components.forEach((componentInfo, componentId) => {
            this.removeComponent(componentId);
        });
        
        // 清空DOM
        this.canvas.innerHTML = '';
        
        // 重置画布背景配置
        this.canvasConfig.backgroundColor = '#f0f0f0';
        this.canvasConfig.backgroundImage = '';
        
        // 重新应用画布样式，清除背景图片
        this.applyCanvasStyle();
        
        console.log('🗑️ 画布已清除，背景已重置');
    }
    
    /**
     * 获取页面配置
     */
    getPageConfig() {
        const components = [];
        
        this.components.forEach((componentInfo) => {
            // 创建干净的组件配置，避免循环引用
            const cleanComponent = {
                id: componentInfo.id,
                type: componentInfo.type,
                x: componentInfo.config.x || 0,
                y: componentInfo.config.y || 0,
                width: componentInfo.config.width || 200,
                height: componentInfo.config.height || 150,
                // 安全地复制props
                props: this.cleanProps(componentInfo.config.props || {}),
                // 其他基础配置项
                backgroundColor: componentInfo.config.backgroundColor,
                borderColor: componentInfo.config.borderColor,
                borderWidth: componentInfo.config.borderWidth,
                borderRadius: componentInfo.config.borderRadius,
                opacity: componentInfo.config.opacity,
                zIndex: componentInfo.config.zIndex,
                animation: componentInfo.config.animation,
                responsive: componentInfo.config.responsive,
                customCSS: componentInfo.config.customCSS,
                refreshInterval: componentInfo.config.refreshInterval
            };
            
            components.push(cleanComponent);
        });
        
        return {
            canvas: { ...this.canvasConfig },
            components: components
        };
    }
    
    /**
     * 清理props对象，避免循环引用
     */
    cleanProps(props) {
        if (!props || typeof props !== 'object') {
            return props;
        }
        
        const cleanedProps = {};
        
        for (const [key, value] of Object.entries(props)) {
            // 跳过可能导致循环引用的属性
            if (typeof value === 'function' || 
                (value && typeof value === 'object' && value.nodeType) ||
                key === 'element' || key === 'instance' || key === 'chart') {
                continue;
            }
            
            // 处理简单值
            if (value === null || value === undefined || 
                typeof value === 'string' || typeof value === 'number' || 
                typeof value === 'boolean') {
                cleanedProps[key] = value;
            }
            // 处理数组
            else if (Array.isArray(value)) {
                try {
                    cleanedProps[key] = JSON.parse(JSON.stringify(value));
                } catch (e) {
                    console.warn(`跳过无法序列化的数组属性: ${key}`);
                }
            }
            // 处理对象
            else if (typeof value === 'object') {
                try {
                    cleanedProps[key] = JSON.parse(JSON.stringify(value));
                } catch (e) {
                    console.warn(`跳过无法序列化的对象属性: ${key}`);
                }
            }
        }
        
        return cleanedProps;
    }
    
    /**
     * 导出页面为图片
     */
    async exportAsImage(format = 'png') {
        try {
            // 使用html2canvas库导出画布为图片
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas库未加载');
            }
            
            const canvas = await html2canvas(this.canvas, {
                backgroundColor: this.canvasConfig.backgroundColor,
                width: this.canvasConfig.width,
                height: this.canvasConfig.height,
                scale: 1
            });
            
            // 转换为blob
            return new Promise((resolve) => {
                canvas.toBlob(resolve, `image/${format}`);
            });
            
        } catch (error) {
            console.error('导出图片失败:', error);
            throw error;
        }
    }
    
    /**
     * 启用实时数据刷新
     */
    enableRealTimeRefresh() {
        this.components.forEach((componentInfo) => {
            const refreshInterval = componentInfo.config.refreshInterval;
            if (refreshInterval && refreshInterval > 0) {
                this.startComponentRefresh(componentInfo, refreshInterval * 1000);
            }
        });
        
        console.log('🔄 实时数据刷新已启用');
    }
    
    /**
     * 启动组件数据刷新
     */
    startComponentRefresh(componentInfo, interval) {
        // 清除之前的定时器
        if (componentInfo.refreshTimer) {
            clearInterval(componentInfo.refreshTimer);
        }
        
        // 设置新的定时器
        componentInfo.refreshTimer = setInterval(async () => {
            try {
                const response = await fetch(`/api/components/${componentInfo.id}/data`);
                const data = await response.json();
                
                // 更新组件数据
                const component = window.ComponentRegistry?.getComponent(componentInfo.type);
                if (component && component.updateData) {
                    component.updateData(componentInfo.instance, data);
                }
                
            } catch (error) {
                console.error('组件数据刷新失败:', componentInfo.id, error);
            }
        }, interval);
    }
    
    /**
     * 禁用实时数据刷新
     */
    disableRealTimeRefresh() {
        this.components.forEach((componentInfo) => {
            if (componentInfo.refreshTimer) {
                clearInterval(componentInfo.refreshTimer);
                componentInfo.refreshTimer = null;
            }
        });
        
        console.log('⏸️ 实时数据刷新已禁用');
    }
    
    /**
     * 重新缩放所有组件（发布模式）
     */
    rescaleComponents() {
        if (!this.isPublishedMode) return;
        
        console.log('🔄 重新缩放组件以适应窗口尺寸');
        
        this.components.forEach((componentInfo) => {
            this.setComponentStyle(componentInfo.element, componentInfo.config);
            
            // 如果是ECharts组件，需要重新调整图表大小
            if (componentInfo.instance && typeof componentInfo.instance.resize === 'function') {
                setTimeout(() => {
                    componentInfo.instance.resize();
                }, 100);
            }
        });
    }
    
    /**
     * 获取画布统计信息
     */
    getCanvasStats() {
        const stats = {
            canvasSize: `${this.canvasConfig.width} × ${this.canvasConfig.height}`,
            componentCount: this.components.size,
            componentTypes: {},
            totalDataSources: 0
        };
        
        this.components.forEach((componentInfo) => {
            const type = componentInfo.type;
            stats.componentTypes[type] = (stats.componentTypes[type] || 0) + 1;
            
            if (componentInfo.config.refreshInterval > 0) {
                stats.totalDataSources++;
            }
        });
        
        return stats;
    }
}

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasRenderer;
}
