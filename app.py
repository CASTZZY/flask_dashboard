# Flask Dashboard 系统 - 按需求文档完全重构
from flask import Flask, render_template, send_from_directory, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
import json
import uuid
import os
from datetime import datetime

# 创建Flask应用
app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 初始化SocketIO
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# 确保数据目录存在
os.makedirs('data', exist_ok=True)
os.makedirs('data/published', exist_ok=True)

# ============= 页面路由 =============

@app.route('/')
def index():
    """主页 - 页面管理"""
    return render_template('manager.html')

@app.route('/editor')
@app.route('/editor/<page_id>')
def editor(page_id=None):
    """编辑器页面"""
    return render_template('editor.html', page_id=page_id)

@app.route('/published/<page_id>')
def published_page(page_id):
    """发布页面"""
    return render_template('published.html', page_id=page_id)

@app.route('/api-docs')
def api_docs():
    """API文档页面"""
    return render_template('api-docs.html')

@app.route('/api-test')
def api_test():
    """API测试页面"""
    return render_template('api-test.html')

@app.route('/api-demo')
def api_demo():
    """API演示页面"""
    return render_template('api-demo.html')

@app.route('/components')
def component_showcase():
    """组件库展示页面"""
    return render_template('component-showcase.html')

# ============= API接口 =============

# 页面管理API
@app.route('/api/pages', methods=['GET'])
def get_pages():
    """获取所有页面列表"""
    try:
        with open('data/pages.json', 'r', encoding='utf-8') as f:
            pages = json.load(f)
        return jsonify(pages)
    except FileNotFoundError:
        return jsonify([])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pages', methods=['POST'])
def create_page():
    """创建新页面"""
    try:
        data = request.get_json()
        page = {
            'id': str(uuid.uuid4()),
            'name': data.get('name', '未命名页面'),
            'description': data.get('description', ''),
            'canvas': {
                'width': data.get('canvas', {}).get('width', 1920),
                'height': data.get('canvas', {}).get('height', 1080),
                'backgroundColor': data.get('canvas', {}).get('backgroundColor', '#f0f0f0'),
                'backgroundImage': data.get('canvas', {}).get('backgroundImage', '')
            },
            'components': data.get('components', []),
            'createdAt': datetime.now().isoformat(),
            'updatedAt': datetime.now().isoformat(),
            'published': False
        }
        
        # 读取现有页面
        pages = []
        try:
            with open('data/pages.json', 'r', encoding='utf-8') as f:
                pages = json.load(f)
        except FileNotFoundError:
            pass
        
        pages.append(page)
        
        # 保存页面
        with open('data/pages.json', 'w', encoding='utf-8') as f:
            json.dump(pages, f, ensure_ascii=False, indent=2)
        
        return jsonify(page), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pages/<page_id>', methods=['GET'])
def get_page(page_id):
    """获取指定页面详情"""
    try:
        with open('data/pages.json', 'r', encoding='utf-8') as f:
            pages = json.load(f)
        
        for page in pages:
            if page['id'] == page_id:
                return jsonify(page)
        
        return jsonify({'error': '页面未找到'}), 404
    except FileNotFoundError:
        return jsonify({'error': '页面未找到'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pages/<page_id>', methods=['PUT'])
def update_page(page_id):
    """更新指定页面"""
    try:
        data = request.get_json()
        with open('data/pages.json', 'r', encoding='utf-8') as f:
            pages = json.load(f)
        
        for i, page in enumerate(pages):
            if page['id'] == page_id:
                pages[i].update({
                    'name': data.get('name', page['name']),
                    'description': data.get('description', page['description']),
                    'canvas': data.get('canvas', page['canvas']),
                    'components': data.get('components', page['components']),
                    'updatedAt': datetime.now().isoformat()
                })
                
                with open('data/pages.json', 'w', encoding='utf-8') as f:
                    json.dump(pages, f, ensure_ascii=False, indent=2)
                
                return jsonify(pages[i])
        
        return jsonify({'error': '页面未找到'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pages/<page_id>', methods=['DELETE'])
def delete_page(page_id):
    """删除指定页面"""
    try:
        with open('data/pages.json', 'r', encoding='utf-8') as f:
            pages = json.load(f)
        
        pages = [page for page in pages if page['id'] != page_id]
        
        with open('data/pages.json', 'w', encoding='utf-8') as f:
            json.dump(pages, f, ensure_ascii=False, indent=2)
        
        # 删除发布文件
        published_file = f'data/published/{page_id}.json'
        if os.path.exists(published_file):
            os.remove(published_file)
        
        return jsonify({'message': '页面删除成功'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pages/<page_id>/publish', methods=['POST'])
def publish_page(page_id):
    """发布页面"""
    try:
        with open('data/pages.json', 'r', encoding='utf-8') as f:
            pages = json.load(f)
        
        for i, page in enumerate(pages):
            if page['id'] == page_id:
                pages[i]['published'] = True
                pages[i]['publishedUrl'] = f'/published/{page_id}'
                pages[i]['updatedAt'] = datetime.now().isoformat()
                
                # 保存发布页面到单独文件
                published_file = f'data/published/{page_id}.json'
                with open(published_file, 'w', encoding='utf-8') as f:
                    json.dump(pages[i], f, ensure_ascii=False, indent=2)
                
                with open('data/pages.json', 'w', encoding='utf-8') as f:
                    json.dump(pages, f, ensure_ascii=False, indent=2)
                
                return jsonify({
                    'published': True,
                    'publishedUrl': f'/published/{page_id}'
                })
        
        return jsonify({'error': '页面未找到'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/pages/<page_id>/unpublish', methods=['POST'])
def unpublish_page(page_id):
    """取消发布页面"""
    try:
        with open('data/pages.json', 'r', encoding='utf-8') as f:
            pages = json.load(f)
        
        for i, page in enumerate(pages):
            if page['id'] == page_id:
                pages[i]['published'] = False
                pages[i]['publishedUrl'] = ''
                pages[i]['updatedAt'] = datetime.now().isoformat()
                
                # 删除发布文件
                published_file = f'data/published/{page_id}.json'
                if os.path.exists(published_file):
                    os.remove(published_file)
                
                with open('data/pages.json', 'w', encoding='utf-8') as f:
                    json.dump(pages, f, ensure_ascii=False, indent=2)
                
                return jsonify({
                    'published': False,
                    'publishedUrl': ''
                })
        
        return jsonify({'error': '页面未找到'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 调试API - 获取所有组件ID
@app.route('/api/debug/components', methods=['GET'])
def debug_components():
    """调试API - 获取所有组件ID"""
    try:
        with open('data/pages.json', 'r', encoding='utf-8') as f:
            pages = json.load(f)
        
        all_components = []
        for page in pages:
            for component in page.get('components', []):
                all_components.append({
                    'page_id': page['id'],
                    'page_name': page['name'],
                    'component_id': component['id'],
                    'component_type': component['type'],
                    'api_url': f'/api/components/{component["id"]}/data'
                })
        
        return jsonify({
            'success': True,
            'components': all_components,
            'total': len(all_components)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 组件数据API - 统一使用POST方式
@app.route('/api/components/<path:component_id>/data', methods=['POST'])
def update_component_data(component_id):
    """
    更新组件数据的POST接口
    向指定的图表组件发送新的数据和配置
    
    请求示例:
    {
        "data": {
            "series": [{
                "name": "销售数据",
                "type": "line", 
                "data": [120, 132, 101, 134, 90, 230, 210]
            }],
            "xAxis": {
                "type": "category",
                "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            "yAxis": {
                "type": "value"
            }
        },
        "options": {
            "title": {
                "text": "周销售数据"
            },
            "animation": true
        }
    }
    """
    try:
        # 获取POST请求的数据
        request_data = request.get_json() or {}
        
        # 示例数据模板 - 实际应用中应该从数据库或外部API获取
        sample_data = {
            'line_basic': {
                'title': {'text': '基础折线图', 'left': 'center'},
                'tooltip': {'trigger': 'axis'},
                'legend': {'data': ['销量']},
                'xAxis': {'type': 'category', 'data': ['周一', '周二', '周三', '周四', '周五', '周六', '周日']},
                'yAxis': {'type': 'value'},
                'series': [{'name': '销量', 'type': 'line', 'data': [120, 132, 101, 134, 90, 230, 210]}]
            },
            'bar_basic': {
                'title': {'text': '基础柱状图', 'left': 'center'},
                'tooltip': {'trigger': 'axis'},
                'legend': {'data': ['销量']},
                'xAxis': {'type': 'category', 'data': ['周一', '周二', '周三', '周四', '周五', '周六', '周日']},
                'yAxis': {'type': 'value'},
                'series': [{'name': '销量', 'type': 'bar', 'data': [120, 200, 150, 80, 70, 110, 130]}]
            },
            'pie_basic': {
                'title': {'text': '基础饼图', 'left': 'center'},
                'tooltip': {'trigger': 'item'},
                'legend': {'orient': 'vertical', 'left': 'left'},
                'series': [{
                    'name': '访问来源',
                    'type': 'pie',
                    'radius': '50%',
                    'data': [
                        {'value': 1048, 'name': '搜索引擎'},
                        {'value': 735, 'name': '直接访问'},
                        {'value': 580, 'name': '邮件营销'},
                        {'value': 484, 'name': '联盟广告'},
                        {'value': 300, 'name': '视频广告'}
                    ],
                    'emphasis': {
                        'itemStyle': {
                            'shadowBlur': 10,
                            'shadowOffsetX': 0,
                            'shadowColor': 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            },
            'scatter_basic': {
                'title': {'text': '基础散点图', 'left': 'center'},
                'tooltip': {},
                'xAxis': {'type': 'value'},
                'yAxis': {'type': 'value'},
                'series': [{
                    'symbolSize': 20,
                    'data': [[10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33]],
                    'type': 'scatter'
                }]
            },
            'radar_basic': {
                'title': {'text': '基础雷达图', 'left': 'center'},
                'tooltip': {},
                'radar': {
                    'indicator': [
                        {'name': '销售', 'max': 6500},
                        {'name': '管理', 'max': 16000},
                        {'name': '信息技术', 'max': 30000},
                        {'name': '客服', 'max': 38000},
                        {'name': '研发', 'max': 52000},
                        {'name': '市场', 'max': 25000}
                    ]
                },
                'series': [{
                    'name': '预算 vs 开销',
                    'type': 'radar',
                    'data': [
                        {'value': [4200, 3000, 20000, 35000, 50000, 18000], 'name': '预算分配'},
                        {'value': [5000, 14000, 28000, 26000, 42000, 21000], 'name': '实际开销'}
                    ]
                }]
            },
            'gauge_basic': {
                'title': {'text': '基础仪表盘', 'left': 'center'},
                'tooltip': {'formatter': '{a} <br/>{b} : {c}%'},
                'series': [{
                    'name': '业务指标',
                    'type': 'gauge',
                    'detail': {'formatter': '{value}%'},
                    'data': [{'value': 50, 'name': 'SCORE'}]
                }]
            },
            'text_basic': {
                'text': '示例文本内容',
                'fontSize': 16,
                'color': '#333333',
                'fontWeight': 'normal',
                'textAlign': 'left',
                'backgroundColor': 'transparent',
                'padding': 12
            },
            'image_basic': {
                'src': 'https://via.placeholder.com/300x200',
                'alt': '图片',
                'objectFit': 'cover'
            },
            'datetime_basic': {
                'format': 'YYYY-MM-DD HH:mm:ss',
                'showSeconds': True,
                'fontSize': 16,
                'color': '#333333',
                'textAlign': 'center'
            }
        }
        
        # 根据组件类型获取基础数据
        component_type = component_id.split('_')[0] + '_' + component_id.split('_')[1] if '_' in component_id else component_id
        base_data = sample_data.get(component_type, {})
        
        # 如果请求中包含自定义参数，进行数据处理
        if request_data:
            # 支持日期范围过滤
            if 'dateRange' in request_data:
                start_date = request_data['dateRange'].get('start')
                end_date = request_data['dateRange'].get('end')
                # 这里可以根据日期范围过滤数据
                print(f"日期范围过滤: {start_date} 到 {end_date}")
                
            # 支持数据维度选择
            if 'dimensions' in request_data:
                dimensions = request_data['dimensions']
                # 这里可以根据维度过滤数据
                print(f"数据维度: {dimensions}")
                
            # 支持自定义查询条件
            if 'filters' in request_data:
                filters = request_data['filters']
                # 这里可以根据过滤条件处理数据
                print(f"过滤条件: {filters}")
                
            # 支持数据聚合
            if 'aggregation' in request_data:
                aggregation = request_data['aggregation']
                print(f"聚合方式: {aggregation}")
                
            # 支持数据限制
            if 'limit' in request_data:
                limit = request_data['limit']
                print(f"数据限制: {limit}")
        
        # 验证请求数据格式
        if 'data' not in request_data:
            return jsonify({
                'success': False,
                'error': '请求体必须包含data字段',
                'component_id': component_id,
                'timestamp': datetime.now().isoformat()
            }), 400
        
        # 获取组件数据
        component_data = request_data.get('data', {})
        component_options = request_data.get('options', {})
        
        # 合并数据和选项
        final_data = {**component_data, **component_options}
        
        # 模拟数据更新成功
        print(f"📊 组件 {component_id} 数据更新:")
        print(f"   数据: {component_data}")
        print(f"   选项: {component_options}")
        
        # 返回更新后的数据，供前端实时更新图表
        # 通过WebSocket广播数据更新
        # 广播到所有连接的客户端，不限制房间
        socketio.emit('data_update', {
            'component_id': component_id,
            'data': final_data,
            'timestamp': datetime.now().isoformat()
        })
        
        # 同时广播到特定页面房间（如果组件ID包含页面信息）
        if '_' in component_id:
            page_room = f'page_{component_id.split("_")[0]}'
            socketio.emit('data_update', {
                'component_id': component_id,
                'data': final_data,
                'timestamp': datetime.now().isoformat()
            }, room=page_room)
            print(f"📡 广播到房间: {page_room}")
        
        print(f"📡 广播到所有客户端")
        
        return jsonify({
            'success': True,
            'message': '图表数据更新成功',
            'component_id': component_id,
            'data': final_data,
            'timestamp': datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        print(f"组件数据API错误: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'component_id': component_id,
            'timestamp': datetime.now().isoformat()
        }), 500

# 静态文件服务
@app.route('/static/<path:filename>')
def static_files(filename):
    """静态文件服务"""
    return send_from_directory('static', filename)

# 错误处理
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': '资源未找到'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': '服务器内部错误'}), 500

# WebSocket事件处理
@socketio.on('connect')
def handle_connect():
    print(f'🔌 客户端已连接: {request.sid}')
    emit('connected', {'message': '连接成功'})

@socketio.on('disconnect')
def handle_disconnect():
    print(f'🔌 客户端已断开: {request.sid}')

@socketio.on('subscribe')
def handle_subscribe(data):
    """订阅页面数据更新"""
    page_id = data.get('pageId')
    if page_id:
        join_room(f'page_{page_id}')
        print(f'📡 客户端 {request.sid} 订阅页面 {page_id}')
        emit('subscribed', {'pageId': page_id, 'message': '订阅成功'})

@socketio.on('unsubscribe')
def handle_unsubscribe(data):
    """取消订阅页面数据更新"""
    page_id = data.get('pageId')
    if page_id:
        leave_room(f'page_{page_id}')
        print(f'📡 客户端 {request.sid} 取消订阅页面 {page_id}')
        emit('unsubscribed', {'pageId': page_id, 'message': '取消订阅成功'})

@socketio.on('request_data')
def handle_request_data(data):
    """处理数据请求"""
    component_id = data.get('componentId')
    if component_id:
        # 这里可以添加获取组件数据的逻辑
        emit('data_response', {
            'componentId': component_id,
            'data': {},
            'message': '数据请求已处理'
        })

if __name__ == '__main__':
    print("🚀 Flask Dashboard 系统启动")
    print("📋 管理页面: http://localhost:5000")
    print("🎨 编辑器: http://localhost:5000/editor")
    print("📚 API文档: http://localhost:5000/api-docs")
    print("🧪 API测试: http://localhost:5000/api-test")
    print("🎬 API演示: http://localhost:5000/api-demo")
    print("🔌 WebSocket支持已启用")
    print("=" * 50)
    socketio.run(app, debug=True, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)