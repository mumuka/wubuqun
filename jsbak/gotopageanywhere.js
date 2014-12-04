(function(){
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||	// Webkit中此取消方法的名字变了
									window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());
function gotopageanywhere(container,callback){
	//滚动
	var scroll=function(){
		var curscroll=document.body.scrollTop;
		//兼容页面短，无滚动条的情况
		var dh_wh=$(document).height()-$(window).height();
		if(typeof container=="number"){
			var lastscroll=container<dh_wh?container:dh_wh;
		}else{
			var offsettop=$(container)[0].offsetTop
			var lastscroll=offsettop<dh_wh?offsettop:dh_wh;
		}

			// console.log(lastscroll)
		var d=lastscroll-curscroll;
		if(Math.abs(d)>1){
			curscroll+=d>0?Math.ceil(d/12):Math.floor(d/12);
			requestAnimationFrame(scroll)
		}else{
			curscroll=lastscroll;
			callback?callback():"";
		}
		document.body.scrollTop=parseInt(curscroll);
	}

	requestAnimationFrame(scroll)
}