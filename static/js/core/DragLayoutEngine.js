/**
 * 拖拽布局引擎
 * 按照需求文档11.4章节设计，提供可视化拖拽编辑功能
 */

class DragLayoutEngine {
    constructor(canvasElement, componentRegistry) {
        this.canvas = canvasElement;
        this.componentRegistry = componentRegistry;
        this.isDragging = false;
        this.draggedComponent = null;
        this.dragOffset = { x: 0, y: 0 };
        this.gridSize = 10; // 网格大小
        this.isGridEnabled = true; // 是否启用网格对齐
        this.selectedComponent = null;
        this.resizeHandles = [];
        
        console.log('🎯 DragLayoutEngine 初始化');
        this.init();
    }
    
    /**
     * 初始化拖拽引擎
     */
    init() {
        this.setupCanvasEvents();
        this.setupComponentLibraryEvents();
        this.setupResizeHandles();
        this.setupKeyboardEvents();
    }
    
    /**
     * 设置画布事件
     */
    setupCanvasEvents() {
        // 画布拖拽接收
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            this.canvas.classList.add('drag-over');
        });
        
        this.canvas.addEventListener('dragleave', (e) => {
            if (!this.canvas.contains(e.relatedTarget)) {
                this.canvas.classList.remove('drag-over');
            }
        });
        
        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            this.canvas.classList.remove('drag-over');
            this.handleCanvasDrop(e);
        });
        
        // 组件选择
        this.canvas.addEventListener('click', (e) => {
            const componentElement = e.target.closest('.canvas-component');
            if (componentElement) {
                e.stopPropagation();
                this.selectComponent(componentElement);
            } else {
                this.deselectComponent();
            }
        });
        
        // 组件拖拽移动
        this.setupComponentDragMove();
    }
    
    /**
     * 设置组件库拖拽事件
     */
    setupComponentLibraryEvents() {
        // 使用事件委托处理组件库拖拽
        document.addEventListener('dragstart', (e) => {
            const componentItem = e.target.closest('.component-item');
            if (componentItem && componentItem.dataset.componentId) {
                const componentId = componentItem.dataset.componentId;
                e.dataTransfer.setData('text/plain', componentId);
                e.dataTransfer.effectAllowed = 'copy';
                componentItem.classList.add('dragging');
                
                console.log('🎯 开始拖拽组件:', componentId);
            }
        });
        
        document.addEventListener('dragend', (e) => {
            const componentItem = e.target.closest('.component-item');
            if (componentItem) {
                componentItem.classList.remove('dragging');
            }
        });
    }
    
    /**
     * 处理画布拖拽放置
     */
    handleCanvasDrop(e) {
        const componentId = e.dataTransfer.getData('text/plain');
        if (!componentId) {
            console.warn('未获取到组件ID');
            return;
        }
        
        console.log('📍 放置组件:', componentId);
        
        // 获取组件定义
        const component = this.componentRegistry.getComponent(componentId);
        if (!component) {
            console.error('组件未找到:', componentId);
            return;
        }
        
        // 计算放置位置
        const canvasRect = this.canvas.getBoundingClientRect();
        let x = e.clientX - canvasRect.left;
        let y = e.clientY - canvasRect.top;
        
        // 网格对齐
        if (this.isGridEnabled) {
            x = this.snapToGrid(x);
            y = this.snapToGrid(y);
        }
        
        // 创建组件实例
        this.createComponentInstance(component, x, y);
    }
    
    /**
     * 创建组件实例
     */
    createComponentInstance(component, x, y) {
        const instanceId = `${component.id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        
        // 默认尺寸
        const defaultWidth = this.getDefaultWidth(component.type);
        const defaultHeight = this.getDefaultHeight(component.type);
        
        // 创建组件容器
        const componentElement = document.createElement('div');
        componentElement.className = 'canvas-component';
        componentElement.dataset.componentId = instanceId;
        componentElement.dataset.componentType = component.id;
        
        // 设置样式
        this.setComponentStyle(componentElement, {
            x: x,
            y: y,
            width: defaultWidth,
            height: defaultHeight
        });
        
        // 渲染组件内容
        try {
            const componentInstance = component.render(componentElement, component.defaultProps);
            
        // 保存组件信息到全局状态
        if (window.CanvasRenderer) {
            window.CanvasRenderer.addComponent({
                id: instanceId,
                type: component.id,
                element: componentElement,
                instance: componentInstance,
                config: {
                    x: x,
                    y: y,
                    width: defaultWidth,
                    height: defaultHeight,
                    props: { ...component.defaultProps },
                    apiEndpoint: `/api/components/${instanceId}/data` // 自动添加API端点
                }
            });
        }
            
            // 添加到画布
            this.canvas.appendChild(componentElement);
            
            // 添加缩放控制点
            this.addResizeHandles(componentElement);
            
            // 选中新创建的组件
            this.selectComponent(componentElement);
            
            console.log('✅ 组件创建成功:', instanceId);
            
        } catch (error) {
            console.error('❌ 组件渲染失败:', error);
            componentElement.innerHTML = `
                <div class="error-placeholder">
                    <div class="error-icon">⚠️</div>
                    <div class="error-message">组件加载失败</div>
                    <div class="error-detail">${error.message}</div>
                </div>
            `;
        }
    }
    
    /**
     * 设置组件拖拽移动
     */
    setupComponentDragMove() {
        let draggedElement = null;
        let dragStartPos = { x: 0, y: 0 };
        let elementStartPos = { x: 0, y: 0 };
        
        this.canvas.addEventListener('mousedown', (e) => {
            const componentElement = e.target.closest('.canvas-component');
            if (!componentElement || e.target.classList.contains('resize-handle')) {
                return;
            }
            
            e.preventDefault();
            draggedElement = componentElement;
            
            dragStartPos.x = e.clientX;
            dragStartPos.y = e.clientY;
            
            const style = window.getComputedStyle(componentElement);
            elementStartPos.x = parseInt(style.left);
            elementStartPos.y = parseInt(style.top);
            
            componentElement.classList.add('dragging');
            document.body.style.cursor = 'move';
            
            console.log('🎯 开始拖拽移动组件');
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!draggedElement) return;
            
            const deltaX = e.clientX - dragStartPos.x;
            const deltaY = e.clientY - dragStartPos.y;
            
            let newX = elementStartPos.x + deltaX;
            let newY = elementStartPos.y + deltaY;
            
            // 边界检查
            newX = Math.max(0, newX);
            newY = Math.max(0, newY);
            
            // 网格对齐
            if (this.isGridEnabled) {
                newX = this.snapToGrid(newX);
                newY = this.snapToGrid(newY);
            }
            
            // 更新位置
            draggedElement.style.left = newX + 'px';
            draggedElement.style.top = newY + 'px';
            
            // 更新配置
            this.updateComponentConfig(draggedElement, { x: newX, y: newY });
        });
        
        document.addEventListener('mouseup', () => {
            if (draggedElement) {
                draggedElement.classList.remove('dragging');
                document.body.style.cursor = '';
                draggedElement = null;
                console.log('✅ 组件移动完成');
            }
        });
    }
    
    /**
     * 设置缩放控制点
     */
    setupResizeHandles() {
        const handles = [
            { class: 'nw-resize', position: 'nw', cursor: 'nw-resize' },
            { class: 'n-resize', position: 'n', cursor: 'n-resize' },
            { class: 'ne-resize', position: 'ne', cursor: 'ne-resize' },
            { class: 'w-resize', position: 'w', cursor: 'w-resize' },
            { class: 'e-resize', position: 'e', cursor: 'e-resize' },
            { class: 'sw-resize', position: 'sw', cursor: 'sw-resize' },
            { class: 's-resize', position: 's', cursor: 's-resize' },
            { class: 'se-resize', position: 'se', cursor: 'se-resize' }
        ];
        
        handles.forEach(handleConfig => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${handleConfig.class}`;
            handle.dataset.position = handleConfig.position;
            handle.style.cursor = handleConfig.cursor;
            this.resizeHandles.push(handle);
        });
        
        this.setupResizeEvents();
    }
    
    /**
     * 设置缩放事件
     */
    setupResizeEvents() {
        let isResizing = false;
        let resizeData = null;
        
        document.addEventListener('mousedown', (e) => {
            if (!e.target.classList.contains('resize-handle')) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const handle = e.target;
            const componentElement = handle.closest('.canvas-component');
            if (!componentElement) return;
            
            isResizing = true;
            
            const style = window.getComputedStyle(componentElement);
            resizeData = {
                element: componentElement,
                position: handle.dataset.position,
                startX: e.clientX,
                startY: e.clientY,
                startWidth: parseInt(style.width),
                startHeight: parseInt(style.height),
                startLeft: parseInt(style.left),
                startTop: parseInt(style.top)
            };
            
            document.body.style.cursor = handle.style.cursor;
            console.log('🔄 开始缩放组件');
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing || !resizeData) return;
            
            const deltaX = e.clientX - resizeData.startX;
            const deltaY = e.clientY - resizeData.startY;
            
            const result = this.calculateResize(resizeData, deltaX, deltaY);
            
            // 应用新尺寸和位置
            this.setComponentStyle(resizeData.element, result);
            
            // 更新配置
            this.updateComponentConfig(resizeData.element, result);
            
            // 如果是ECharts组件，触发重绘
            this.resizeComponentInstance(resizeData.element);
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
                resizeData = null;
                console.log('✅ 组件缩放完成');
            }
        });
    }
    
    /**
     * 计算缩放结果
     */
    calculateResize(resizeData, deltaX, deltaY) {
        const { position, startWidth, startHeight, startLeft, startTop } = resizeData;
        const minSize = 50; // 最小尺寸
        
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;
        
        // 根据拖拽方向计算新尺寸
        if (position.includes('e')) {
            newWidth = Math.max(minSize, startWidth + deltaX);
        }
        if (position.includes('w')) {
            newWidth = Math.max(minSize, startWidth - deltaX);
            newLeft = startLeft + (startWidth - newWidth);
        }
        if (position.includes('s')) {
            newHeight = Math.max(minSize, startHeight + deltaY);
        }
        if (position.includes('n')) {
            newHeight = Math.max(minSize, startHeight - deltaY);
            newTop = startTop + (startHeight - newHeight);
        }
        
        // 网格对齐
        if (this.isGridEnabled) {
            newWidth = this.snapToGrid(newWidth);
            newHeight = this.snapToGrid(newHeight);
            newLeft = this.snapToGrid(newLeft);
            newTop = this.snapToGrid(newTop);
        }
        
        return {
            width: newWidth,
            height: newHeight,
            x: newLeft,
            y: newTop
        };
    }
    
    /**
     * 添加缩放控制点到组件
     */
    addResizeHandles(componentElement) {
        this.resizeHandles.forEach(handle => {
            const handleClone = handle.cloneNode(true);
            componentElement.appendChild(handleClone);
        });
    }
    
    /**
     * 移除缩放控制点
     */
    removeResizeHandles(componentElement) {
        const handles = componentElement.querySelectorAll('.resize-handle');
        handles.forEach(handle => handle.remove());
    }
    
    /**
     * 选中组件
     */
    selectComponent(componentElement) {
        // 清除之前的选择
        this.deselectComponent();
        
        // 选择新组件
        componentElement.classList.add('selected');
        this.selectedComponent = componentElement;
        
        // 添加缩放手柄
        this.addResizeHandles(componentElement);
        
        console.log('🎯 选中组件:', componentElement.dataset.componentId);
        
        // 触发选择事件
        const event = new CustomEvent('componentSelected', {
            detail: {
                componentId: componentElement.dataset.componentId,
                componentType: componentElement.dataset.componentType,
                element: componentElement
            }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * 取消选择组件
     */
    deselectComponent() {
        if (this.selectedComponent) {
            this.selectedComponent.classList.remove('selected');
            
            // 移除缩放手柄
            this.removeResizeHandles(this.selectedComponent);
            
            this.selectedComponent = null;
            
            // 触发取消选择事件
            const event = new CustomEvent('componentDeselected');
            document.dispatchEvent(event);
        }
    }
    
    /**
     * 设置键盘事件
     */
    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            // Delete键删除选中组件
            if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedComponent) {
                e.preventDefault();
                this.deleteSelectedComponent();
            }
            
            // 方向键移动组件
            if (this.selectedComponent && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.moveComponentWithKeyboard(e.key, e.shiftKey);
            }
        });
    }
    
    /**
     * 删除选中的组件
     */
    deleteSelectedComponent() {
        if (!this.selectedComponent) return;
        
        const componentId = this.selectedComponent.dataset.componentId;
        
        // 从画布移除
        this.selectedComponent.remove();
        
        // 从全局状态移除
        if (window.CanvasRenderer) {
            window.CanvasRenderer.removeComponent(componentId);
        }
        
        // 清除选择状态
        this.selectedComponent = null;
        
        // 触发删除事件
        const event = new CustomEvent('componentDeleted', {
            detail: { componentId }
        });
        document.dispatchEvent(event);
        
        console.log('🗑️ 组件已删除:', componentId);
    }
    
    /**
     * 键盘移动组件
     */
    moveComponentWithKeyboard(key, shiftKey) {
        if (!this.selectedComponent) return;
        
        const step = shiftKey ? this.gridSize : 1; // Shift键加速移动
        const style = window.getComputedStyle(this.selectedComponent);
        let x = parseInt(style.left);
        let y = parseInt(style.top);
        
        switch (key) {
            case 'ArrowUp':
                y = Math.max(0, y - step);
                break;
            case 'ArrowDown':
                y += step;
                break;
            case 'ArrowLeft':
                x = Math.max(0, x - step);
                break;
            case 'ArrowRight':
                x += step;
                break;
        }
        
        // 网格对齐
        if (this.isGridEnabled) {
            x = this.snapToGrid(x);
            y = this.snapToGrid(y);
        }
        
        // 更新位置
        this.selectedComponent.style.left = x + 'px';
        this.selectedComponent.style.top = y + 'px';
        
        // 更新配置
        this.updateComponentConfig(this.selectedComponent, { x, y });
    }
    
    /**
     * 网格对齐
     */
    snapToGrid(value) {
        return Math.round(value / this.gridSize) * this.gridSize;
    }
    
    /**
     * 设置组件样式
     */
    setComponentStyle(element, config) {
        element.style.position = 'absolute';
        element.style.left = config.x + 'px';
        element.style.top = config.y + 'px';
        element.style.width = config.width + 'px';
        element.style.height = config.height + 'px';
        element.style.border = '2px solid transparent';
        element.style.cursor = 'pointer';
        element.style.overflow = 'hidden';
    }
    
    /**
     * 更新组件配置
     */
    updateComponentConfig(element, updates) {
        if (window.CanvasRenderer) {
            const componentId = element.dataset.componentId;
            window.CanvasRenderer.updateComponentConfig(componentId, updates);
        }
    }
    
    /**
     * 重新调整组件实例大小
     */
    resizeComponentInstance(element) {
        if (window.CanvasRenderer) {
            const componentId = element.dataset.componentId;
            const componentInfo = window.CanvasRenderer.getComponent(componentId);
            
            if (componentInfo && componentInfo.instance) {
                // 延迟执行以确保DOM更新完成
                setTimeout(() => {
                    if (typeof componentInfo.instance.resize === 'function') {
                        componentInfo.instance.resize();
                    }
                }, 10);
            }
        }
    }
    
    /**
     * 获取默认宽度
     */
    getDefaultWidth(componentType) {
        const defaultSizes = {
            'text': 200,
            'image': 300,
            'datetime': 200,
            'default': 400
        };
        
        return defaultSizes[componentType] || defaultSizes.default;
    }
    
    /**
     * 获取默认高度
     */
    getDefaultHeight(componentType) {
        const defaultSizes = {
            'text': 80,
            'image': 200,
            'datetime': 60,
            'gauge': 300,
            'default': 300
        };
        
        return defaultSizes[componentType] || defaultSizes.default;
    }
    
    /**
     * 启用/禁用网格对齐
     */
    setGridEnabled(enabled) {
        this.isGridEnabled = enabled;
        console.log('🔲 网格对齐:', enabled ? '启用' : '禁用');
    }
    
    /**
     * 设置网格大小
     */
    setGridSize(size) {
        this.gridSize = Math.max(1, size);
        console.log('📏 网格大小:', this.gridSize);
    }
    
    /**
     * 清除所有组件
     */
    clearCanvas() {
        const components = this.canvas.querySelectorAll('.canvas-component');
        components.forEach(component => {
            const componentId = component.dataset.componentId;
            
            // 从全局状态移除
            if (window.CanvasRenderer) {
                window.CanvasRenderer.removeComponent(componentId);
            }
            
            // 从DOM移除
            component.remove();
        });
        
        // 清除选择状态
        this.selectedComponent = null;
        
        console.log('🗑️ 画布已清除');
    }
    
    /**
     * 重新初始化拖拽引擎
     */
    reinitialize() {
        console.log('🔄 重新初始化拖拽引擎');
        
        // 清除现有的选择状态
        this.deselectComponent();
        
        // 重新设置所有组件的事件
        const components = this.canvas.querySelectorAll('.canvas-component');
        components.forEach(component => {
            this.addComponent(component);
        });
        
        console.log('✅ 拖拽引擎重新初始化完成');
    }
    
    /**
     * 为组件添加拖拽和缩放功能
     */
    addComponent(componentElement) {
        if (!componentElement) return;
        
        // 确保组件可以被选中和拖拽
        componentElement.style.cursor = 'move';
        
        // 添加点击选中功能
        componentElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const componentId = componentElement.dataset.componentId;
            
            // 选中组件
            this.selectComponent(componentElement);
            
            // 通知配置管理器
            if (window.CanvasRenderer) {
                window.CanvasRenderer.selectComponent(componentId);
            }
        });
        
        console.log('🎯 组件拖拽功能已添加:', componentElement.dataset.componentId);
    }
}

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DragLayoutEngine;
}
