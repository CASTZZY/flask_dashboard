# 可视化大屏系统

基于Python Flask和ECharts的可视化大屏系统，提供丰富的图表组件和基础UI组件，支持拖拽式布局设计。

## 功能特性

- 🎨 **丰富的组件库**：支持ECharts所有图表类型和基础UI组件
- 🖱️ **拖拽式编辑**：直观的可视化布局设计
- ⚙️ **灵活的配置**：每个组件都支持详细的属性配置
- 🔄 **实时数据刷新**：支持组件级别的数据自动更新
- 📊 **完善的管理**：页面创建、编辑、发布、删除一体化管理
- 📱 **响应式适配**：发布页面自动适应不同屏幕尺寸
- 📖 **详细文档**：完整的API接口文档和POSTMAN测试集合

## 技术栈

- **后端**: Python Flask
- **前端**: JavaScript、ECharts
- **数据传输**: RESTful API
- **数据存储**: JSON文件（无数据库依赖）

## 项目结构

```
flask_dashboard_3.0/
├── app.py                      # Flask主应用
├── api/                        # API接口
│   ├── __init__.py
│   ├── pages.py               # 页面管理API
│   └── components.py          # 组件数据API
├── templates/                  # HTML模板
│   ├── base.html              # 基础模板
│   ├── index.html             # 管理页面
│   ├── editor.html            # 编辑器页面
│   ├── published.html         # 发布页面
│   └── api-docs.html          # API文档页面
├── static/                     # 静态资源
│   ├── css/                   # 样式文件
│   ├── js/                    # JavaScript文件
│   │   ├── components/        # ECharts组件库
│   │   ├── editor/            # 编辑器相关
│   │   └── ...
│   └── img/                   # 图片资源
├── data/                       # 数据目录
│   ├── pages.json             # 页面配置数据
│   └── published/             # 发布页面数据
├── requirements.txt            # Python依赖
└── README.md                  # 项目说明
```

## 快速开始

### 1. 环境准备

确保已安装Python 3.7+：

```bash
python --version
```

### 2. 安装依赖

```bash
# 克隆或下载项目到本地
cd flask_dashboard_3.0

# 安装Python依赖
pip install -r requirements.txt
```

### 3. 启动应用

```bash
python app.py
```

应用将在 `http://localhost:5000` 启动。

### 4. 访问系统

- **管理页面**: http://localhost:5000
- **编辑器**: http://localhost:5000/editor
- **API文档**: http://localhost:5000/api-docs
- **示例大屏**: http://localhost:5000/published/demo_page_001

## 使用指南

### 1. 页面管理

在管理页面可以：
- 创建新的可视化页面
- 编辑现有页面
- 发布/取消发布页面
- 删除页面
- 预览页面效果

### 2. 编辑器使用

编辑器提供以下功能：
- **组件库**：左侧面板展示所有可用组件
- **画布**：中间区域用于拖拽和布局组件
- **属性面板**：右侧面板用于配置选中组件的属性
- **工具栏**：顶部提供撤销、重做、保存、发布等功能

#### 添加组件
1. 从左侧组件库拖拽组件到画布
2. 调整组件位置和大小
3. 在右侧属性面板配置组件属性

#### 快捷键
- `Ctrl+S`: 保存页面
- `Ctrl+Z`: 撤销
- `Ctrl+Shift+Z`: 重做
- `Ctrl+C`: 复制组件
- `Ctrl+V`: 粘贴组件
- `Delete`: 删除选中组件

### 3. 组件类型

系统支持以下组件类型：

#### 基础图表
- 柱状图系列：基础柱状图、堆叠柱状图、条形图等
- 折线图系列：基础折线图、面积图、平滑折线图等
- 饼图系列：基础饼图、环形图、玫瑰图等
- 其他图表：散点图、雷达图、仪表盘、漏斗图、热力图、K线图等

#### 3D图表
- 3D柱状图、3D散点图、3D曲面图等

#### 基础组件
- 文本框、图片、按钮、时间控件等

### 4. 数据配置

每个图表组件支持：
- **静态数据**：直接在属性面板配置
- **API数据**：指定数据源API接口
- **自动刷新**：设置数据刷新间隔

## API接口

### 页面管理

- `GET /api/pages` - 获取页面列表
- `POST /api/pages` - 创建页面
- `GET /api/pages/{id}` - 获取页面详情
- `PUT /api/pages/{id}` - 更新页面
- `DELETE /api/pages/{id}` - 删除页面
- `POST /api/pages/{id}/publish` - 发布页面
- `POST /api/pages/{id}/unpublish` - 取消发布页面

### 组件数据

- `GET /api/components/{id}/data` - 获取组件数据
- `POST /api/components/{id}/data` - 更新组件数据
- `GET /api/data/{type}` - 获取示例数据

详细的API文档请访问：http://localhost:5000/api-docs

## 开发说明

### 添加新组件

1. 在 `static/js/components/` 目录下创建组件文件
2. 继承 `BaseChart` 基类
3. 在 `ComponentLoader.js` 中注册组件映射
4. 在编辑器模板中添加组件选项

### 自定义样式

- 修改 `static/css/` 目录下的样式文件
- 支持自定义主题和颜色方案

### 数据源集成

- 修改 `api/components.py` 中的数据生成逻辑
- 支持连接数据库、API等外部数据源

## 部署方案

### 开发环境
```bash
python app.py
```

### 生产环境（使用Gunicorn）
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Docker部署
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## 常见问题

### Q: 组件无法加载？
A: 检查组件文件路径和ComponentLoader中的映射配置是否正确。

### Q: 图表显示异常？
A: 确保ECharts库正确加载，检查组件数据格式是否符合ECharts规范。

### Q: 页面保存失败？
A: 检查data目录是否有写入权限，确保JSON格式正确。

### Q: 发布页面无法访问？
A: 确认页面已正确发布，检查published目录下是否生成了对应的JSON文件。

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进项目！

## 联系方式

如有问题或建议，请通过以下方式联系：
- 创建GitHub Issue
- 发送邮件至项目维护者

---

**注意**: 本项目仅作为演示和学习用途，生产环境使用请根据实际需求进行安全加固和性能优化。
