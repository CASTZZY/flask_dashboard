# Flask Dashboard 调试指南

## 🚨 问题解决

### VS Code调试器执行非Python文件的问题

**问题描述**：当 `launch.json` 或其他非Python文件是当前焦点时，VS Code调试器会尝试将其作为Python脚本执行，导致语法错误。

**解决方案**：

1. **使用专用的Flask启动脚本**：
   - 创建了 `run_flask.py` 作为Flask应用的入口点
   - 调试器现在默认使用这个脚本而不是 `app.py`

2. **配置了默认调试配置**：
   - 设置 `"defaultConfiguration": "Python Debugger: Flask App"`
   - 确保调试器默认运行Flask应用

3. **添加了文件类型过滤**：
   - 在 "Current File" 配置中添加了规则，跳过非Python文件
   - 防止意外执行JSON、HTML、JS、CSS文件

## 🎯 使用方法

### 方法1：使用VS Code调试器（推荐）

1. 按 `F5` 或点击调试按钮
2. 选择 "Python Debugger: Flask App"
3. 应用将在调试模式下启动

### 方法2：使用命令行

```bash
# 使用Python 3.13
py -3.13 run_flask.py

# 或直接运行app.py
py -3.13 app.py
```

### 方法3：使用批处理文件

```bash
# 创建批处理文件
start_app.bat
```

## 📋 调试配置说明

### 配置1：Python Debugger: Flask App
- **用途**：调试Flask应用
- **程序**：`run_flask.py`
- **特点**：包含WebSocket支持，适合完整应用调试

### 配置2：Python Debugger: Current File (Python only)
- **用途**：调试当前Python文件
- **程序**：`${file}`
- **特点**：自动跳过非Python文件，避免语法错误

## 🔧 故障排除

### 问题1：调试器执行launch.json
**解决**：确保选择正确的调试配置，或按 `Ctrl+Shift+P` 搜索 "Debug: Select and Start Debugging"

### 问题2：模块导入错误
**解决**：确保在项目根目录下运行，或检查Python路径设置

### 问题3：WebSocket连接失败
**解决**：检查端口5000是否被占用，或重启应用

## 📝 注意事项

1. **文件焦点**：调试时确保焦点在Python文件上，而不是配置文件
2. **端口占用**：确保5000端口未被其他应用占用
3. **依赖安装**：确保所有依赖都已正确安装
4. **Python版本**：推荐使用Python 3.13

## 🎉 总结

通过以上配置，现在可以安全地使用VS Code调试器，不会再出现执行非Python文件的错误。Flask Dashboard应用可以正常启动和调试！
