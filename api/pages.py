from flask import jsonify, request
import json
import uuid
import os
from datetime import datetime

class PageAPI:
    def __init__(self, app):
        self.app = app
        self.pages_file = 'data/pages.json'
        self.init_routes()
    
    def init_routes(self):
        """初始化路由"""
        self.app.add_url_rule('/api/pages', 'get_pages', self.get_pages, methods=['GET'])
        self.app.add_url_rule('/api/pages', 'create_page', self.create_page, methods=['POST'])
        self.app.add_url_rule('/api/pages/<page_id>', 'get_page', self.get_page, methods=['GET'])
        self.app.add_url_rule('/api/pages/<page_id>', 'update_page', self.update_page, methods=['PUT'])
        self.app.add_url_rule('/api/pages/<page_id>', 'delete_page', self.delete_page, methods=['DELETE'])
        self.app.add_url_rule('/api/pages/<page_id>/publish', 'publish_page', self.publish_page, methods=['POST'])
        self.app.add_url_rule('/api/pages/<page_id>/unpublish', 'unpublish_page', self.unpublish_page, methods=['POST'])
    
    def get_pages(self):
        """获取所有页面列表"""
        try:
            with open(self.pages_file, 'r', encoding='utf-8') as f:
                pages = json.load(f)
            return jsonify(pages)
        except FileNotFoundError:
            return jsonify([])
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def create_page(self):
        """创建新页面"""
        try:
            data = request.get_json()
            page = {
                'id': str(uuid.uuid4()),
                'name': data.get('name', '未命名页面'),
                'description': data.get('description', ''),
                'canvas': data.get('canvas', {
                    'width': 1920,
                    'height': 1080,
                    'backgroundColor': '#1e1e1e',
                    'backgroundImage': ''
                }),
                'components': data.get('components', []),
                'createdAt': datetime.now().isoformat(),
                'updatedAt': datetime.now().isoformat(),
                'published': False
            }
            
            pages = []
            try:
                with open(self.pages_file, 'r', encoding='utf-8') as f:
                    pages = json.load(f)
            except FileNotFoundError:
                pass
            
            pages.append(page)
            
            with open(self.pages_file, 'w', encoding='utf-8') as f:
                json.dump(pages, f, ensure_ascii=False, indent=2)
            
            return jsonify(page), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def get_page(self, page_id):
        """获取指定页面详情"""
        try:
            with open(self.pages_file, 'r', encoding='utf-8') as f:
                pages = json.load(f)
            
            for page in pages:
                if page['id'] == page_id:
                    return jsonify(page)
            
            return jsonify({'error': '页面未找到'}), 404
        except FileNotFoundError:
            return jsonify({'error': '页面未找到'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def update_page(self, page_id):
        """更新指定页面"""
        try:
            data = request.get_json()
            with open(self.pages_file, 'r', encoding='utf-8') as f:
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
                    
                    with open(self.pages_file, 'w', encoding='utf-8') as f:
                        json.dump(pages, f, ensure_ascii=False, indent=2)
                    
                    return jsonify(pages[i])
            
            return jsonify({'error': '页面未找到'}), 404
        except FileNotFoundError:
            return jsonify({'error': '页面未找到'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def delete_page(self, page_id):
        """删除指定页面"""
        try:
            with open(self.pages_file, 'r', encoding='utf-8') as f:
                pages = json.load(f)
            
            original_count = len(pages)
            pages = [page for page in pages if page['id'] != page_id]
            
            if len(pages) == original_count:
                return jsonify({'error': '页面未找到'}), 404
            
            with open(self.pages_file, 'w', encoding='utf-8') as f:
                json.dump(pages, f, ensure_ascii=False, indent=2)
            
            # 删除发布的页面文件
            published_file = f'data/published/{page_id}.json'
            if os.path.exists(published_file):
                os.remove(published_file)
            
            return jsonify({'message': '页面删除成功'})
        except FileNotFoundError:
            return jsonify({'error': '页面未找到'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def publish_page(self, page_id):
        """发布页面"""
        try:
            with open(self.pages_file, 'r', encoding='utf-8') as f:
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
                    
                    with open(self.pages_file, 'w', encoding='utf-8') as f:
                        json.dump(pages, f, ensure_ascii=False, indent=2)
                    
                    return jsonify({
                        'published': True,
                        'publishedUrl': f'/published/{page_id}'
                    })
            
            return jsonify({'error': '页面未找到'}), 404
        except FileNotFoundError:
            return jsonify({'error': '页面未找到'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def unpublish_page(self, page_id):
        """取消发布页面"""
        try:
            with open(self.pages_file, 'r', encoding='utf-8') as f:
                pages = json.load(f)
            
            for i, page in enumerate(pages):
                if page['id'] == page_id:
                    pages[i]['published'] = False
                    pages[i]['updatedAt'] = datetime.now().isoformat()
                    
                    # 删除发布页面文件
                    published_file = f'data/published/{page_id}.json'
                    if os.path.exists(published_file):
                        os.remove(published_file)
                    
                    with open(self.pages_file, 'w', encoding='utf-8') as f:
                        json.dump(pages, f, ensure_ascii=False, indent=2)
                    
                    return jsonify({
                        'published': False,
                        'message': '页面已取消发布'
                    })
            
            return jsonify({'error': '页面未找到'}), 404
        except FileNotFoundError:
            return jsonify({'error': '页面未找到'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500
