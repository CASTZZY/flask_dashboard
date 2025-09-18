/**
 * Dashboard 编辑器主文件
 * 整合所有核心模块，提供完整的编辑器功能
 */

class DashboardEditor {
    constructor() {
        this.pageId = this.getPageIdFromUrl();
        this.pageConfig = null;
        this.isDirty = false; // 是否有未保存的更改
        
        // 核心模块
        this.componentRegistry = null;
        this.canvasRenderer = null;
        this.dragLayoutEngine = null;
        this.configManager = null;
        
        console.log('🚀 DashboardEditor 初始化');
        this.init();
    }
    
    /**
     * 初始化编辑器
     */
    async init() {
        try {
            // 等待DOM加载完成
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // 初始化核心模块
            await this.initCoreModules();
            
            // 初始化UI
            this.initUI();
            
            // 加载页面数据
            if (this.pageId) {
                await this.loadPage(this.pageId);
            } else {
                this.createNewPage();
            }
            
            // 绑定事件
            this.bindEvents();
            
            console.log('✅ DashboardEditor 初始化完成');
            this.showMessage('编辑器加载完成', 'success');
            
        } catch (error) {
            console.error('❌ DashboardEditor 初始化失败:', error);
            this.showMessage('编辑器初始化失败: ' + error.message, 'error');
        }
    }
    
    /**
     * 初始化核心模块
     */
    async initCoreModules() {
        // 组件注册中心
        this.componentRegistry = window.ComponentRegistry;
        if (!this.componentRegistry) {
            throw new Error('ComponentRegistry 未加载');
        }
        
        // 画布渲染引擎
        const canvasElement = document.getElementById('canvas');
        if (!canvasElement) {
            throw new Error('画布元素未找到');
        }
        this.canvasRenderer = new CanvasRenderer(canvasElement);
        window.CanvasRenderer = this.canvasRenderer; // 设置全局引用
        
        // 拖拽布局引擎
        this.dragLayoutEngine = new DragLayoutEngine(canvasElement, this.componentRegistry);
        window.DragLayoutEngine = this.dragLayoutEngine; // 设置全局引用
        
        // 配置管理器
        this.configManager = window.ConfigManager;
        if (!this.configManager) {
            throw new Error('ConfigManager 未加载');
        }
        
        console.log('🔧 核心模块初始化完成');
    }
    
    /**
     * 初始化UI
     */
    initUI() {
        // 初始化组件库
        this.initComponentLibrary();
        
        // 初始化工具栏
        this.initToolbar();
        
        // 初始化状态栏
        this.initStatusBar();
        
        console.log('🎨 UI初始化完成');
    }
    
    /**
     * 初始化组件库
     */
    initComponentLibrary() {
        const componentLibrary = document.getElementById('component-library');
        if (!componentLibrary) {
            console.warn('组件库容器未找到');
            return;
        }
        
        // 清空现有内容
        componentLibrary.innerHTML = '';
        
        // 按分类组织组件
        const categories = this.componentRegistry.getCategories();
        
        categories.forEach(category => {
            // 创建分类标题
            const categorySection = document.createElement('div');
            categorySection.className = 'component-category';
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            
            // 添加折叠功能
            categoryTitle.addEventListener('click', () => {
                categorySection.classList.toggle('collapsed');
                categoryTitle.classList.toggle('collapsed');
            });
            
            categorySection.appendChild(categoryTitle);
            
            // 创建组件网格
            const componentGrid = document.createElement('div');
            componentGrid.className = 'component-grid';
            
            // 获取该分类下的组件
            const components = this.componentRegistry.getComponentsByCategory(category);
            components.forEach(component => {
                const componentItem = this.createComponentItem(component);
                componentGrid.appendChild(componentItem);
            });
            
            categorySection.appendChild(componentGrid);
            componentLibrary.appendChild(categorySection);
        });
        
        console.log('📚 组件库初始化完成');
    }
    
    /**
     * 创建组件项
     */
    createComponentItem(component) {
        const item = document.createElement('div');
        item.className = 'component-item';
        item.draggable = true;
        item.dataset.componentId = component.id;
        item.title = `${component.name}\n${component.category}`;
        
        item.innerHTML = `
            <div class="component-icon">${component.icon}</div>
            <div class="component-name">${component.name}</div>
        `;
        
        return item;
    }
    
    /**
     * 初始化工具栏
     */
    initToolbar() {
        const toolbar = document.getElementById('toolbar');
        if (!toolbar) {
            console.warn('工具栏容器未找到');
            return;
        }
        
        // 添加工具栏按钮事件
        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePage());
        }
        
        const previewBtn = document.getElementById('preview-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => this.previewPage());
        }
        
        const clearBtn = document.getElementById('clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCanvas());
        }
        
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportPage());
        }
        
        // 主题切换器
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.addEventListener('change', (e) => {
                this.changeTheme(e.target.value);
            });
        }
        
        console.log('🔧 工具栏初始化完成');
    }
    
    /**
     * 初始化状态栏
     */
    initStatusBar() {
        const statusBar = document.getElementById('status-bar');
        if (!statusBar) {
            console.warn('状态栏容器未找到');
            return;
        }
        
        // 更新状态信息
        this.updateStatusBar();
        
        console.log('📊 状态栏初始化完成');
    }
    
    /**
     * 更新状态栏
     */
    updateStatusBar() {
        const stats = this.canvasRenderer ? this.canvasRenderer.getCanvasStats() : {
            canvasSize: '1920 × 1080',
            componentCount: 0
        };
        
        const canvasSizeEl = document.getElementById('canvas-size');
        if (canvasSizeEl) {
            canvasSizeEl.textContent = stats.canvasSize;
        }
        
        const componentCountEl = document.getElementById('component-count');
        if (componentCountEl) {
            componentCountEl.textContent = `组件: ${stats.componentCount}`;
        }
        
        const saveStatusEl = document.getElementById('save-status');
        if (saveStatusEl) {
            saveStatusEl.textContent = this.isDirty ? '未保存' : '已保存';
            saveStatusEl.className = this.isDirty ? 'status-dirty' : 'status-clean';
        }
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 监听页面离开事件
        window.addEventListener('beforeunload', (e) => {
            if (this.isDirty) {
                e.preventDefault();
                e.returnValue = '您有未保存的更改，确定要离开吗？';
            }
        });
        
        // 监听键盘快捷键
        document.addEventListener('keydown', (e) => {
            // Ctrl+S 保存
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.savePage();
            }
            
            // Ctrl+Z 撤销
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                console.log('撤销操作 - 功能待实现');
            }
            
            // Ctrl+Y 重做
            if (e.ctrlKey && e.key === 'y') {
                e.preventDefault();
                console.log('重做操作 - 功能待实现');
            }
        });
        
        // 监听组件变更事件
        document.addEventListener('componentConfigUpdated', () => {
            this.markDirty();
        });
        
        document.addEventListener('componentDeleted', () => {
            this.markDirty();
        });
        
        console.log('⚡ 事件绑定完成');
    }
    
    /**
     * 创建新页面
     */
    createNewPage() {
        this.pageConfig = {
            id: `page_${Date.now()}`,
            name: '新建页面',
            description: '',
            canvas: {
                width: 1920,
                height: 1080,
                backgroundColor: '#f0f0f0',
                backgroundImage: ''
            },
            components: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            published: false
        };
        
        // 更新页面标题
        document.title = `编辑器 - ${this.pageConfig.name}`;
        
        console.log('📄 新页面已创建:', this.pageConfig.id);
    }
    
    /**
     * 加载页面
     */
    async loadPage(pageId) {
        try {
            console.log('📖 加载页面:', pageId);
            
            const response = await fetch(`/api/pages/${pageId}`);
            if (!response.ok) {
                throw new Error(`页面加载失败: ${response.status}`);
            }
            
            this.pageConfig = await response.json();
            
            // 渲染页面
            await this.canvasRenderer.renderPage(this.pageConfig);
            
            // 更新页面标题
            document.title = `编辑器 - ${this.pageConfig.name}`;
            
            // 清除脏标记
            this.isDirty = false;
            this.updateStatusBar();
            
            console.log('✅ 页面加载完成:', this.pageConfig.name);
            
        } catch (error) {
            console.error('❌ 页面加载失败:', error);
            this.showMessage('页面加载失败: ' + error.message, 'error');
            
            // 创建新页面作为备选
            this.createNewPage();
        }
    }
    
    /**
     * 保存页面
     */
    async savePage() {
        try {
            console.log('💾 保存页面:', this.pageConfig.id);
            
            // 获取当前页面配置
            const currentConfig = this.canvasRenderer.getPageConfig();
            
            // 更新页面配置
            this.pageConfig.canvas = currentConfig.canvas;
            this.pageConfig.components = currentConfig.components;
            this.pageConfig.updatedAt = new Date().toISOString();
            
            // 发送保存请求
            const method = this.pageId ? 'PUT' : 'POST';
            const url = this.pageId ? `/api/pages/${this.pageId}` : '/api/pages';
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.pageConfig)
            });
            
            if (!response.ok) {
                throw new Error(`保存失败: ${response.status}`);
            }
            
            const savedPage = await response.json();
            
            // 更新页面ID（新建页面时）
            if (!this.pageId) {
                this.pageId = savedPage.id;
                this.pageConfig.id = savedPage.id;
                
                // 更新URL
                const newUrl = `/editor/${this.pageId}`;
                window.history.replaceState(null, '', newUrl);
            }
            
            // 清除脏标记
            this.isDirty = false;
            this.updateStatusBar();
            
            console.log('✅ 页面保存成功');
            this.showMessage('页面保存成功', 'success');
            
        } catch (error) {
            console.error('❌ 页面保存失败:', error);
            this.showMessage('页面保存失败: ' + error.message, 'error');
        }
    }
    
    /**
     * 预览页面
     */
    previewPage() {
        if (!this.pageId) {
            this.showMessage('请先保存页面再预览', 'warning');
            return;
        }
        
        // 在新窗口打开预览页面
        const previewUrl = `/published/${this.pageId}`;
        window.open(previewUrl, '_blank');
        
        console.log('👁️ 打开预览页面:', previewUrl);
    }
    
    /**
     * 清除画布
     */
    clearCanvas() {
        if (confirm('确定要清除画布上的所有组件吗？此操作不可撤销。')) {
            this.canvasRenderer.clearCanvas();
            this.markDirty();
            this.updateStatusBar();
            
            console.log('🗑️ 画布已清除');
            this.showMessage('画布已清除', 'info');
        }
    }
    
    /**
     * 导出页面
     */
    async exportPage() {
        try {
            console.log('📤 导出页面');
            
            // 导出为图片
            const blob = await this.canvasRenderer.exportAsImage('png');
            
            // 下载图片
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dashboard-${this.pageConfig.name}-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showMessage('页面已导出为图片', 'success');
            
        } catch (error) {
            console.error('❌ 页面导出失败:', error);
            this.showMessage('页面导出失败: ' + error.message, 'error');
        }
    }
    
    /**
     * 标记为已修改
     */
    markDirty() {
        if (!this.isDirty) {
            this.isDirty = true;
            this.updateStatusBar();
        }
    }
    
    /**
     * 获取页面ID从URL
     */
    getPageIdFromUrl() {
        const path = window.location.pathname;
        const match = path.match(/\/editor\/(.+)/);
        return match ? match[1] : null;
    }
    
    /**
     * 显示消息
     */
    showMessage(text, type = 'info') {
        const colors = {
            success: '#52c41a',
            error: '#ff4d4f',
            warning: '#faad14',
            info: '#1890ff'
        };
        
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${colors[type]};
            color: white;
            border-radius: 6px;
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
        `;
        message.textContent = text;
        
        document.body.appendChild(message);
        
        // 自动消失
        setTimeout(() => {
            if (message.parentElement) {
                message.style.transition = 'all 0.3s ease';
                message.style.opacity = '0';
                message.style.transform = 'translateX(100%)';
                setTimeout(() => message.remove(), 300);
            }
        }, 3000);
    }
    
    /**
     * 获取编辑器状态
     */
    getEditorState() {
        return {
            pageId: this.pageId,
            pageConfig: this.pageConfig,
            isDirty: this.isDirty,
            componentCount: this.canvasRenderer ? this.canvasRenderer.getAllComponents().length : 0
        };
    }
    
    /**
     * 启用自动保存
     */
    enableAutoSave(interval = 30000) {
        this.autoSaveTimer = setInterval(() => {
            if (this.isDirty && this.pageId) {
                console.log('🔄 自动保存...');
                this.savePage();
            }
        }, interval);
        
        console.log('⏰ 自动保存已启用，间隔:', interval / 1000, '秒');
    }
    
    /**
     * 禁用自动保存
     */
    disableAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
            console.log('⏸️ 自动保存已禁用');
        }
    }
    
    /**
     * 切换图表主题
     */
    changeTheme(themeName) {
        console.log('🎨 切换主题:', themeName);
        
        if (!this.canvasRenderer) {
            console.warn('画布渲染器未初始化');
            return;
        }
        
        // 获取所有ECharts组件
        const components = this.canvasRenderer.getAllComponents();
        const echartsComponents = components.filter(comp => 
            comp.instance && typeof comp.instance.setOption === 'function'
        );
        
        if (echartsComponents.length === 0) {
            console.log('没有找到ECharts组件');
            return;
        }
        
        // 为每个ECharts组件应用新主题
        echartsComponents.forEach(componentInfo => {
            this.applyThemeToComponent(componentInfo, themeName);
        });
        
        // 保存当前主题到页面配置
        if (this.pageConfig) {
            this.pageConfig.theme = themeName;
        }
        
        this.showMessage(`主题已切换为: ${themeName}`, 'success');
    }
    
    /**
     * 应用主题到单个组件
     */
    applyThemeToComponent(componentInfo, themeName) {
        try {
            console.log('🎨 开始应用主题到组件:', componentInfo.id, themeName);
            
            // 销毁旧实例
            if (componentInfo.instance && typeof componentInfo.instance.dispose === 'function') {
                componentInfo.instance.dispose();
                componentInfo.instance = null;
            }
            
            // 清空容器
            componentInfo.element.innerHTML = '';
            
            // 获取组件定义
            const componentDef = window.ComponentRegistry?.getComponent(componentInfo.type);
            if (!componentDef) {
                console.warn('组件定义不存在:', componentInfo.type);
                return;
            }
            
            // 更新配置中的主题
            const currentProps = componentInfo.config.props || {};
            const newProps = {
                ...currentProps,
                theme: themeName === 'default' ? undefined : themeName
            };
            
            console.log('🔧 新配置属性:', newProps);
            console.log('🎨 当前主题:', themeName);
            
            // 重新渲染组件
            componentInfo.instance = componentDef.render(componentInfo.element, newProps);
            
            // 更新配置
            componentInfo.config.props = newProps;
            
            // 等待渲染完成后，强制重新应用配置以确保主题完全生效
            setTimeout(() => {
                if (componentInfo.instance && typeof componentInfo.instance.setOption === 'function') {
                    // 获取当前配置
                    const currentConfig = componentInfo.instance.getOption();
                    console.log('🔧 当前配置:', currentConfig);
                    
                    // 强制重新应用配置，确保主题完全生效
                    componentInfo.instance.setOption(currentConfig, true, true);
                    componentInfo.instance.resize();
                    
                    // 再次确保主题生效
                    setTimeout(() => {
                        if (componentInfo.instance && typeof componentInfo.instance.setOption === 'function') {
                            componentInfo.instance.setOption(currentConfig, true, true);
                            componentInfo.instance.resize();
                            console.log('✅ 组件主题应用完成:', componentInfo.id, themeName);
                        }
                    }, 50);
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ 组件主题应用失败:', componentInfo.id, error);
        }
    }
    
    /**
     * 通过API更新组件数据
     */
    updateComponentData(componentId, apiData) {
        try {
            console.log('🔄 通过API更新组件数据:', componentId, apiData);
            
            // 查找组件
            const componentInfo = this.canvasRenderer.components.get(componentId);
            if (!componentInfo) {
                console.warn('组件未找到:', componentId);
                return false;
            }
            
            // 更新组件配置
            componentInfo.config.props = {
                ...componentInfo.config.props,
                ...apiData
            };
            
            // 重新渲染组件
            if (componentInfo.instance && typeof componentInfo.instance.setOption === 'function') {
                componentInfo.instance.setOption(apiData, true, true);
                componentInfo.instance.resize();
                console.log('✅ 组件数据更新成功:', componentId);
                return true;
            } else {
                console.warn('组件实例无效，无法更新:', componentId);
                return false;
            }
            
        } catch (error) {
            console.error('更新组件数据失败:', error);
            return false;
        }
    }
    
    /**
     * 批量更新多个组件数据
     */
    updateMultipleComponents(updates) {
        const results = {};
        
        for (const [componentId, apiData] of Object.entries(updates)) {
            results[componentId] = this.updateComponentData(componentId, apiData);
        }
        
        return results;
    }
    
    /**
     * 监听外部API数据更新
     */
    startApiDataListener() {
        // 这里可以添加WebSocket或其他实时数据监听
        console.log('📡 开始监听API数据更新');
        
        // 示例：定期检查API数据更新
        setInterval(() => {
            this.checkForApiUpdates();
        }, 5000); // 每5秒检查一次
    }
    
    /**
     * 检查API数据更新
     */
    checkForApiUpdates() {
        // 这里可以实现检查逻辑，比如轮询API或监听WebSocket
        console.log('🔍 检查API数据更新...');
    }
}

// 页面加载完成后初始化编辑器
document.addEventListener('DOMContentLoaded', () => {
    window.DashboardEditor = new DashboardEditor();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardEditor;
}
