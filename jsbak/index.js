mainnavheight()
$(window).resize(function() {
	mainnavheight();
})

function mainnavheight() {
	var cx4 = $(".mainnav").find(".col-xs-4")
	cx4.css({
		"height": cx4.width()
	})
}


$("#newslistbtn").click(function() {
	if ($("#newslistbtn").hasClass("wbtn_greenyellow")) return;
	$("#discusslistbtn").removeClass("wbtn_yellow");
	$("#newslistbtn").addClass("wbtn_greenyellow");
	$(".discusslist").hide();
	$(".articlelist").show();
})
$("#discusslistbtn").click(function() {
	if ($("#discusslistbtn").hasClass("wbtn_yellow")) return;
	$("#newslistbtn").removeClass("wbtn_greenyellow");
	$("#discusslistbtn").addClass("wbtn_yellow");
	$(".articlelist").hide();
	$(".discusslist").show();
})

$.fn.touchSlider = function() {
	var swidth = $(this).width()
	var sheight = $(this).height()
	var picarr = $(this).children()
	var ssize = picarr.size()
		// if(ssize == 1) return;
		//touch数据
	var position = {
			index: 0,
			notouch: false,
			cancontrol: false, //是否是左右拖动
			starttime: 0,
			nowtime: 0,
			endtime: 0,
			start: [0, 0],
			now: [0, 0],
			end: [0, 0]
		}
		//初始化
	$(this).wrapInner("<div class=\"sliderbox\"></div>").css({"transform": "translate3d(0,0,1px)"})

	$(this).find("a").click(function(e) {
		e.preventDefault()
	})
	picarr.css({
		"width": swidth
	})
	$(".sliderbox").css({
		"width": ssize * swidth,
		"height": sheight
	})

	//touch事件
	$(this).bind("touchstart", function(e) {
		touchstart(e)
	})

	$(this).bind("touchmove", function(e) {
		touchmove(e)
	})

	$(this).bind("touchend", function(e) {
		touchend(e)
	})

	function touchstart(e) {
		// console.log(e)
		// e.preventDefault()
		var touches = e.originalEvent.changedTouches[0]
		position.start[0] = touches.clientX
		position.start[1] = touches.clientY
		position.starttime = e.timeStamp
		// console.log("start-" + position.start)
	}

	function touchmove(e) {
		if (position.notouch) return;
		var touches = e.originalEvent.changedTouches[0]
		position.now[0] = touches.clientX
		position.now[1] = touches.clientY
		position.nowtime = e.timeStamp
		//console.log("now-" + position.now)
		var dx = position.now[0] - position.start[0]
		var dy = position.now[1] - position.start[1]


		var dtime = position.nowtime - position.starttime;

		if (dtime < 400 && !position.cancontrol) {
			if (Math.abs(dx) > 8 && Math.abs(dy) < 8) {
				e.preventDefault()
				position.cancontrol = true
			} else if (Math.abs(dx) < 8 && Math.abs(dy) > 8) {
				position.notouch = true
				//安卓拖动屏幕后不触发touchend事件
				if(navigator.userAgent.match(/Android/i)) {
					try {
						clearTimeout(clearnotoucht)
					}catch (e) {}
					clearnotoucht=setTimeout(clearnotouch,500)
					function clearnotouch(){
						position.notouch = false
					}
				}
				return
			}
		} 
		// console.log("cancontrol:"+position.cancontrol+"--notouch:"+position.notouch)
		var x = dx - (position.index * swidth)
			// var dy=position.now[1]-position.start[1]
		$(".sliderbox").css({
			"transform": "translate3d(" + x + "px," + 0 + "px," + 0 + "px)",
			"transition": "0s ease-out"
		})
	}

	function touchend(e) {
		// e.preventDefault()
		// console.log(e);
		var touches = e.originalEvent.changedTouches[0]
		position.end[0] = touches.clientX
		position.end[1] = touches.clientY
		position.endtime = e.timeStamp
		// console.log("end-" + position.end)
		var dx = position.end[0] - position.start[0]
		var dy = position.end[1] - position.start[1]
		var dtime = position.endtime - position.starttime;

		//点击链接跳转
		// console.log(Math.abs(dy) < 8)
		if (dtime < 250 && Math.abs(dx) < 8 && Math.abs(dy) < 8) {
			window.location.href =$(".sliderbox").find("a:eq("+position.index+")").attr("href");
			return
		}

		if (dx > 30 && position.cancontrol) {
			position.index--;
		} else if (dx < -30 && position.cancontrol) {
			position.index++;
		} else if (Math.abs(dx) <= 10) {
			//无拖动不触发动画 无动画结束 position.notouch一直为true bug
			// console.log("无拖动position.notouch = true")
			position.notouch = true
		}
		position.cancontrol = false
		//防止超出
		if (position.index < 0) {
			position.index = 0;
		} else if (position.index >= ssize) {
			position.index = ssize - 1;
		}


		// console.log("ssize:"+ssize);
		// console.log(dx);

		moveadmintion(position.index);
	}

	function moveadmintion(index) {
		if (position.notouch) {
			// console.log("动画無拖動position.notouch = false")
			position.notouch = false;
			return;
		}
		var x = -index * swidth
		$(".sliderbox").css({
			"transform": "translate3d(" + x + "px," + 0 + "px," + 0 + "px)",
			"transition": "0.3s ease-out"
		})
		position.notouch = true;
		$(".sliderbox")[0].addEventListener("webkitTransitionEnd", end, false)

		function end() {
			$(".sliderbox")[0].removeEventListener("webkitTransitionEnd", end, false)
			position.notouch = false;
		}
	}


	setTimeout(movingstatus, 1000)

	function movingstatus() {
		// console.log(position.notouch)
		setTimeout(movingstatus, 1000)
	}
	return $(this);
}

$("#slider").touchSlider()


