/**
 * API示例生成器
 * 为不同类型的图表组件生成详细的POSTMAN测试案例
 */

class ApiExamples {
    /**
     * 生成饼图API示例
     */
    static generatePieChartExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>🥧 饼图 POSTMAN测试案例</h5>
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
      "text": "市场份额分布",
      "left": "center"
    },
    "tooltip": {
      "trigger": "item",
      "formatter": "{a} <br/>{b}: {c} ({d}%)"
    },
    "legend": {
      "orient": "vertical",
      "left": "left"
    },
    "series": [
      {
        "name": "访问来源",
        "type": "pie",
        "radius": "50%",
        "data": [
          {"value": 1048, "name": "搜索引擎"},
          {"value": 735, "name": "直接访问"},
          {"value": 580, "name": "邮件营销"},
          {"value": 484, "name": "联盟广告"},
          {"value": 300, "name": "视频广告"}
        ],
        "emphasis": {
          "itemStyle": {
            "shadowBlur": 10,
            "shadowOffsetX": 0,
            "shadowColor": "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  },
  "options": {
    "animation": true,
    "theme": "default"
  }
}</pre>
                    
                    <p><strong>环形饼图示例:</strong></p>
                    <pre>{
  "data": {
    "series": [
      {
        "name": "销售渠道",
        "type": "pie",
        "radius": ["40%", "70%"],
        "data": [
          {"value": 1048, "name": "线上"},
          {"value": 735, "name": "线下"},
          {"value": 580, "name": "代理"},
          {"value": 484, "name": "直销"}
        ]
      }
    ]
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "饼图数据更新成功",
  "component_id": "${componentInfo.id}",
  "data_items": 5,
  "total_value": 3147,
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成散点图API示例
     */
    static generateScatterChartExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>🔵 散点图 POSTMAN测试案例</h5>
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
      "text": "身高体重关系分析",
      "left": "center"
    },
    "tooltip": {
      "trigger": "item"
    },
    "xAxis": {
      "type": "value",
      "name": "身高 (cm)",
      "nameLocation": "middle",
      "nameGap": 30
    },
    "yAxis": {
      "type": "value",
      "name": "体重 (kg)",
      "nameLocation": "middle",
      "nameGap": 50
    },
    "series": [
      {
        "name": "男性",
        "type": "scatter",
        "data": [
          [170, 65], [175, 70], [180, 75], [185, 80], [190, 85],
          [165, 60], [172, 68], [178, 72], [182, 78], [188, 82]
        ],
        "symbolSize": 8,
        "itemStyle": {
          "color": "#5470c6"
        }
      },
      {
        "name": "女性",
        "type": "scatter",
        "data": [
          [160, 50], [165, 55], [170, 60], [175, 65], [180, 70],
          [155, 45], [162, 52], [168, 58], [173, 63], [178, 68]
        ],
        "symbolSize": 8,
        "itemStyle": {
          "color": "#91cc75"
        }
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
  "message": "散点图数据更新成功",
  "component_id": "${componentInfo.id}",
  "data_points": 20,
  "series_count": 2,
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成雷达图API示例
     */
    static generateRadarChartExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>🕸️ 雷达图 POSTMAN测试案例</h5>
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
      "text": "能力评估雷达图",
      "left": "center"
    },
    "tooltip": {},
    "legend": {
      "data": ["预算分配", "实际开销"]
    },
    "radar": {
      "indicator": [
        {"name": "销售", "max": 6500},
        {"name": "管理", "max": 16000},
        {"name": "信息技术", "max": 30000},
        {"name": "客服", "max": 38000},
        {"name": "研发", "max": 52000},
        {"name": "市场", "max": 25000}
      ]
    },
    "series": [
      {
        "name": "预算分配",
        "type": "radar",
        "data": [
          {
            "value": [4200, 3000, 20000, 35000, 50000, 18000],
            "name": "预算分配"
          }
        ]
      },
      {
        "name": "实际开销",
        "type": "radar",
        "data": [
          {
            "value": [5000, 14000, 28000, 26000, 42000, 21000],
            "name": "实际开销"
          }
        ]
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
  "message": "雷达图数据更新成功",
  "component_id": "${componentInfo.id}",
  "indicators": 6,
  "series_count": 2,
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成仪表盘API示例
     */
    static generateGaugeChartExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>⏱️ 仪表盘 POSTMAN测试案例</h5>
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
      "text": "系统性能监控",
      "left": "center"
    },
    "tooltip": {
      "formatter": "{a} <br/>{b} : {c}%"
    },
    "series": [
      {
        "name": "CPU使用率",
        "type": "gauge",
        "detail": {
          "formatter": "{value}%"
        },
        "data": [
          {
            "value": 50,
            "name": "CPU"
          }
        ]
      }
    ]
  },
  "options": {
    "animation": true,
    "theme": "default"
  }
}</pre>
                    
                    <p><strong>多仪表盘示例:</strong></p>
                    <pre>{
  "data": {
    "series": [
      {
        "name": "CPU使用率",
        "type": "gauge",
        "center": ["25%", "50%"],
        "data": [{"value": 50, "name": "CPU"}]
      },
      {
        "name": "内存使用率",
        "type": "gauge",
        "center": ["75%", "50%"],
        "data": [{"value": 70, "name": "内存"}]
      }
    ]
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "仪表盘数据更新成功",
  "component_id": "${componentInfo.id}",
  "gauge_count": 1,
  "current_value": 50,
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成文本组件API示例
     */
    static generateTextComponentExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>📝 文本组件 POSTMAN测试案例</h5>
                <div class="postman-example">
                    <p><strong>请求URL:</strong></p>
                    <code>${window.location.origin}/api/components/${componentInfo.id}/data</code>
                    
                    <p><strong>请求方法:</strong> POST</p>
                    <p><strong>请求头:</strong></p>
                    <pre>Content-Type: application/json</pre>
                    
                    <p><strong>基础请求体示例:</strong></p>
                    <pre>{
  "data": {
    "text": "欢迎使用数据可视化平台",
    "fontSize": 18,
    "color": "#333333",
    "fontWeight": "bold",
    "textAlign": "center",
    "backgroundColor": "transparent",
    "padding": 20
  },
  "options": {
    "animation": true
  }
}</pre>
                    
                    <p><strong>富文本示例:</strong></p>
                    <pre>{
  "data": {
    "text": "<h2>系统状态</h2><p>当前在线用户: <strong>1,234</strong></p><p>服务器状态: <span style='color: green;'>正常</span></p>",
    "fontSize": 16,
    "color": "#333333",
    "textAlign": "left",
    "backgroundColor": "#f5f5f5",
    "padding": 15
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "文本组件数据更新成功",
  "component_id": "${componentInfo.id}",
  "text_length": 12,
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成图片组件API示例
     */
    static generateImageComponentExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>🖼️ 图片组件 POSTMAN测试案例</h5>
                <div class="postman-example">
                    <p><strong>请求URL:</strong></p>
                    <code>${window.location.origin}/api/components/${componentInfo.id}/data</code>
                    
                    <p><strong>请求方法:</strong> POST</p>
                    <p><strong>请求头:</strong></p>
                    <pre>Content-Type: application/json</pre>
                    
                    <p><strong>基础请求体示例:</strong></p>
                    <pre>{
  "data": {
    "src": "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=示例图片",
    "alt": "示例图片",
    "objectFit": "cover",
    "width": "100%",
    "height": "300px"
  },
  "options": {
    "animation": true
  }
}</pre>
                    
                    <p><strong>本地图片示例:</strong></p>
                    <pre>{
  "data": {
    "src": "/static/images/chart-preview.png",
    "alt": "图表预览",
    "objectFit": "contain",
    "width": "300px",
    "height": "200px"
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "图片组件数据更新成功",
  "component_id": "${componentInfo.id}",
  "image_src": "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=示例图片",
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成时间组件API示例
     */
    static generateDateTimeComponentExamples(componentInfo) {
        return `
            <div class="api-example">
                <h5>🕐 时间组件 POSTMAN测试案例</h5>
                <div class="postman-example">
                    <p><strong>请求URL:</strong></p>
                    <code>${window.location.origin}/api/components/${componentInfo.id}/data</code>
                    
                    <p><strong>请求方法:</strong> POST</p>
                    <p><strong>请求头:</strong></p>
                    <pre>Content-Type: application/json</pre>
                    
                    <p><strong>基础请求体示例:</strong></p>
                    <pre>{
  "data": {
    "format": "YYYY-MM-DD HH:mm:ss",
    "showSeconds": true,
    "fontSize": 18,
    "color": "#333333",
    "textAlign": "center",
    "timezone": "Asia/Shanghai"
  },
  "options": {
    "animation": true,
    "autoUpdate": true
  }
}</pre>
                    
                    <p><strong>自定义格式示例:</strong></p>
                    <pre>{
  "data": {
    "format": "MM月DD日 HH:mm",
    "showSeconds": false,
    "fontSize": 16,
    "color": "#666666",
    "textAlign": "left",
    "timezone": "UTC"
  }
}</pre>
                    
                    <p><strong>响应示例 (成功):</strong></p>
                    <pre>{
  "success": true,
  "message": "时间组件数据更新成功",
  "component_id": "${componentInfo.id}",
  "format": "YYYY-MM-DD HH:mm:ss",
  "timezone": "Asia/Shanghai",
  "timestamp": "2024-01-15T10:30:00.000Z"
}</pre>
                </div>
            </div>
        `;
    }
    
    /**
     * 生成默认API示例
     */
    static generateDefaultExamples(componentInfo) {
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
}

// 导出API示例生成器
window.ApiExamples = ApiExamples;
