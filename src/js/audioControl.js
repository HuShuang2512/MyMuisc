(function($,root){
	// var $scope = $(document.body);
	function audioControl(){
		this.audio = new Audio();
		this.status = "pause";
	}
	audioControl.prototype ={
		play:function(){
			this.audio.play();
			this.status = "play";
		},
		pause:function(){
			this.audio.pause();
			this.status = "pause";
		},
		getAudio:function(src){
			this.audio.src = src;
            this.audio.load();
		},
		playTo: function(time){
			this.audio.currentTime = time;
			this.audio.play();
		}
	}

	root.audioControl = audioControl;


})(window.Zepto,window.player);