from flask import jsonify, request
import json
import random
import math
from datetime import datetime, timedelta

class ComponentAPI:
    def __init__(self, app):
        self.app = app
        self.init_routes()
    
    def init_routes(self):
        """初始化路由"""
        self.app.add_url_rule('/api/components/<component_id>/data', 'get_component_data', self.get_component_data, methods=['GET'])
        self.app.add_url_rule('/api/components/<component_id>/data', 'update_component_data', self.update_component_data, methods=['POST'])
        self.app.add_url_rule('/api/data/<data_type>', 'get_sample_data', self.get_sample_data, methods=['GET'])
    
    def get_component_data(self, component_id):
        """获取组件数据"""
        try:
            # 根据component_id返回不同的示例数据
            component_type = component_id.split('_')[0] if '_' in component_id else component_id
            
            data = self.generate_sample_data(component_type)
            return jsonify(data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def update_component_data(self, component_id):
        """更新组件数据"""
        try:
            data = request.get_json()
            # 这里可以实现数据持久化逻辑
            return jsonify(data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def get_sample_data(self, data_type):
        """获取示例数据"""
        try:
            data = self.generate_sample_data(data_type)
            return jsonify(data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    def generate_sample_data(self, data_type):
        """生成示例数据"""
        if data_type in ['bar', 'column']:
            return {
                'title': {'text': '柱状图示例'},
                'tooltip': {},
                'legend': {'data': ['销量']},
                'xAxis': {
                    'data': ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                'yAxis': {},
                'series': [{
                    'name': '销量',
                    'type': 'bar',
                    'data': [5, 20, 36, 10, 10, 20]
                }]
            }
        
        elif data_type == 'line':
            return {
                'title': {'text': '折线图示例'},
                'tooltip': {'trigger': 'axis'},
                'legend': {'data': ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']},
                'grid': {
                    'left': '3%',
                    'right': '4%',
                    'bottom': '3%',
                    'containLabel': True
                },
                'toolbox': {
                    'feature': {
                        'saveAsImage': {}
                    }
                },
                'xAxis': {
                    'type': 'category',
                    'boundaryGap': False,
                    'data': ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                'yAxis': {
                    'type': 'value'
                },
                'series': [
                    {
                        'name': '邮件营销',
                        'type': 'line',
                        'stack': '总量',
                        'data': [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        'name': '联盟广告',
                        'type': 'line',
                        'stack': '总量',
                        'data': [220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            }
        
        elif data_type == 'pie':
            return {
                'title': {
                    'text': '饼图示例',
                    'left': 'center'
                },
                'tooltip': {
                    'trigger': 'item'
                },
                'legend': {
                    'orient': 'vertical',
                    'left': 'left'
                },
                'series': [
                    {
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
                    }
                ]
            }
        
        elif data_type == 'scatter':
            data = []
            for i in range(100):
                data.append([
                    random.uniform(0, 100),
                    random.uniform(0, 100),
                    random.randint(10, 100)
                ])
            
            return {
                'title': {'text': '散点图示例'},
                'xAxis': {},
                'yAxis': {},
                'series': [{
                    'symbolSize': lambda data: data[2] / 5,
                    'data': data,
                    'type': 'scatter'
                }]
            }
        
        elif data_type == 'radar':
            return {
                'title': {'text': '雷达图示例'},
                'tooltip': {},
                'legend': {
                    'data': ['预算分配', '实际开销']
                },
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
                        {
                            'value': [4200, 3000, 20000, 35000, 50000, 18000],
                            'name': '预算分配'
                        },
                        {
                            'value': [5000, 14000, 28000, 31000, 42000, 21000],
                            'name': '实际开销'
                        }
                    ]
                }]
            }
        
        elif data_type == 'gauge':
            return {
                'title': {'text': '仪表盘示例'},
                'series': [
                    {
                        'name': '业务指标',
                        'type': 'gauge',
                        'detail': {'formatter': '{value}%'},
                        'data': [{'value': 50, 'name': 'SCORE'}]
                    }
                ]
            }
        
        elif data_type == 'funnel':
            return {
                'title': {'text': '漏斗图示例'},
                'tooltip': {
                    'trigger': 'item',
                    'formatter': '{a} <br/>{b} : {c}%'
                },
                'toolbox': {
                    'feature': {
                        'dataView': {'readOnly': False},
                        'restore': {},
                        'saveAsImage': {}
                    }
                },
                'legend': {
                    'data': ['展现', '点击', '访问', '咨询', '订单']
                },
                'series': [
                    {
                        'name': '漏斗图',
                        'type': 'funnel',
                        'left': '10%',
                        'top': 60,
                        'bottom': 60,
                        'width': '80%',
                        'min': 0,
                        'max': 100,
                        'minSize': '0%',
                        'maxSize': '100%',
                        'sort': 'descending',
                        'gap': 2,
                        'label': {
                            'show': True,
                            'position': 'inside'
                        },
                        'labelLine': {
                            'length': 10,
                            'lineStyle': {
                                'width': 1,
                                'type': 'solid'
                            }
                        },
                        'itemStyle': {
                            'borderColor': '#fff',
                            'borderWidth': 1
                        },
                        'emphasis': {
                            'label': {
                                'fontSize': 20
                            }
                        },
                        'data': [
                            {'value': 60, 'name': '访问'},
                            {'value': 40, 'name': '咨询'},
                            {'value': 20, 'name': '订单'},
                            {'value': 80, 'name': '点击'},
                            {'value': 100, 'name': '展现'}
                        ]
                    }
                ]
            }
        
        elif data_type == 'heatmap':
            hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a', '10a', '11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p']
            days = ['Saturday', 'Friday', 'Thursday',
                   'Wednesday', 'Tuesday', 'Monday', 'Sunday']
            
            data = []
            for i in range(len(days)):
                for j in range(len(hours)):
                    data.append([j, i, random.randint(0, 10)])
            
            return {
                'title': {'text': '热力图示例'},
                'tooltip': {
                    'position': 'top'
                },
                'animation': False,
                'grid': {
                    'height': '50%',
                    'top': '10%'
                },
                'xAxis': {
                    'type': 'category',
                    'data': hours,
                    'splitArea': {
                        'show': True
                    }
                },
                'yAxis': {
                    'type': 'category',
                    'data': days,
                    'splitArea': {
                        'show': True
                    }
                },
                'visualMap': {
                    'min': 0,
                    'max': 10,
                    'calculable': True,
                    'orient': 'horizontal',
                    'left': 'center',
                    'bottom': '15%'
                },
                'series': [{
                    'name': 'Punch Card',
                    'type': 'heatmap',
                    'data': data,
                    'label': {
                        'show': True
                    },
                    'emphasis': {
                        'itemStyle': {
                            'shadowBlur': 10,
                            'shadowColor': 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }
        
        elif data_type == 'candlestick':
            # K线图数据
            dates = []
            data = []
            base_date = datetime.now() - timedelta(days=30)
            
            for i in range(30):
                current_date = base_date + timedelta(days=i)
                dates.append(current_date.strftime('%Y-%m-%d'))
                
                # 生成OHLC数据 [开盘, 收盘, 最低, 最高]
                open_price = 20 + random.uniform(-2, 2)
                close_price = open_price + random.uniform(-3, 3)
                low_price = min(open_price, close_price) - random.uniform(0, 2)
                high_price = max(open_price, close_price) + random.uniform(0, 2)
                
                data.append([open_price, close_price, low_price, high_price])
            
            return {
                'title': {'text': 'K线图示例'},
                'xAxis': {
                    'data': dates
                },
                'yAxis': {},
                'series': [
                    {
                        'type': 'candlestick',
                        'data': data
                    }
                ]
            }
        
        else:
            # 默认返回基础数据
            return {
                'title': {'text': f'{data_type}示例'},
                'xAxis': {
                    'type': 'category',
                    'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                'yAxis': {
                    'type': 'value'
                },
                'series': [{
                    'data': [120, 200, 150, 80, 70, 110, 130],
                    'type': 'bar'
                }]
            }
