# CBECgoodsdata-visualization-front
地方跨境电商通关商品数据可视化（毕设项目）
目录结构
|--config  
	|--dev.env.js				配置接口地址  
  |--index.js  
	|--prod.env.js  
|--node_modules				依赖库  
|--src  
	|--assets  
	|--components				封装Echarts图表组件  
    	|--good					  单类商品图表组件  
      |--goodMore			  多类商品图表组件  
      |--person				  人物图表组件  
	|--request					封装axios  
    	|--axios.js				创建axios实例，封装拦截器  
      |--goodApi.js			商品接口api  
      |--personApi.js		人物接口api  
  |--router					  封装路由  
		|--index.js				  编写、注册路由path  
  |--utils					  存放地图Json坐标  
    |--china.json			  Echarts china geomap  
    |--world.json			  Echarts world geomap  
  |--view  
		|--good.vue				  商品页面布局 数据请求 业务逻辑  
    |--person.vue			  人物页面布局 数据请求 业务逻辑  
  |--App.vue					主组件，编写系统头栏与菜单  
  |--main.js					入口文件：引入依赖库、组件库，全局注册等  
|--static						封装散点坐标，用于动态请求  
	|--china_coordinate.json  	
	|--world_coordinate.json  
