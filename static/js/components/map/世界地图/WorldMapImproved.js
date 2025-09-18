// 改进的世界地图组件
const WorldMapImproved = {
  id: "map_004",
  type: "echarts",
  name: "改进世界地图",
  icon: "🌍",
  category: "map",
  subCategory: "地理地图",
  defaultProps: {
    title: {
      text: '改进世界地图'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function(params) {
        if (params.value) {
          return params.name + ': ' + params.value.toLocaleString();
        } else {
          return params.name;
        }
      }
    },
    visualMap: {
      show: true,
      min: 0,
      max: 1500000000,
      inRange: {
        color: ['#f7fbff', '#08306b']
      },
      textStyle: {
        color: '#000'
      }
    },
    series: [{
      name: '世界地图',
      type: 'map',
      map: 'world',
      roam: true,
      scaleLimit: {
        min: 1,
        max: 2
      },
      label: {
        show: false,
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#333',
        borderWidth: 0.5,
        emphasis: {
          areaColor: '#2a333d'
        }
      },
      data: [
        { name: 'China', value: 1400000000 },
        { name: 'India', value: 1300000000 },
        { name: 'United States', value: 330000000 },
        { name: 'Indonesia', value: 270000000 },
        { name: 'Pakistan', value: 220000000 },
        { name: 'Brazil', value: 210000000 },
        { name: 'Nigeria', value: 200000000 },
        { name: 'Bangladesh', value: 170000000 },
        { name: 'Russia', value: 145000000 },
        { name: 'Mexico', value: 130000000 },
        { name: 'Japan', value: 126000000 },
        { name: 'Ethiopia', value: 114000000 },
        { name: 'Philippines', value: 109000000 },
        { name: 'Egypt', value: 102000000 },
        { name: 'Vietnam', value: 97000000 },
        { name: 'Turkey', value: 84000000 },
        { name: 'Iran', value: 84000000 },
        { name: 'Germany', value: 83000000 },
        { name: 'Thailand', value: 69000000 },
        { name: 'United Kingdom', value: 67000000 },
        { name: 'France', value: 67000000 },
        { name: 'Tanzania', value: 59000000 },
        { name: 'South Africa', value: 59000000 },
        { name: 'Italy', value: 60000000 },
        { name: 'South Korea', value: 51000000 },
        { name: 'Myanmar', value: 54000000 },
        { name: 'Kenya', value: 54000000 },
        { name: 'Spain', value: 47000000 },
        { name: 'Ukraine', value: 44000000 },
        { name: 'Argentina', value: 45000000 },
        { name: 'Algeria', value: 44000000 },
        { name: 'Sudan', value: 43000000 },
        { name: 'Uganda', value: 43000000 },
        { name: 'Iraq', value: 40000000 },
        { name: 'Poland', value: 38000000 },
        { name: 'Canada', value: 38000000 },
        { name: 'Morocco', value: 37000000 },
        { name: 'Saudi Arabia', value: 35000000 },
        { name: 'Uzbekistan', value: 34000000 },
        { name: 'Malaysia', value: 33000000 },
        { name: 'Peru', value: 33000000 },
        { name: 'Venezuela', value: 28000000 },
        { name: 'Nepal', value: 29000000 },
        { name: 'Angola', value: 32000000 },
        { name: 'Ghana', value: 31000000 },
        { name: 'Yemen', value: 30000000 },
        { name: 'Mozambique', value: 31000000 },
        { name: 'Madagascar', value: 28000000 },
        { name: 'North Korea', value: 25000000 },
        { name: 'Australia', value: 25000000 },
        { name: 'Cameroon', value: 26000000 },
        { name: 'Côte d\'Ivoire', value: 26000000 },
        { name: 'Niger', value: 24000000 },
        { name: 'Sri Lanka', value: 21000000 },
        { name: 'Burkina Faso', value: 21000000 },
        { name: 'Malawi', value: 19000000 },
        { name: 'Mali', value: 20000000 },
        { name: 'Romania', value: 19000000 },
        { name: 'Kazakhstan', value: 19000000 },
        { name: 'Syria', value: 18000000 },
        { name: 'Chile', value: 19000000 },
        { name: 'Zambia', value: 18000000 },
        { name: 'Guatemala', value: 18000000 },
        { name: 'Netherlands', value: 17000000 },
        { name: 'Ecuador', value: 17000000 },
        { name: 'Zimbabwe', value: 17000000 },
        { name: 'Cambodia', value: 16000000 },
        { name: 'Senegal', value: 16000000 },
        { name: 'Chad', value: 16000000 },
        { name: 'Somalia', value: 15000000 },
        { name: 'Guinea', value: 13000000 },
        { name: 'South Sudan', value: 13000000 },
        { name: 'Rwanda', value: 13000000 },
        { name: 'Benin', value: 12000000 },
        { name: 'Tunisia', value: 12000000 },
        { name: 'Burundi', value: 12000000 },
        { name: 'Belgium', value: 12000000 },
        { name: 'Cuba', value: 11000000 },
        { name: 'Bolivia', value: 11000000 },
        { name: 'Haiti', value: 11000000 },
        { name: 'Greece', value: 10000000 },
        { name: 'Dominican Republic', value: 11000000 },
        { name: 'Czech Republic', value: 11000000 },
        { name: 'Portugal', value: 10000000 },
        { name: 'Jordan', value: 10000000 },
        { name: 'Sweden', value: 10000000 },
        { name: 'Azerbaijan', value: 10000000 },
        { name: 'United Arab Emirates', value: 10000000 },
        { name: 'Hungary', value: 10000000 },
        { name: 'Belarus', value: 9000000 },
        { name: 'Honduras', value: 9000000 },
        { name: 'Austria', value: 9000000 },
        { name: 'Tajikistan', value: 9000000 },
        { name: 'Serbia', value: 9000000 },
        { name: 'Switzerland', value: 8000000 },
        { name: 'Papua New Guinea', value: 9000000 },
        { name: 'Israel', value: 9000000 },
        { name: 'Togo', value: 8000000 },
        { name: 'Sierra Leone', value: 8000000 },
        { name: 'Hong Kong', value: 7000000 },
        { name: 'Laos', value: 7000000 },
        { name: 'Bulgaria', value: 7000000 },
        { name: 'Paraguay', value: 7000000 },
        { name: 'Libya', value: 7000000 },
        { name: 'Lebanon', value: 7000000 },
        { name: 'Nicaragua', value: 7000000 },
        { name: 'Kyrgyzstan', value: 6000000 },
        { name: 'El Salvador', value: 6000000 },
        { name: 'Turkmenistan', value: 6000000 },
        { name: 'Singapore', value: 6000000 },
        { name: 'Denmark', value: 6000000 },
        { name: 'Finland', value: 6000000 },
        { name: 'Congo', value: 5000000 },
        { name: 'Slovakia', value: 5000000 },
        { name: 'Norway', value: 5000000 },
        { name: 'Eritrea', value: 5000000 },
        { name: 'State of Palestine', value: 5000000 },
        { name: 'Oman', value: 5000000 },
        { name: 'Costa Rica', value: 5000000 },
        { name: 'Liberia', value: 5000000 },
        { name: 'New Zealand', value: 5000000 },
        { name: 'Central African Republic', value: 5000000 },
        { name: 'Mauritania', value: 4000000 },
        { name: 'Panama', value: 4000000 },
        { name: 'Kuwait', value: 4000000 },
        { name: 'Croatia', value: 4000000 },
        { name: 'Moldova', value: 4000000 },
        { name: 'Georgia', value: 4000000 },
        { name: 'Puerto Rico', value: 4000000 },
        { name: 'Uruguay', value: 4000000 },
        { name: 'Mongolia', value: 3000000 },
        { name: 'Albania', value: 3000000 },
        { name: 'Armenia', value: 3000000 },
        { name: 'Jamaica', value: 3000000 },
        { name: 'Lithuania', value: 3000000 },
        { name: 'Qatar', value: 3000000 },
        { name: 'Namibia', value: 3000000 },
        { name: 'Botswana', value: 2000000 },
        { name: 'Lesotho', value: 2000000 },
        { name: 'Gambia', value: 2000000 },
        { name: 'Gabon', value: 2000000 },
        { name: 'North Macedonia', value: 2000000 },
        { name: 'Slovenia', value: 2000000 },
        { name: 'Guinea-Bissau', value: 2000000 },
        { name: 'Latvia', value: 2000000 },
        { name: 'Bahrain', value: 1000000 },
        { name: 'Swaziland', value: 1000000 },
        { name: 'Trinidad and Tobago', value: 1000000 },
        { name: 'Equatorial Guinea', value: 1000000 },
        { name: 'Timor-Leste', value: 1000000 },
        { name: 'Estonia', value: 1000000 },
        { name: 'Mauritius', value: 1000000 },
        { name: 'Cyprus', value: 1000000 },
        { name: 'Djibouti', value: 1000000 },
        { name: 'Fiji', value: 900000 },
        { name: 'Comoros', value: 800000 },
        { name: 'Guyana', value: 800000 },
        { name: 'Bhutan', value: 800000 },
        { name: 'Solomon Islands', value: 700000 },
        { name: 'Macau', value: 700000 },
        { name: 'Luxembourg', value: 600000 },
        { name: 'Montenegro', value: 600000 },
        { name: 'Western Sahara', value: 600000 },
        { name: 'Suriname', value: 600000 },
        { name: 'Cabo Verde', value: 500000 },
        { name: 'Micronesia', value: 500000 },
        { name: 'Maldives', value: 500000 },
        { name: 'Guam', value: 200000 },
        { name: 'Malta', value: 500000 },
        { name: 'Brunei', value: 400000 },
        { name: 'Belize', value: 400000 },
        { name: 'Bahamas', value: 400000 },
        { name: 'Martinique', value: 400000 },
        { name: 'Iceland', value: 300000 },
        { name: 'French Guiana', value: 300000 },
        { name: 'French Polynesia', value: 300000 },
        { name: 'Vanuatu', value: 300000 },
        { name: 'Barbados', value: 300000 },
        { name: 'New Caledonia', value: 300000 },
        { name: 'Mayotte', value: 200000 },
        { name: 'Samoa', value: 200000 },
        { name: 'Sao Tome and Principe', value: 200000 },
        { name: 'Saint Lucia', value: 200000 },
        { name: 'Channel Islands', value: 200000 },
        { name: 'Guadeloupe', value: 400000 },
        { name: 'Curaçao', value: 200000 },
        { name: 'Kiribati', value: 100000 },
        { name: 'Grenada', value: 100000 },
        { name: 'St. Vincent & Grenadines', value: 100000 },
        { name: 'Aruba', value: 100000 },
        { name: 'United States Virgin Islands', value: 100000 },
        { name: 'Antigua and Barbuda', value: 100000 },
        { name: 'Seychelles', value: 100000 },
        { name: 'Isle of Man', value: 90000 },
        { name: 'Andorra', value: 80000 },
        { name: 'Dominica', value: 70000 },
        { name: 'Cayman Islands', value: 70000 },
        { name: 'Bermuda', value: 70000 },
        { name: 'Greenland', value: 60000 },
        { name: 'Saint Kitts and Nevis', value: 50000 },
        { name: 'American Samoa', value: 50000 },
        { name: 'Northern Mariana Islands', value: 50000 },
        { name: 'Marshall Islands', value: 50000 },
        { name: 'Faeroe Islands', value: 50000 },
        { name: 'Sint Maarten', value: 40000 },
        { name: 'Monaco', value: 40000 },
        { name: 'Liechtenstein', value: 40000 },
        { name: 'Turks and Caicos Islands', value: 40000 },
        { name: 'Gibraltar', value: 30000 },
        { name: 'San Marino', value: 30000 },
        { name: 'British Virgin Islands', value: 30000 },
        { name: 'Caribbean Netherlands', value: 30000 },
        { name: 'Palau', value: 20000 },
        { name: 'Cook Islands', value: 20000 },
        { name: 'Anguilla', value: 20000 },
        { name: 'Wallis and Futuna', value: 10000 },
        { name: 'Tuvalu', value: 10000 },
        { name: 'Nauru', value: 10000 },
        { name: 'Saint Pierre and Miquelon', value: 6000 },
        { name: 'Montserrat', value: 5000 },
        { name: 'Falkland Islands', value: 3000 },
        { name: 'Niue', value: 2000 },
        { name: 'Tokelau', value: 1000 },
        { name: 'Holy See', value: 1000 }
      ]
    }]
  },
  dataSchema: {
    type: "object",
    properties: {
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" },
            map: { type: "string" },
            roam: { type: "boolean" },
            scaleLimit: { type: "object" },
            label: { type: "object" },
            itemStyle: { type: "object" },
            data: { 
              type: "array", 
              items: { 
                type: "object",
                properties: {
                  name: { type: "string" },
                  value: { type: "number" }
                }
              } 
            }
          }
        },
        title: "系列数据"
      }
    }
  },
  configSchema: {
    type: "object",
    properties: {
      title: { 
        type: "object", 
        properties: {
          text: { type: "string", title: "图表标题" }
        },
        title: "标题设置"
      },
      series: { 
        type: "array", 
        items: { 
          type: "object",
          properties: {
            name: { type: "string", title: "系列名称" },
            map: { type: "string", title: "地图类型" },
            roam: { type: "boolean", title: "是否开启缩放平移" },
            label: { type: "object", title: "标签设置" },
            itemStyle: { type: "object", title: "样式设置" }
          }
        },
        title: "系列设置"
      }
    }
  },
  render: function(container, options) {
    // 合并默认配置和用户配置
    const finalOptions = Object.assign({}, this.defaultProps, options);
    
    // 初始化ECharts实例
    const chart = echarts.init(container);
    
    // 渲染图表
    chart.setOption(finalOptions);
    
    return chart;
  }
};
// 注册组件
if (typeof window !== 'undefined' && window.ComponentRegistry) {
  window.ComponentRegistry.register(WorldMapImproved);
} else if (typeof ComponentRegistry !== 'undefined') {
  ComponentRegistry.register(WorldMapImproved);
} else {
  // 延迟注册，等待ComponentRegistry加载
  setTimeout(() => {
    if (window.ComponentRegistry) {
      window.ComponentRegistry.register(WorldMapImproved);
    }
  }, 100);
}
