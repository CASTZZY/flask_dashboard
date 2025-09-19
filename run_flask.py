#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask Dashboard 启动脚本
避免VS Code调试器执行非Python文件的问题
"""

if __name__ == "__main__":
    # 导入并运行Flask应用
    from app import app, socketio
    
    print("🚀 启动Flask Dashboard系统")
    print("📋 管理页面: http://localhost:5000")
    print("🎨 编辑器: http://localhost:5000/editor")
    print("📚 API文档: http://localhost:5000/api-docs")
    print("🧪 API测试: http://localhost:5000/api-test")
    print("🎬 API演示: http://localhost:5000/api-demo")
    print("🔌 WebSocket支持已启用")
    print("=" * 50)
    
    # 运行应用
    socketio.run(app, debug=True, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
