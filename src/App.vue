<template>
  <div id="app">
	<!-- 一级路由 -->
    <router-view/>
  </div>
</template>

<style lang="less">
	// 全局样式
	*{
		padding: 0;
		margin:0; 
	}
	li{
		list-style: none;
	}
	input{
		outline: none;
	}
	body{
    	background-color: #f8f8f8;
  	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.clearfix::after{
		content: "";
		display: block;
		clear: both;
		-ms-zoom: 1;
		zoom:1;
	}
</style>
