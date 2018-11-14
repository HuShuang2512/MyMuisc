var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var songList;
var controlManger;
var audio = new root.audioControl();



function bindEvent(){
	$scope.on("play:change",function(event,index){
		audio.getAudio(songList[index].audio);
		if(audio.status == "play"){
			audio.play();
		}
		root.pro.renderAllTime(songList[index].duration);
		root.render(songList[index]);
		// console.log(songList[index]);
	})

	$scope.on("click",".prev-btn",function(){
		var index = controlManger.prev();
		$scope.trigger("play:change",index);
		if(audio.status == 'play'){
			root.pro.start(0);
		}else{
			root.pro.update(0);
		}
	})
	$scope.on("click",".next-btn",function(){
		var index = controlManger.next();
		$scope.trigger("play:change",index);
		if(audio.status == 'play'){
			root.pro.start(0);
		}else{
			root.pro.update(0);
		}
	})
	$scope.on("click",".play-btn",function(){
		if(audio.status == "play"){
			audio.pause();
			root.pro.stop();
		}else{
			audio.play();
			root.pro.start();
		}
		$(this).toggleClass("pause");

	})
	$scope.on("click",".list-btn",function(){
		root.playList.show(controlManger);
	})
}

function bindTouch(){
	var $slider = $scope.find('.slider-pointer');
	var offset = $('.pro-bottom').offset();
	var left = offset.left;
	var width = offset.width;
	//绑定拖拽事件 开始拖拽 ： 取消进度条渲染
	$slider.on('touchstart',function(){
		root.pro.stop();
	}).on('touchmove',function(e){
		//计算拖拽的百分比 更新我们的当前时间和进度条
		var x = e.changedTouches[0].clientX;
		var per = (x - left) / width;
		if(per > 0 && per <= 1){
			root.pro.update(per);
		}
		
	}).on('touchend',function(e){
		//计算百分百 跳转播放 重新开始进度条渲染 
		var x = e.changedTouches[0].clientX;
		var per = (x - left) / width;
		if(per > 0 && per <= 1){
			var curTime = per * songList[controlManger.index].duration;
			audio.playTo(curTime);
			$scope.find('.play-btn').addClass('playing');
			audio.status = 'play';
			root.pro.start(per);
			
		}
	})
}



function getData(url){
	$.ajax({
		type:"GET",
		url:url,
		success:function(data){
			// root.render(data[0]);
			bindEvent();
			bindTouch();
			root.playList.renderList(data);
			controlManger = new root.controlManger(data.length);
			console.log(data);
			songList = data;
			$scope.trigger("play:change", 0);
			
		},
		error:function(){
			console.log('error');
		}
	})
}



getData("../mock/data.json");