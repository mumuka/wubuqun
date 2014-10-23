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
function gotopageanywhere(container){
	//滚动
	var scroll=function(){
		var curscroll=document.body.scrollTop;
		var lastscroll=$(container)[0].offsetTop;

			console.log(lastscroll)
		var d=lastscroll-curscroll;
		if(Math.abs(d)>1){
			curscroll+=d/12;
			requestAnimationFrame(scroll)
		}else{
			curscroll=lastscroll;
		}
		document.body.scrollTop=parseInt(curscroll);
	}

	requestAnimationFrame(scroll)
}