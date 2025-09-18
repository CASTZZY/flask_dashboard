/**
 * 配置管理系统
 * 按照需求文档11.5章节设计，负责管理组件的配置面板和属性绑定
 */

class ConfigManager {
    constructor() {
        this.configPanel = null;
        this.currentComponent = null;
        this.configSchemas = new Map(); // 存储配置模式
        this.validators = new Map(); // 存储验证器
        
        console.log('🎛️ ConfigManager 初始化');
        this.init();
    }
    
    /**
     * 初始化配置管理器
     */
    init() {
        this.createConfigPanel();
        this.registerDefaultSchemas();
        this.bindEvents();
    }
    
    /**
     * 创建配置面板
     */
    createConfigPanel() {
        this.configPanel = document.getElementById('config-panel');
        if (!this.configPanel) {
            console.warn('配置面板容器未找到');
            return;
        }
        
        this.showEmptyState();
    }
    
    /**
     * 显示空状态
     */
    showEmptyState() {
        if (!this.configPanel) return;
        
        this.configPanel.innerHTML = `
            <div class="config-empty-state">
                <div class="empty-icon">🎨</div>
                <h3>选择组件</h3>
                <p>点击画布中的组件来配置其属性</p>
                
                <div class="canvas-config-section">
                    <h4>画布设置</h4>
                    <div class="config-group">
                        <div class="config-item">
                            <label for="canvas-width">画布宽度</label>
                            <input type="number" id="canvas-width" value="1920" min="800" max="4000" />
                        </div>
                        <div class="config-item">
                            <label for="canvas-height">画布高度</label>
                            <input type="number" id="canvas-height" value="1080" min="600" max="3000" />
                        </div>
                        <div class="config-item">
                            <label for="canvas-bg-color">背景颜色</label>
                            <input type="color" id="canvas-bg-color" value="#f0f0f0" />
                        </div>
                        <div class="config-item">
                            <label for="canvas-bg-image">背景图片</label>
                            <input type="text" id="canvas-bg-image" placeholder="图片URL" />
                            <input type="file" id="canvas-bg-upload" accept="image/*" style="display: none;" />
                            <button type="button" class="btn-upload" onclick="document.getElementById('canvas-bg-upload').click()">
                                📁 上传图片
                            </button>
                        </div>
                        <div class="config-item">
                            <label>
                                <input type="checkbox" id="grid-enabled" checked />
                                启用网格对齐
                            </label>
                        </div>
                        <div class="config-item">
                            <label for="grid-size">网格大小</label>
                            <input type="number" id="grid-size" value="10" min="1" max="50" />
                        </div>
                    </div>
                    
                    <div class="config-actions">
                        <button type="button" class="btn btn-danger" onclick="window.DashboardEditor?.clearCanvas()">
                            🗑️ 清除画布
                        </button>
                        <button type="button" class="btn btn-primary" onclick="window.DashboardEditor?.saveCanvas()">
                            💾 保存画布
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.bindCanvasConfigEvents();
    }
    
    /**
     * 绑定画布配置事件
     */
    bindCanvasConfigEvents() {
        const widthInput = document.getElementById('canvas-width');
        const heightInput = document.getElementById('canvas-height');
        const bgColorInput = document.getElementById('canvas-bg-color');
        const bgImageInput = document.getElementById('canvas-bg-image');
        const bgUploadInput = document.getElementById('canvas-bg-upload');
        const gridEnabledInput = document.getElementById('grid-enabled');
        const gridSizeInput = document.getElementById('grid-size');
        
        // 画布尺寸
        [widthInput, heightInput].forEach(input => {
            if (input) {
                input.addEventListener('change', () => {
                    this.updateCanvasSize(
                        parseInt(widthInput.value),
                        parseInt(heightInput.value)
                    );
                });
            }
        });
        
        // 背景颜色
        if (bgColorInput) {
            bgColorInput.addEventListener('change', (e) => {
                this.updateCanvasBackground({ color: e.target.value });
            });
        }
        
        // 背景图片
        if (bgImageInput) {
            bgImageInput.addEventListener('change', (e) => {
                this.updateCanvasBackground({ image: e.target.value });
            });
        }
        
        // 背景图片上传
        if (bgUploadInput) {
            bgUploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageUrl = event.target.result;
                        bgImageInput.value = imageUrl;
                        this.updateCanvasBackground({ image: imageUrl });
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // 网格设置
        if (gridEnabledInput && window.DragLayoutEngine) {
            gridEnabledInput.addEventListener('change', (e) => {
                window.DragLayoutEngine.setGridEnabled(e.target.checked);
            });
        }
        
        if (gridSizeInput && window.DragLayoutEngine) {
            gridSizeInput.addEventListener('change', (e) => {
                window.DragLayoutEngine.setGridSize(parseInt(e.target.value));
            });
        }
    }
    
    /**
     * 显示组件配置
     */
    showComponentConfig(componentInfo) {
        if (!this.configPanel) return;
        
        this.currentComponent = componentInfo;
        const component = window.ComponentRegistry?.getComponent(componentInfo.type);
        
        if (!component) {
            console.error('组件定义未找到:', componentInfo.type);
            return;
        }
        
        console.log('🎛️ 显示组件配置:', component.name);
        
        // 生成配置面板
        const configPanelHTML = this.generateConfigPanel(component, componentInfo);
        this.configPanel.innerHTML = configPanelHTML;
        
        // 绑定事件
        this.bindConfigEvents();
        
        // 填充当前值
        this.populateConfigValues(componentInfo);
    }
    
    /**
     * 生成配置面板HTML
     */
    generateConfigPanel(component, componentInfo) {
        return `
            <div class="config-panel-content">
                <div class="config-header">
                    <div class="component-info">
                        <span class="component-icon">${component.icon}</span>
                        <div class="component-details">
                            <h3>${component.name}</h3>
                            <p>ID: ${componentInfo.id}</p>
                            <small>类型: ${component.category}</small>
                        </div>
                    </div>
                </div>
                
                <div class="config-sections">
                    ${this.generateBasicConfigSection(componentInfo)}
                    ${this.generateStyleConfigSection(componentInfo)}
                    ${this.generateDataConfigSection(component, componentInfo)}
                    ${this.generateAdvancedConfigSection(componentInfo)}
                    ${this.generateApiDocSection(component, componentInfo)}
                </div>
                
                <div class="config-actions">
                    <button type="button" class="btn btn-secondary" onclick="window.ConfigManager.resetConfig()">
                        🔄 重置配置
                    </button>
                    <button type="button" class="btn btn-danger" onclick="window.ConfigManager.deleteComponent()">
                        🗑️ 删除组件
                    </button>
                    <div class="config-note">
                        <small>💡 配置修改后会自动生效，使用页面顶部的"保存"按钮保存整个页面</small>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成基础配置区域
     */
    generateBasicConfigSection(componentInfo) {
        return `
            <div class="config-section">
                <h4 class="section-title">🔧 基础配置</h4>
                <div class="config-group">
                    <div class="config-row">
                        <div class="config-item">
                            <label for="config-x">X坐标</label>
                            <input type="number" id="config-x" value="${componentInfo.config.x || 0}" />
                        </div>
                        <div class="config-item">
                            <label for="config-y">Y坐标</label>
                            <input type="number" id="config-y" value="${componentInfo.config.y || 0}" />
                        </div>
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <label for="config-width">宽度</label>
                            <input type="number" id="config-width" value="${componentInfo.config.width || 400}" min="50" />
                        </div>
                        <div class="config-item">
                            <label for="config-height">高度</label>
                            <input type="number" id="config-height" value="${componentInfo.config.height || 300}" min="50" />
                        </div>
                    </div>
                    <div class="config-item">
                        <label for="config-z-index">层级</label>
                        <input type="number" id="config-z-index" value="${componentInfo.config.zIndex || 1}" min="1" max="9999" />
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成样式配置区域
     */
    generateStyleConfigSection(componentInfo) {
        return `
            <div class="config-section">
                <h4 class="section-title">🎨 样式配置</h4>
                <div class="config-group">
                    <div class="config-item">
                        <label for="config-bg-color">背景颜色</label>
                        <input type="color" id="config-bg-color" value="${componentInfo.config.backgroundColor || '#ffffff'}" />
                    </div>
                    <div class="config-item">
                        <label for="config-border-color">边框颜色</label>
                        <input type="color" id="config-border-color" value="${componentInfo.config.borderColor || '#e0e0e0'}" />
                    </div>
                    <div class="config-row">
                        <div class="config-item">
                            <label for="config-border-width">边框宽度</label>
                            <input type="number" id="config-border-width" value="${componentInfo.config.borderWidth || 0}" min="0" max="10" />
                        </div>
                        <div class="config-item">
                            <label for="config-border-radius">圆角</label>
                            <input type="number" id="config-border-radius" value="${componentInfo.config.borderRadius || 4}" min="0" max="50" />
                        </div>
                    </div>
                    <div class="config-item">
                        <label for="config-opacity">透明度</label>
                        <input type="range" id="config-opacity" value="${componentInfo.config.opacity || 1}" min="0" max="1" step="0.1" />
                        <span class="range-value">${Math.round((componentInfo.config.opacity || 1) * 100)}%</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成数据配置区域
     */
    generateDataConfigSection(component, componentInfo) {
        // 使用组件的getProperties方法生成动态配置
        if (component.getProperties) {
            try {
                const properties = component.getProperties(componentInfo.config);
                return this.generateDynamicConfigSection('📊 组件配置', properties);
            } catch (error) {
                console.warn('获取组件属性失败:', error);
            }
        }
        
        // 回退到静态配置
        return this.generateStaticDataConfig(component, componentInfo);
    }
    
    /**
     * 生成动态配置区域
     */
    generateDynamicConfigSection(title, properties) {
        if (!properties || properties.length === 0) {
            return '';
        }
        
        // 按类别分组属性
        const groupedProperties = this.groupPropertiesByCategory(properties);
        
        let sectionsHTML = '';
        
        for (const [category, props] of Object.entries(groupedProperties)) {
            const categoryHTML = props.map(prop => this.generatePropertyInput(prop)).join('');
            
            sectionsHTML += `
                <div class="config-section collapsible collapsed">
                    <h4 class="section-title" onclick="this.parentElement.classList.toggle('collapsed')">
                        ${this.getCategoryIcon(category)} ${category}
                        <span class="arrow">▼</span>
                    </h4>
                    <div class="config-group">
                        ${categoryHTML}
                    </div>
                </div>
            `;
        }
        
        return sectionsHTML;
    }
    
    /**
     * 按类别分组属性
     */
    groupPropertiesByCategory(properties) {
        const groups = {
            '基础设置': [],
            '标题配置': [],
            '坐标轴配置': [],
            '样式设置': [],
            '交互功能': [],
            '数据配置': [],
            '高级配置': []
        };
        
        properties.forEach(prop => {
            let category = '基础设置';
            
            if (prop.id.includes('title') || prop.id.includes('subtitle')) {
                category = '标题配置';
            } else if (prop.id.includes('Axis') || prop.id.includes('grid') || prop.id.includes('dataZoom')) {
                category = '坐标轴配置';
            } else if (prop.id.includes('color') || prop.id.includes('width') || prop.id.includes('size') || prop.id.includes('radius')) {
                category = '样式设置';
            } else if (prop.id.includes('tooltip') || prop.id.includes('legend') || prop.id.includes('toolbox') || prop.id.includes('animation')) {
                category = '交互功能';
            } else if (prop.id.includes('data') || prop.id.includes('refresh') || prop.id.includes('url')) {
                category = '数据配置';
            } else if (prop.id.includes('theme') || prop.id.includes('custom')) {
                category = '高级配置';
            }
            
            groups[category].push(prop);
        });
        
        // 移除空分组
        Object.keys(groups).forEach(key => {
            if (groups[key].length === 0) {
                delete groups[key];
            }
        });
        
        return groups;
    }
    
    /**
     * 获取分类图标
     */
    getCategoryIcon(category) {
        const icons = {
            '基础设置': '⚙️',
            '标题配置': '📝',
            '坐标轴配置': '📐',
            '样式设置': '🎨',
            '交互功能': '🖱️',
            '数据配置': '📊',
            '高级配置': '🔧'
        };
        return icons[category] || '📋';
    }
    
    /**
     * 生成属性输入控件
     */
    generatePropertyInput(prop) {
        const inputId = `config-${prop.id}`;
        let inputHTML = '';
        
        switch (prop.type) {
            case 'text':
                inputHTML = `<input type="text" id="${inputId}" value="${prop.value || ''}" placeholder="${prop.placeholder || ''}" />`;
                break;
            case 'number':
                inputHTML = `<input type="number" id="${inputId}" value="${prop.value || ''}" min="${prop.min || ''}" max="${prop.max || ''}" step="${prop.step || 1}" />`;
                break;
            case 'color':
                inputHTML = `<input type="color" id="${inputId}" value="${prop.value || '#000000'}" />`;
                break;
            case 'checkbox':
                inputHTML = `<input type="checkbox" id="${inputId}" ${prop.value ? 'checked' : ''} />`;
                break;
            case 'select':
                const options = prop.options?.map(option => {
                    // 支持字符串数组和对象数组两种格式
                    if (typeof option === 'string') {
                        return `<option value="${option}" ${prop.value === option ? 'selected' : ''}>${option}</option>`;
                    } else if (typeof option === 'object' && option.value && option.label) {
                        return `<option value="${option.value}" ${prop.value === option.value ? 'selected' : ''}>${option.label}</option>`;
                    } else {
                        console.warn('Invalid option format:', option);
                        return '';
                    }
                }).join('') || '';
                inputHTML = `<select id="${inputId}">${options}</select>`;
                break;
            case 'multiselect':
                const multioptions = prop.options?.map(option => {
                    // 支持字符串数组和对象数组两种格式
                    if (typeof option === 'string') {
                        return `<label class="checkbox-label">
                            <input type="checkbox" value="${option}" ${(prop.value || []).includes(option) ? 'checked' : ''} />
                            ${option}
                        </label>`;
                    } else if (typeof option === 'object' && option.value && option.label) {
                        return `<label class="checkbox-label">
                            <input type="checkbox" value="${option.value}" ${(prop.value || []).includes(option.value) ? 'checked' : ''} />
                            ${option.label}
                        </label>`;
                    } else {
                        console.warn('Invalid multiselect option format:', option);
                        return '';
                    }
                }).join('') || '';
                inputHTML = `<div class="multiselect" id="${inputId}">${multioptions}</div>`;
                break;
            case 'textarea':
                inputHTML = `<textarea id="${inputId}" rows="3">${prop.value || ''}</textarea>`;
                break;
            case 'range':
                inputHTML = `
                    <input type="range" id="${inputId}" value="${prop.value || 0}" min="${prop.min || 0}" max="${prop.max || 100}" step="${prop.step || 1}" />
                    <span class="range-value">${prop.value || 0}</span>
                `;
                break;
            default:
                inputHTML = `<input type="text" id="${inputId}" value="${prop.value || ''}" />`;
        }
        
        return `
            <div class="config-item">
                <label for="${inputId}">${prop.label}</label>
                ${inputHTML}
                ${prop.description ? `<small class="config-description">${prop.description}</small>` : ''}
            </div>
        `;
    }
    
    /**
     * 生成静态数据配置（回退方案）
     */
    generateStaticDataConfig(component, componentInfo) {
        let dataConfigHTML = '';
        
        if (component.type === 'text') {
            dataConfigHTML = `
                <div class="config-item">
                    <label for="config-text">文本内容</label>
                    <textarea id="config-text" rows="3">${componentInfo.config.props?.text || '文本内容'}</textarea>
                </div>
                <div class="config-row">
                    <div class="config-item">
                        <label for="config-font-size">字体大小</label>
                        <input type="number" id="config-font-size" value="${componentInfo.config.props?.fontSize || 16}" min="12" max="72" />
                    </div>
                    <div class="config-item">
                        <label for="config-text-color">文字颜色</label>
                        <input type="color" id="config-text-color" value="${componentInfo.config.props?.color || '#333333'}" />
                    </div>
                </div>
            `;
        } else {
            // ECharts组件基础配置
            dataConfigHTML = `
                <div class="config-item">
                    <label for="config-chart-title">图表标题</label>
                    <input type="text" id="config-chart-title" value="${componentInfo.config.props?.title?.text || ''}" />
                </div>
                <div class="config-item">
                    <label for="config-data-url">数据源URL</label>
                    <input type="text" id="config-data-url" value="/api/components/${componentInfo.id}/data" readonly />
                    <button type="button" class="btn-copy" onclick="window.ConfigManager.copyDataUrl()">📋 复制</button>
                </div>
            `;
        }
        
        return `
            <div class="config-section">
                <h4 class="section-title">📊 数据配置</h4>
                <div class="config-group">
                    ${dataConfigHTML}
                </div>
            </div>
        `;
    }
    
    /**
     * 生成高级配置区域
     */
    generateAdvancedConfigSection(componentInfo) {
        return `
            <div class="config-section">
                <h4 class="section-title">⚙️ 高级配置</h4>
                <div class="config-group">
                    <div class="config-item">
                        <label>
                            <input type="checkbox" id="config-animation" ${componentInfo.config.animation !== false ? 'checked' : ''} />
                            启用动画效果
                        </label>
                    </div>
                    <div class="config-item">
                        <label>
                            <input type="checkbox" id="config-responsive" ${componentInfo.config.responsive !== false ? 'checked' : ''} />
                            响应式调整
                        </label>
                    </div>
                    <div class="config-item">
                        <label for="config-custom-css">自定义CSS</label>
                        <textarea id="config-custom-css" rows="3" placeholder="输入自定义CSS样式">${componentInfo.config.customCSS || ''}</textarea>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成API文档区域
     */
    generateApiDocSection(component, componentInfo) {
        const componentType = component.id;
        const apiExamples = this.generateApiExamples(componentType, componentInfo);
        const fullApiUrl = `${window.location.origin}/api/components/${componentInfo.id}/data`;
        
        return `
            <div class="config-section">
                <h4 class="section-title">📚 API文档</h4>
                <div class="api-doc-content">
                    <div class="api-info">
                        <p><strong>组件ID:</strong> ${componentInfo.id}</p>
                        <p><strong>组件类型:</strong> ${component.id}</p>
                        <p><strong>分类:</strong> ${component.category}</p>
                    </div>
                    
                    <div class="api-endpoints">
                        <h5>数据接口 <span class="method-badge post">POST</span></h5>
                        <div class="api-endpoint">
                            <div class="url-container">
                                <code class="api-url" id="api-url-${componentInfo.id}">${fullApiUrl}</code>
                                <button type="button" class="copy-btn" onclick="window.ConfigManager.copyApiUrl('${componentInfo.id}')" title="复制URL">
                                    📋
                                </button>
                            </div>
                            <p>使用POST方式更新组件数据，支持实时数据推送和配置更新</p>
                        </div>
                    </div>
                    
                    ${apiExamples}
                    
                    <div class="api-actions">
                        <button type="button" class="btn btn-outline" onclick="window.ConfigManager.testApi('${componentInfo.id}')">
                            🧪 测试API
                        </button>
                        <button type="button" class="btn btn-outline" onclick="window.ConfigManager.exportPostman('${componentInfo.id}', '${componentType}')">
                            📤 导出POSTMAN
                        </button>
                        <button type="button" class="btn btn-outline" onclick="window.ConfigManager.copyCurl('${componentInfo.id}')">
                            📋 复制cURL
                        </button>
                        <button type="button" class="btn btn-outline" onclick="window.ConfigManager.copyRequestExample('${componentInfo.id}', '${componentType}')">
                            📝 复制请求示例
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * 根据组件类型生成API示例
     */
    generateApiExamples(componentType, componentInfo) {
        const examples = {
            'line_basic': this.generateLineChartExamples(componentInfo),
            'bar_basic': this.generateBarChartExamples(componentInfo),
            'pie_basic': window.ApiExamples ? window.ApiExamples.generatePieChartExamples(componentInfo) : this.generateDefaultExamples(componentInfo),
            'scatter_basic': window.ApiExamples ? window.ApiExamples.generateScatterChartExamples(componentInfo) : this.generateDefaultExamples(componentInfo),
            'radar_basic': window.ApiExamples ? window.ApiExamples.generateRadarChartExamples(componentInfo) : this.generateDefaultExamples(componentInfo),
            'gauge_basic': window.ApiExamples ? window.ApiExamples.generateGaugeChartExamples(componentInfo) : this.generateDefaultExamples(componentInfo),
            'text_basic': window.ApiExamples ? window.ApiExamples.generateTextComponentExamples(componentInfo) : this.generateDefaultExamples(componentInfo),
            'image_basic': window.ApiExamples ? window.ApiExamples.generateImageComponentExamples(componentInfo) : this.generateDefaultExamples(componentInfo),
            'datetime_basic': window.ApiExamples ? window.ApiExamples.generateDateTimeComponentExamples(componentInfo) : this.generateDefaultExamples(componentInfo)
        };
        
        return examples[componentType] || this.generateDefaultExamples(componentInfo);
    }
    
    /**
     * 生成默认API示例
     */
    generateDefaultExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>📊 通用组件 POSTMAN测试案例</h5>
                <div class="postman-example">
                    <p><strong>请求URL:</strong></p>
                    <code>${window.location.origin}/api/components/${componentInfo.id}/data</code>
                    
                    <p><strong>请求方法:</strong> POST</p>
                    <p><strong>请求头:</strong></p>
                    <pre>Content-Type: application/json</pre>
                    
                    <p><strong>请求体示例:</strong></p>
                    <pre>{
  "data": {
    "title": {
      "text": "数据可视化",
      "left": "center"
    },
    "series": [
      {
        "name": "示例数据",
        "type": "line",
        "data": [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  },
  "options": {
    "animation": true,
    "theme": "default"
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "组件数据更新成功",
  "component_id": "${componentInfo.id}",
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 测试API接口
     */
    testApi(componentId) {
        const testData = {
            data: {
                title: { text: "API测试", left: "center" },
                series: [{
                    name: "测试数据",
                    type: "line",
                    data: [1, 2, 3, 4, 5]
                }]
            },
            options: {
                animation: true
            }
        };
        
        fetch(`/api/components/${componentId}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.showMessage('✅ API测试成功！', 'success');
                // 如果返回了数据，尝试更新图表
                if (data.data && window.DashboardEditor) {
                    this.updateChartWithApiData(componentId, data.data);
                }
            } else {
                this.showMessage('❌ API测试失败：' + data.error, 'error');
            }
        })
        .catch(error => {
            this.showMessage('❌ API测试失败：' + error.message, 'error');
        });
    }
    
    /**
     * 使用API数据更新图表
     */
    updateChartWithApiData(componentId, apiData) {
        try {
            // 获取画布渲染器
            const canvasRenderer = window.DashboardEditor?.canvasRenderer;
            if (!canvasRenderer) {
                console.warn('画布渲染器未找到');
                return;
            }
            
            // 查找组件
            const componentInfo = canvasRenderer.components.get(componentId);
            if (!componentInfo) {
                console.warn('组件未找到:', componentId);
                return;
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
                console.log('✅ 图表已使用API数据更新:', componentId);
            } else {
                console.warn('组件实例无效，无法更新:', componentId);
            }
            
        } catch (error) {
            console.error('更新图表失败:', error);
            this.showMessage('❌ 更新图表失败：' + error.message, 'error');
        }
    }
    
    /**
     * 导出POSTMAN配置
     */
    exportPostman(componentId, componentType) {
        const postmanConfig = {
            info: {
                name: `${componentType} API测试`,
                description: `测试${componentType}组件的API接口`,
                schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
            },
            item: [{
                name: `更新${componentType}数据`,
                request: {
                    method: "POST",
                    header: [
                        {
                            key: "Content-Type",
                            value: "application/json"
                        }
                    ],
                    body: {
                        mode: "raw",
                        raw: JSON.stringify({
                            data: {
                                title: { text: "示例标题", left: "center" },
                                series: [{
                                    name: "示例数据",
                                    type: componentType.includes('line') ? 'line' : 'bar',
                                    data: [120, 132, 101, 134, 90, 230, 210]
                                }]
                            },
                            options: {
                                animation: true,
                                theme: "default"
                            }
                        }, null, 2)
                    },
                    url: {
                        raw: `${window.location.origin}/api/components/${componentId}/data`,
                        protocol: window.location.protocol,
                        host: [window.location.host],
                        path: ["api", "components", componentId, "data"]
                    }
                }
            }]
        };
        
        const blob = new Blob([JSON.stringify(postmanConfig, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${componentType}_postman_collection.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('📤 POSTMAN配置已导出！', 'success');
    }
    
    /**
     * 复制API URL
     */
    copyApiUrl(componentId) {
        const apiUrl = `${window.location.origin}/api/components/${componentId}/data`;
        navigator.clipboard.writeText(apiUrl).then(() => {
            this.showMessage('📋 API URL已复制到剪贴板！', 'success');
        }).catch(err => {
            this.showMessage('❌ 复制失败：' + err.message, 'error');
        });
    }
    
    /**
     * 复制请求示例
     */
    copyRequestExample(componentId, componentType) {
        const requestExample = this.generateRequestExample(componentId, componentType);
        navigator.clipboard.writeText(requestExample).then(() => {
            this.showMessage('📝 请求示例已复制到剪贴板！', 'success');
        }).catch(err => {
            this.showMessage('❌ 复制失败：' + err.message, 'error');
        });
    }
    
    /**
     * 生成请求示例
     */
    generateRequestExample(componentId, componentType) {
        const baseUrl = `${window.location.origin}/api/components/${componentId}/data`;
        
        // 根据组件类型生成不同的请求示例
        let requestBody = {};
        
        switch(componentType) {
            case 'line_basic':
                requestBody = {
                    data: {
                        title: { text: "折线图数据", left: "center" },
                        tooltip: { trigger: "axis" },
                        legend: { data: ["销量"] },
                        xAxis: { type: "category", data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"] },
                        yAxis: { type: "value" },
                        series: [{
                            name: "销量",
                            type: "line",
                            data: [120, 132, 101, 134, 90, 230, 210]
                        }]
                    },
                    options: { animation: true, theme: "default" }
                };
                break;
            case 'bar_basic':
                requestBody = {
                    data: {
                        title: { text: "柱状图数据", left: "center" },
                        tooltip: { trigger: "axis" },
                        legend: { data: ["销量"] },
                        xAxis: { type: "category", data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"] },
                        yAxis: { type: "value" },
                        series: [{
                            name: "销量",
                            type: "bar",
                            data: [120, 200, 150, 80, 70, 110, 130]
                        }]
                    },
                    options: { animation: true, theme: "default" }
                };
                break;
            case 'pie_basic':
                requestBody = {
                    data: {
                        title: { text: "饼图数据", left: "center" },
                        tooltip: { trigger: "item" },
                        legend: { orient: "vertical", left: "left" },
                        series: [{
                            name: "访问来源",
                            type: "pie",
                            radius: "50%",
                            data: [
                                { value: 1048, name: "搜索引擎" },
                                { value: 735, name: "直接访问" },
                                { value: 580, name: "邮件营销" },
                                { value: 484, name: "联盟广告" },
                                { value: 300, name: "视频广告" }
                            ]
                        }]
                    },
                    options: { animation: true, theme: "default" }
                };
                break;
            default:
                requestBody = {
                    data: {
                        title: { text: "数据可视化", left: "center" },
                        series: [{
                            name: "示例数据",
                            type: "line",
                            data: [120, 132, 101, 134, 90, 230, 210]
                        }]
                    },
                    options: { animation: true, theme: "default" }
                };
        }
        
        return `POST ${baseUrl}
Content-Type: application/json

${JSON.stringify(requestBody, null, 2)}`;
    }
    
    /**
     * 复制cURL命令
     */
    copyCurl(componentId) {
        const curlCommand = `curl -X POST "${window.location.origin}/api/components/${componentId}/data" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": {
      "title": {"text": "示例标题", "left": "center"},
      "series": [{
        "name": "示例数据",
        "type": "line",
        "data": [120, 132, 101, 134, 90, 230, 210]
      }]
    },
    "options": {
      "animation": true,
      "theme": "default"
    }
  }'`;
        
        navigator.clipboard.writeText(curlCommand).then(() => {
            this.showMessage('📋 cURL命令已复制到剪贴板！', 'success');
        }).catch(err => {
            this.showMessage('❌ 复制失败：' + err.message, 'error');
        });
    }
    
    /**
     * 绑定配置事件
     */
    bindConfigEvents() {
        // 实时预览和更新
        const inputs = this.configPanel.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                // 标记为用户修改
                input.dataset.userModified = 'true';
                this.handleConfigChange(input);
            });
            input.addEventListener('change', () => {
                // 标记为用户修改
                input.dataset.userModified = 'true';
                this.handleConfigChange(input);
            });
        });
        
        // 透明度滑块显示
        const opacityInput = document.getElementById('config-opacity');
        if (opacityInput) {
            opacityInput.addEventListener('input', (e) => {
                const valueSpan = e.target.nextElementSibling;
                if (valueSpan) {
                    valueSpan.textContent = Math.round(e.target.value * 100) + '%';
                }
            });
        }
        
        // 范围滑块显示当前值
        const rangeInputs = this.configPanel.querySelectorAll('input[type="range"]');
        rangeInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const valueSpan = input.parentElement.querySelector('.range-value');
                if (valueSpan) {
                    valueSpan.textContent = e.target.value;
                }
            });
        });
    }
    
    /**
     * 处理配置项变化
     */
    handleConfigChange(input) {
        if (!this.currentComponent) return;
        
        // 防抖处理，避免频繁更新
        if (this.updateTimer) {
            clearTimeout(this.updateTimer);
        }
        
        this.updateTimer = setTimeout(() => {
            this.applyRealTimeChanges();
        }, 200); // 200ms防抖
    }
    
    /**
     * 应用实时更改 - 重构版本
     */
    applyRealTimeChanges() {
        if (!this.currentComponent) return;
        
        try {
            console.log('🔄 开始实时配置更新...');
            
            // 收集当前所有配置值
            const config = this.collectConfigValues();
            console.log('📊 收集到的配置:', config);
            
            // 直接更新组件 - 简化流程
            this.updateComponentDirectly(config);
            
        } catch (error) {
            console.error('❌ 实时更新失败:', error);
        }
    }
    
    /**
     * 直接更新组件 - 简化版本
     */
    updateComponentDirectly(config) {
        if (!this.currentComponent || !window.CanvasRenderer) return;
        
        const componentInfo = window.CanvasRenderer.components.get(this.currentComponent.id);
        if (!componentInfo) {
            console.warn('组件信息不存在:', this.currentComponent.id);
            return;
        }
        
        try {
            console.log('🎯 直接更新组件:', this.currentComponent.id);
            
            // 1. 更新组件配置信息
            Object.assign(componentInfo.config, {
                x: config.x,
                y: config.y,
                width: config.width,
                height: config.height,
                backgroundColor: config.backgroundColor,
                borderColor: config.borderColor,
                borderWidth: config.borderWidth,
                borderRadius: config.borderRadius,
                opacity: config.opacity,
                zIndex: config.zIndex
            });
            
            // 2. 更新组件props
            if (config.props) {
                componentInfo.config.props = { ...componentInfo.config.props, ...config.props };
            }
            
            // 3. 更新DOM样式
            window.CanvasRenderer.setComponentStyle(componentInfo.element, componentInfo.config);
            
            // 4. 重新渲染ECharts组件
            if (componentInfo.instance && this.isEChartsComponent(componentInfo.type)) {
                this.rerenderEChartsComponent(componentInfo);
            }
            
            console.log('✅ 组件更新完成');
            
        } catch (error) {
            console.error('❌ 直接更新组件失败:', error);
        }
    }
    
    /**
     * 判断是否为ECharts组件
     */
    isEChartsComponent(type) {
        const echartsTypes = ['line_basic', 'line_area', 'line_smooth', 'line_stack', 'line_step', 'line_dual_axis',
                             'bar_basic', 'bar_stack', 'bar_horizontal', 'bar_waterfall', 'bar_grouped', 'bar_positive_negative',
                             'pie_basic', 'pie_doughnut', 'pie_rose', 'pie_nested', 'pie_nightingale', 'pie_semi_circle',
                             'scatter_basic', 'scatter_bubble', 'radar_basic', 'gauge_basic',
                             'heatmap_basic', 'heatmap_calendar', 'funnel_basic', 'liquidfill_basic', 
                             'wordcloud_basic', 'sunburst_basic', 'pictorialbar_basic'];
        return echartsTypes.includes(type);
    }
    
    /**
     * 重新渲染ECharts组件
     */
    rerenderEChartsComponent(componentInfo) {
        try {
            console.log('📊 重新渲染ECharts组件:', componentInfo.id);
            
            // 获取组件定义
            const componentDef = window.ComponentRegistry?.getComponent(componentInfo.type);
            if (!componentDef) {
                console.warn('组件定义不存在:', componentInfo.type);
                return;
            }
            
            // 销毁旧实例
            if (componentInfo.instance && typeof componentInfo.instance.dispose === 'function') {
                componentInfo.instance.dispose();
            }
            
            // 清空容器
            componentInfo.element.innerHTML = '';
            
            // 确保容器背景透明
            componentInfo.element.style.backgroundColor = 'transparent';
            
            // 合并配置
            const finalProps = { ...componentDef.defaultProps, ...componentInfo.config.props };
            // 确保props中也有透明背景
            finalProps.backgroundColor = 'transparent';
            console.log('🔧 最终配置:', finalProps);
            
            // 重新渲染（这会重新调用echarts.init，支持主题变更）
            componentInfo.instance = componentDef.render(componentInfo.element, finalProps);
            
            // 如果有主题变更，需要完全重新初始化
            if (finalProps.theme && finalProps.theme !== 'default') {
                console.log('🎨 应用主题:', finalProps.theme);
                // 检查主题是否可用
                if (window.echarts) {
                    console.log('📋 可用的主题:', Object.keys(window.echarts.getTheme ? {} : {}));
                }
            }
            
            console.log('✅ ECharts组件重新渲染完成');
            
        } catch (error) {
            console.error('❌ ECharts组件重新渲染失败:', error);
        }
    }
    
    /**
     * 创建干净的配置对象（避免循环引用）
     */
    createCleanConfig(config) {
        const cleanConfig = {};
        
        for (const [key, value] of Object.entries(config)) {
            // 跳过可能导致循环引用的复杂对象
            if (typeof value === 'function' || 
                (value && typeof value === 'object' && value.nodeType) ||
                key === 'element' || key === 'instance') {
                continue;
            }
            
            // 处理简单值和对象
            if (value === null || value === undefined) {
                cleanConfig[key] = value;
            } else if (typeof value === 'object') {
                // 简单对象深拷贝
                try {
                    cleanConfig[key] = JSON.parse(JSON.stringify(value));
                } catch (e) {
                    // 如果无法序列化，跳过
                    console.warn(`跳过无法序列化的配置项: ${key}`);
                }
            } else {
                cleanConfig[key] = value;
            }
        }
        
        return cleanConfig;
    }
    
    /**
     * 填充配置值
     */
    populateConfigValues(componentInfo) {
        console.log('🔄 填充配置值:', componentInfo.id, componentInfo.config);
        
        // 基础配置
        this.setInputValue('config-x', componentInfo.config.x);
        this.setInputValue('config-y', componentInfo.config.y);
        this.setInputValue('config-width', componentInfo.config.width);
        this.setInputValue('config-height', componentInfo.config.height);
        this.setInputValue('config-z-index', componentInfo.config.zIndex);
        
        // 样式配置
        this.setInputValue('config-bg-color', componentInfo.config.backgroundColor);
        this.setInputValue('config-border-color', componentInfo.config.borderColor);
        this.setInputValue('config-border-width', componentInfo.config.borderWidth);
        this.setInputValue('config-border-radius', componentInfo.config.borderRadius);
        this.setInputValue('config-opacity', componentInfo.config.opacity);
        
        // 高级配置
        this.setInputValue('config-animation', componentInfo.config.animation);
        this.setInputValue('config-responsive', componentInfo.config.responsive);
        this.setInputValue('config-custom-css', componentInfo.config.customCSS);
        
        // 组件特定配置 - 使用更智能的方式
        this.populateComponentSpecificConfig(componentInfo);
    }
    
    /**
     * 填充组件特定配置
     */
    populateComponentSpecificConfig(componentInfo) {
        if (!componentInfo.config.props) {
            return;
        }
        
        const props = componentInfo.config.props;
        console.log('📊 组件属性配置:', props);
        
        // 获取ECharts实例的实际配置
        let actualConfig = {};
        if (componentInfo.instance && typeof componentInfo.instance.getOption === 'function') {
            actualConfig = componentInfo.instance.getOption();
            console.log('📊 ECharts实际配置:', actualConfig);
        }
        
        // 遍历所有配置项，智能匹配
        const inputs = this.configPanel.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.id && input.id.startsWith('config-')) {
                const key = input.id.replace('config-', '');
                
                // 跳过位置和样式相关的配置，这些在上层处理
                const skipKeys = ['x', 'y', 'width', 'height', 'bg-color', 'border-color', 'border-width', 'border-radius', 'opacity', 'z-index', 'animation', 'responsive', 'custom-css'];
                if (skipKeys.includes(key)) return;
                
                let value;
                
                // 特殊处理图例位置，从ECharts实际配置中读取
                if (key === 'legend-position') {
                    value = this.getLegendPositionFromConfig(actualConfig);
                } else {
                    // 其他配置从props中读取
                    value = this.findConfigValue(props, key);
                }
                
                if (value !== undefined) {
                    this.setInputValue(input.id, value);
                    console.log(`✅ 设置配置项 ${key}:`, value);
                }
            }
        });
    }
    
    /**
     * 从ECharts配置中获取图例位置
     */
    getLegendPositionFromConfig(config) {
        if (!config.legend || !config.legend.show) {
            return 'top'; // 默认位置
        }
        
        const legend = config.legend;
        
        // 检查垂直位置
        if (legend.top === 'top') return 'top';
        if (legend.top === 'bottom') return 'bottom';
        if (legend.top === 'middle') {
            // 垂直居中时，检查左右位置
            if (legend.left === 'left') return 'left';
            if (legend.left === 'right') return 'right';
        }
        
        // 检查水平位置
        if (legend.left === 'left') return 'left';
        if (legend.left === 'right') return 'right';
        if (legend.left === 'center') {
            // 水平居中时，检查上下位置
            if (legend.top === 'top') return 'top';
            if (legend.top === 'bottom') return 'bottom';
        }
        
        // 默认返回顶部
        return 'top';
    }
    
    /**
     * 查找配置值 - 支持多种键名格式
     */
    findConfigValue(props, key) {
        // 直接匹配
        if (props[key] !== undefined) {
            return props[key];
        }
        
        // 尝试驼峰命名转换
        const camelKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        if (props[camelKey] !== undefined) {
            return props[camelKey];
        }
        
        // 尝试下划线命名转换
        const snakeKey = key.replace(/-/g, '_');
        if (props[snakeKey] !== undefined) {
            return props[snakeKey];
        }
        
        // 尝试嵌套属性匹配（如 title.text）
        const nestedKeys = key.split('-');
        if (nestedKeys.length > 1) {
            let nestedValue = props;
            for (const nestedKey of nestedKeys) {
                if (nestedValue && typeof nestedValue === 'object' && nestedValue[nestedKey] !== undefined) {
                    nestedValue = nestedValue[nestedKey];
                } else {
                    return undefined;
                }
            }
            return nestedValue;
        }
        
        return undefined;
    }
    
    /**
     * 设置输入值
     */
    setInputValue(id, value) {
        const input = document.getElementById(id);
        if (!input || value === undefined) {
            return;
        }
        
        try {
            if (input.type === 'checkbox') {
                // 检查是否是多选框组
                const multiselectContainer = input.closest('.multiselect');
                if (multiselectContainer && multiselectContainer.id === id) {
                    // 这是多选框组，需要处理数组值
                    if (Array.isArray(value)) {
                        const checkboxes = multiselectContainer.querySelectorAll('input[type="checkbox"]');
                        checkboxes.forEach(checkbox => {
                            checkbox.checked = value.includes(checkbox.value);
                        });
                    }
                } else {
                    // 普通单选框
                    input.checked = Boolean(value);
                }
            } else if (input.type === 'radio') {
                input.checked = input.value === value;
            } else if (input.tagName === 'SELECT') {
                if (input.multiple) {
                    // 多选下拉框
                    const options = input.querySelectorAll('option');
                    options.forEach(option => {
                        option.selected = Array.isArray(value) && value.includes(option.value);
                    });
                } else {
                    // 单选下拉框
                    input.value = value;
                }
            } else if (input.type === 'range') {
                input.value = value;
                // 更新显示值
                const valueSpan = input.parentElement.querySelector('.range-value');
                if (valueSpan) {
                    valueSpan.textContent = value;
                }
            } else {
                // 普通输入框
                input.value = value;
            }
            
            // 标记为已初始化，不是用户修改
            input.dataset.initialized = 'true';
            console.log(`✅ 设置输入控件 ${id}:`, value);
        } catch (error) {
            console.warn(`设置输入控件 ${id} 失败:`, error);
        }
    }
    
    /**
     * 预览更改
     */
    previewChanges() {
        if (!this.currentComponent) return;
        
        // 收集配置值
        const config = this.collectConfigValues();
        
        // 应用样式更改到DOM元素
        this.applyStyleChanges(config);
    }
    
    /**
     * 收集配置值
     */
    collectConfigValues() {
        const config = {
            x: this.getInputValue('config-x', 'number'),
            y: this.getInputValue('config-y', 'number'),
            width: this.getInputValue('config-width', 'number'),
            height: this.getInputValue('config-height', 'number'),
            zIndex: this.getInputValue('config-z-index', 'number'),
            backgroundColor: this.getInputValue('config-bg-color'),
            borderColor: this.getInputValue('config-border-color'),
            borderWidth: this.getInputValue('config-border-width', 'number'),
            borderRadius: this.getInputValue('config-border-radius', 'number'),
            opacity: this.getInputValue('config-opacity', 'number'),
            animation: this.getInputValue('config-animation', 'boolean'),
            responsive: this.getInputValue('config-responsive', 'boolean'),
            customCSS: this.getInputValue('config-custom-css'),
            props: {}
        };
        
        // 收集组件特定属性
        const component = window.ComponentRegistry?.getComponent(this.currentComponent.type);
        if (component?.type === 'text') {
            config.props = {
                text: this.getInputValue('config-text'),
                fontSize: this.getInputValue('config-font-size', 'number'),
                color: this.getInputValue('config-text-color'),
                textAlign: this.getInputValue('config-text-align')
            };
        } else if (component?.type === 'image') {
            config.props = {
                src: this.getInputValue('config-image-src'),
                alt: this.getInputValue('config-image-alt'),
                objectFit: this.getInputValue('config-object-fit')
            };
        } else {
            // ECharts组件 - 收集所有动态配置项
            config.props = this.collectEChartsConfigValues();
            config.refreshInterval = this.getInputValue('config-refresh-interval', 'number');
        }
        
        return config;
    }
    
    /**
     * 收集ECharts组件的所有配置值
     */
    collectEChartsConfigValues() {
        const props = {};
        
        // 遍历所有config-开头的输入控件
        const inputs = this.configPanel.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.id && input.id.startsWith('config-')) {
                const key = input.id.replace('config-', '');
                
                // 跳过位置和样式相关的配置，这些在上层处理
                const skipKeys = ['x', 'y', 'width', 'height', 'bg-color', 'border-color', 'border-width', 'border-radius', 'opacity', 'z-index', 'animation', 'responsive', 'custom-css'];
                if (skipKeys.includes(key)) return;
                
                // 跳过图例相关配置，除非用户明确修改了它们
                const legendKeys = ['show-legend', 'legend-position'];
                if (legendKeys.includes(key)) {
                    // 检查是否被用户修改过
                    if (!input.dataset.userModified && !input.dataset.initialized) {
                        return; // 跳过未修改的图例配置
                    }
                }
                
                let value;
                
                if (input.type === 'checkbox') {
                    // 检查是否是多选框组
                    const multiselectContainer = input.closest('.multiselect');
                    if (multiselectContainer && multiselectContainer.id === `config-${key}`) {
                        // 这是多选框组，收集所有选中的值
                        const checkboxes = multiselectContainer.querySelectorAll('input[type="checkbox"]:checked');
                        value = Array.from(checkboxes).map(cb => cb.value);
                        console.log(`🔧 多选框组 ${key}:`, value);
                        // 避免重复处理同一个多选框组
                        if (props[key] !== undefined) return;
                    } else {
                        // 普通单选框
                        value = input.checked;
                        console.log(`☑️ 单选框 ${key}:`, value);
                    }
                } else if (input.type === 'number' || input.type === 'range') {
                    value = parseFloat(input.value) || 0;
                } else if (input.tagName === 'SELECT' && input.multiple) {
                    // 多选下拉框
                    value = Array.from(input.selectedOptions).map(option => option.value);
                } else {
                    value = input.value;
                }
                
                // 收集所有配置项，包括空值和默认值
                if (value !== undefined) {
                    props[key] = value;
                }
            }
        });
        
        console.log('📊 收集到的ECharts配置:', props);
        return props;
    }
    
    /**
     * 获取输入值
     */
    getInputValue(id, type = 'string') {
        const input = document.getElementById(id);
        if (!input) return undefined;
        
        switch (type) {
            case 'number':
                return parseFloat(input.value) || 0;
            case 'boolean':
                return input.checked;
            default:
                return input.value;
        }
    }
    
    /**
     * 应用样式更改
     */
    applyStyleChanges(config) {
        if (!this.currentComponent?.element) return;
        
        const element = this.currentComponent.element;
        
        // 应用基础样式
        element.style.left = config.x + 'px';
        element.style.top = config.y + 'px';
        element.style.width = config.width + 'px';
        element.style.height = config.height + 'px';
        element.style.zIndex = config.zIndex;
        element.style.opacity = config.opacity;
        
        if (config.backgroundColor) {
            element.style.backgroundColor = config.backgroundColor;
        }
        if (config.borderColor) {
            element.style.borderColor = config.borderColor;
        }
        if (config.borderWidth !== undefined) {
            element.style.borderWidth = config.borderWidth + 'px';
        }
        if (config.borderRadius !== undefined) {
            element.style.borderRadius = config.borderRadius + 'px';
        }
        
        // 应用自定义CSS
        if (config.customCSS) {
            try {
                const style = document.createElement('style');
                style.textContent = `[data-component-id="${this.currentComponent.id}"] { ${config.customCSS} }`;
                document.head.appendChild(style);
            } catch (error) {
                console.error('自定义CSS应用失败:', error);
            }
        }
    }
    
    /**
     * 应用更改
     */
    applyChanges() {
        if (!this.currentComponent) return;
        
        console.log('🔄 应用配置更改');
        
        const config = this.collectConfigValues();
        
        // 更新组件配置
        Object.assign(this.currentComponent.config, config);
        
        // 应用到DOM元素
        this.applyStyleChanges(config);
        
        // 重新渲染组件
        this.rerenderComponent(config);
        
        // 更新全局状态
        if (window.CanvasRenderer) {
            window.CanvasRenderer.updateComponentConfig(this.currentComponent.id, config);
        }
        
        // 触发配置更新事件
        const event = new CustomEvent('componentConfigUpdated', {
            detail: {
                componentId: this.currentComponent.id,
                config: config
            }
        });
        document.dispatchEvent(event);
        
        this.showMessage('配置已应用', 'success');
    }
    
    /**
     * 重新渲染组件
     */
    async rerenderComponent(config) {
        const component = window.ComponentRegistry?.getComponent(this.currentComponent.type);
        if (!component) return;
        
        try {
            // 保存缩放控制点
            const handles = this.currentComponent.element.querySelectorAll('.resize-handle');
            const handleElements = Array.from(handles);
            
            // 清空内容
            this.currentComponent.element.innerHTML = '';
            
            // 重新渲染
            const instance = component.render(this.currentComponent.element, config.props);
            this.currentComponent.instance = instance;
            
            // 恢复缩放控制点
            handleElements.forEach(handle => {
                this.currentComponent.element.appendChild(handle);
            });
            
        } catch (error) {
            console.error('组件重新渲染失败:', error);
            this.showMessage('组件渲染失败: ' + error.message, 'error');
        }
    }
    
    /**
     * 重置配置
     */
    resetConfig() {
        if (!this.currentComponent) return;
        
        const component = window.ComponentRegistry?.getComponent(this.currentComponent.type);
        if (!component) return;
        
        // 重置为默认配置
        this.currentComponent.config.props = { ...component.defaultProps };
        
        // 重新显示配置面板
        this.showComponentConfig(this.currentComponent);
        
        // 重新渲染
        this.rerenderComponent(this.currentComponent.config);
        
        this.showMessage('配置已重置', 'info');
    }
    
    /**
     * 删除组件
     */
    deleteComponent() {
        if (!this.currentComponent) return;
        
        if (confirm('确定要删除这个组件吗？')) {
            // 触发删除事件
            const event = new CustomEvent('deleteComponent', {
                detail: { componentId: this.currentComponent.id }
            });
            document.dispatchEvent(event);
            
            // 显示空状态
            this.showEmptyState();
            this.currentComponent = null;
        }
    }
    
    /**
     * 复制数据URL
     */
    copyDataUrl() {
        if (!this.currentComponent) return;
        
        const url = `${window.location.origin}/api/components/${this.currentComponent.id}/data`;
        navigator.clipboard.writeText(url).then(() => {
            this.showMessage('API地址已复制', 'success');
        });
    }
    
    /**
     * 测试API
     */
    async testApi() {
        if (!this.currentComponent) return;
        
        try {
            // 构建POST请求体 - 向图表组件发送数据
            const requestBody = {
                data: {
                    series: [{
                        name: '测试数据',
                        type: 'line',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }],
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    }
                },
                options: {
                    title: {
                        text: 'API测试图表'
                    },
                    animation: true
                }
            };
            
            const response = await fetch(`/api/components/${this.currentComponent.id}/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            const data = await response.json();
            
            console.log('API测试结果:', data);
            this.showMessage('API测试成功，请查看控制台', 'success');
        } catch (error) {
            console.error('API测试失败:', error);
            this.showMessage('API测试失败: ' + error.message, 'error');
        }
    }
    
    /**
     * 导出POSTMAN集合
     */
    exportPostman() {
        if (!this.currentComponent) return;
        
        const postmanCollection = {
            info: {
                name: `Dashboard Component API - ${this.currentComponent.id}`,
                description: '可视化大屏组件API测试集合'
            },
            item: [
                {
                    name: '获取组件数据',
                    request: {
                        method: 'GET',
                        header: [],
                        url: {
                            raw: `${window.location.origin}/api/components/${this.currentComponent.id}/data`,
                            host: [window.location.hostname],
                            port: window.location.port,
                            path: ['api', 'components', this.currentComponent.id, 'data']
                        }
                    }
                },
                {
                    name: '更新组件数据',
                    request: {
                        method: 'POST',
                        header: [
                            {
                                key: 'Content-Type',
                                value: 'application/json'
                            }
                        ],
                        body: {
                            mode: 'raw',
                            raw: JSON.stringify(this.currentComponent.config.props, null, 2)
                        },
                        url: {
                            raw: `${window.location.origin}/api/components/${this.currentComponent.id}/data`,
                            host: [window.location.hostname],
                            port: window.location.port,
                            path: ['api', 'components', this.currentComponent.id, 'data']
                        }
                    }
                }
            ]
        };
        
        // 下载POSTMAN集合
        const blob = new Blob([JSON.stringify(postmanCollection, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-component-${this.currentComponent.id}.postman_collection.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('POSTMAN集合已导出', 'success');
    }
    
    /**
     * 更新画布尺寸
     */
    updateCanvasSize(width, height) {
        if (window.CanvasRenderer) {
            window.CanvasRenderer.updateCanvasSize(width, height);
        }
    }
    
    /**
     * 更新画布背景
     */
    updateCanvasBackground(options) {
        if (window.CanvasRenderer) {
            window.CanvasRenderer.updateCanvasBackground(options);
        }
    }
    
    /**
     * 绑定全局事件
     */
    bindEvents() {
        // 监听组件选择事件
        document.addEventListener('componentSelected', (e) => {
            const componentInfo = e.detail;
            if (window.CanvasRenderer) {
                const fullComponentInfo = window.CanvasRenderer.getComponent(componentInfo.componentId);
                if (fullComponentInfo) {
                    this.showComponentConfig(fullComponentInfo);
                }
            }
        });
        
        // 监听组件取消选择事件
        document.addEventListener('componentDeselected', () => {
            this.showEmptyState();
            this.currentComponent = null;
        });
    }
    
    /**
     * 注册默认配置模式
     */
    registerDefaultSchemas() {
        // 这里可以注册各种组件的配置模式
        console.log('📋 默认配置模式已注册');
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
            border-radius: 4px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        `;
        message.textContent = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 3000);
    }
    
    /**
     * 生成折线图API示例
     */
    generateLineChartExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>📈 折线图 POSTMAN测试案例</h5>
                <div class="postman-example">
                    <p><strong>请求URL:</strong></p>
                    <code>${window.location.origin}/api/components/${componentInfo.id}/data</code>
                    
                    <p><strong>请求方法:</strong> POST</p>
                    <p><strong>请求头:</strong></p>
                    <pre>Content-Type: application/json</pre>
                    
                    <p><strong>基础请求体示例:</strong></p>
                    <pre>{
  "data": {
    "title": {
      "text": "销售趋势分析",
      "left": "center"
    },
    "tooltip": {
      "trigger": "axis"
    },
    "legend": {
      "data": ["销售额", "利润"]
    },
    "xAxis": {
      "type": "category",
      "data": ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    "yAxis": {
      "type": "value"
    },
    "series": [
      {
        "name": "销售额",
        "type": "line",
        "data": [120, 132, 101, 134, 90, 230],
        "smooth": true
      },
      {
        "name": "利润",
        "type": "line",
        "data": [60, 66, 50, 67, 45, 115],
        "smooth": true
      }
    ]
  },
  "options": {
    "animation": true,
    "theme": "default"
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "折线图数据更新成功",
  "component_id": "${componentInfo.id}",
  "data_points": 6,
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成柱状图API示例
     */
    generateBarChartExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>📊 柱状图 POSTMAN测试案例</h5>
                <div class="postman-example">
                    <p><strong>请求URL:</strong></p>
                    <code>${window.location.origin}/api/components/${componentInfo.id}/data</code>
                    
                    <p><strong>请求方法:</strong> POST</p>
                    <p><strong>请求头:</strong></p>
                    <pre>Content-Type: application/json</pre>
                    
                    <p><strong>基础请求体示例:</strong></p>
                    <pre>{
  "data": {
    "title": {
      "text": "月度销售统计",
      "left": "center"
    },
    "tooltip": {
      "trigger": "axis"
    },
    "legend": {
      "data": ["Q1", "Q2", "Q3", "Q4"]
    },
    "xAxis": {
      "type": "category",
      "data": ["北京", "上海", "广州", "深圳", "杭州", "成都"]
    },
    "yAxis": {
      "type": "value"
    },
    "series": [
      {
        "name": "Q1",
        "type": "bar",
        "data": [120, 200, 150, 80, 70, 110]
      },
      {
        "name": "Q2",
        "type": "bar",
        "data": [132, 180, 160, 90, 80, 120]
      }
    ]
  },
  "options": {
    "animation": true,
    "theme": "default"
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "柱状图数据更新成功",
  "component_id": "${componentInfo.id}",
  "categories": 6,
  "series_count": 2,
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
}

// 创建全局配置管理器实例
window.ConfigManager = new ConfigManager();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConfigManager;
}
