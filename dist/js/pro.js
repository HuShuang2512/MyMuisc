//进度条模块


(function($,root){
	//渲染总时间，更新播放过的时间和更新进度条 拖拽进度条 暂停渲染
	var $scope = $(document.body);
	var curDuration;
	var frameId;
	var lastper = 0;
	var startTime;
	function renderAllTime (time) {
		curDuration = time;
		time = formatTime(time);
		$scope.find('.all-time').html(time);
	}
	//时间格式转换
	function formatTime (time){
		time = Math.round(time);
		var m = Math.floor(time / 60);
		var s = time - m * 60;
		if(m < 10){
			m = '0' + m;
		}
		if(s < 10){
			s = '0' + s;
		}
		return m + ':' + s;
	}

	function start(per){
		cancelAnimationFrame(frameId);
		lastper = per == undefined ? lastper : per;
		startTime =  new Date().getTime();
		function frame(){
			var curTime = new Date().getTime();
			var percent =  lastper + (curTime - startTime) / (curDuration *1000);
			update(percent);
			frameId = requestAnimationFrame(frame);
		}
		frame()
	}
	//更新时间
	function update(per){
		var time = per * curDuration;
		time = formatTime(time);
		$scope.find('.cur-time').html(time);
		var perX = (per - 1) * 100 + '%';
		$scope.find('.pro-top').css({
			transform:'translateX('+ perX +')'
		});
	}
	//暂停变化
	function stop(){
		var stopTime = new Date().getTime();
		lastper = lastper + (stopTime - startTime) / (curDuration * 1000);
		cancelAnimationFrame(frameId);
	}



	root.pro = {
		renderAllTime:renderAllTime,
		start:start,
		update:update,
		stop:stop
	}

})(window.Zepto,window.player || (window.player == {}));