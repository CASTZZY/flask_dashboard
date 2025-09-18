# API数据更新使用说明

## 🚀 功能概述

发布页面现在支持接收API数据并实时更新画面，包括以下功能：

- **POST API接口**：支持通过POST方式向图表组件发送数据
- **WebSocket实时推送**：支持实时数据推送和页面更新
- **轮询更新**：支持定时轮询API获取最新数据
- **自动重连**：WebSocket连接断开时自动重连

## 📡 API接口

### 更新组件数据

**接口地址：** `POST /api/components/{component_id}/data`

**请求头：**
```
Content-Type: application/json
```

**请求体示例：**
```json
{
  "data": {
    "title": {
      "text": "实时数据更新",
      "left": "center"
    },
    "series": [
      {
        "name": "数据系列",
        "type": "line",
        "data": [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  },
  "options": {
    "animation": true,
    "theme": "default"
  }
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "图表数据更新成功",
  "component_id": "line_basic_001",
  "data": {
    "title": {
      "text": "实时数据更新",
      "left": "center"
    },
    "series": [
      {
        "name": "数据系列",
        "type": "line",
        "data": [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔌 WebSocket支持

### 连接WebSocket

```javascript
const socket = io();

socket.on('connect', () => {
    console.log('WebSocket连接已建立');
    
    // 订阅页面数据更新
    socket.emit('subscribe', {
        pageId: 'your_page_id'
    });
});

socket.on('data_update', (data) => {
    console.log('收到数据更新:', data);
    // 更新图表
    updateChart(data);
});
```

### WebSocket事件

- **connect**：连接建立
- **disconnect**：连接断开
- **subscribe**：订阅页面更新
- **unsubscribe**：取消订阅
- **data_update**：数据更新事件
- **page_refresh**：页面刷新事件

## 🎯 使用方法

### 1. 通过POSTMAN测试

1. 访问 `http://localhost:5000/api-test`
2. 选择图表类型预设
3. 输入组件ID
4. 点击"测试API"按钮
5. 查看响应和图表预览

### 2. 通过代码调用

```javascript
// 更新折线图数据
fetch('/api/components/line_basic_001/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        data: {
            title: { text: "实时数据", left: "center" },
            series: [{
                name: "数据",
                type: "line",
                data: [1, 2, 3, 4, 5]
            }]
        },
        options: { animation: true }
    })
})
.then(response => response.json())
.then(result => {
    if (result.success) {
        console.log('数据更新成功');
    }
});
```

### 3. 通过cURL测试

```bash
curl -X POST "http://localhost:5000/api/components/line_basic_001/data" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": {"text": "API测试", "left": "center"},
      "series": [{
        "name": "测试数据",
        "type": "line",
        "data": [120, 132, 101, 134, 90, 230, 210]
      }]
    },
    "options": {
      "animation": true,
      "theme": "default"
    }
  }'
```

## 🎬 演示页面

### API测试页面
- **地址：** `http://localhost:5000/api-test`
- **功能：** 测试API接口，查看请求和响应
- **特性：** 支持多种图表类型预设，实时图表预览

### API演示页面
- **地址：** `http://localhost:5000/api-demo`
- **功能：** 演示实时数据更新功能
- **特性：** 自动更新、手动更新、WebSocket实时推送

## 📊 支持的图表类型

1. **折线图** - 时间序列数据、趋势分析
2. **柱状图** - 分类对比、统计报表
3. **饼图** - 占比分析、市场份额
4. **散点图** - 相关性分析、分布研究
5. **雷达图** - 多维度评估、能力分析
6. **仪表盘** - 实时监控、指标展示

## 🔧 配置说明

### 发布页面配置

在组件配置中添加API端点：

```json
{
  "id": "line_basic_001",
  "type": "line_basic",
  "apiEndpoint": "/api/components/line_basic_001/data",
  "refreshInterval": 5
}
```

### 实时更新配置

- **轮询间隔**：默认5秒
- **WebSocket重连**：最多5次，指数退避
- **数据变化检测**：基于JSON字符串比较

## 🚨 注意事项

1. **组件ID格式**：建议使用 `{type}_{name}_{id}` 格式
2. **数据格式**：必须符合ECharts配置规范
3. **性能优化**：大量数据更新时注意性能影响
4. **错误处理**：API调用失败时会记录错误日志
5. **浏览器兼容**：需要支持WebSocket的现代浏览器

## 🐛 故障排除

### 常见问题

1. **WebSocket连接失败**
   - 检查浏览器是否支持WebSocket
   - 确认服务器SocketIO服务正常

2. **API调用失败**
   - 检查组件ID是否正确
   - 确认请求数据格式正确

3. **图表不更新**
   - 检查ECharts实例是否有效
   - 确认数据格式符合图表类型要求

### 调试方法

1. 打开浏览器开发者工具
2. 查看Console日志
3. 检查Network请求
4. 使用API测试页面验证

## 📈 性能建议

1. **数据量控制**：避免单次更新过多数据
2. **更新频率**：合理设置轮询间隔
3. **内存管理**：及时清理不需要的监听器
4. **网络优化**：使用数据压缩和缓存

---

## 🎉 总结

发布页面现在完全支持API数据接收和实时更新，提供了多种数据更新方式：

- ✅ POST API接口
- ✅ WebSocket实时推送  
- ✅ 定时轮询更新
- ✅ 自动重连机制
- ✅ 完整的错误处理
- ✅ 详细的调试信息

通过这些功能，您可以轻松实现数据可视化大屏的实时数据更新！
