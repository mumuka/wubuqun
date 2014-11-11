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
	var swidth=$(this).width()
	var sheight=$(this).height()
	var picarr=$(this).children()
	var ssize=picarr.size()
	//touch数据
	var position={
		index:0,
		moving:false,
		start:[0,0],
		now:[0,0],
		end:[0,0]
	}
	//初始化
	$(this).wrapInner("<div class=\"sliderbox\"></div>")
	picarr.css({"width":swidth})
	$(".sliderbox").css({"width":ssize*swidth,"height":sheight})

	//touch事件
	$(this).bind("touchstart",function(e){
		touchstart(e)
	})

	$(this).bind("touchmove",function(e){
		touchmove(e)
	})

	$(this).bind("touchend",function(e){
		touchend(e)
	})

	function touchstart(e){
		console.log(e)
		// e.preventDefault()
		var touches=e.originalEvent.changedTouches[0]
		position.start[0]=touches.clientX
		position.start[1]=touches.clientY
		console.log("start-"+position.start)
	}

	function touchmove(e){
		if(position.moving) return;
		var touches=e.originalEvent.changedTouches[0]
		position.now[0]=touches.clientX
		position.now[1]=touches.clientY
		console.log("now-"+position.now)
		var dx=position.now[0]-position.start[0]

		if(Math.abs(dx)<10){
			return
		}else{
		 	e.preventDefault()
		}
		var x=dx-(position.index*swidth)
		// var dy=position.now[1]-position.start[1]
		$(".sliderbox").css({"transform":"translate3d("+x+"px,"+0+"px,"+0+"px)","transition":"0s ease-out"})
	}

	function touchend(e){
		e.preventDefault()
		if(position.moving) return;
		var touches=e.originalEvent.changedTouches[0]
		position.end[0]=touches.clientX
		position.end[1]=touches.clientY
		console.log("end-"+position.end)
		var dx=position.end[0]-position.start[0]

		if(dx>30){
			position.index--;
		}else if(dx<-30){
			position.index++;
		}else if(dx==0){
			//无拖动不触发动画 无动画结束 position.moving一直为true bug
			position.moving=true;
		}
		console.log(position.index);
		moveadmintion(position.index);
	}

	function moveadmintion(index){
		if(position.moving){
			position.moving=false;
			return;
		}
		var x=-index*swidth
		$(".sliderbox").css({"transform":"translate3d("+x+"px,"+0+"px,"+0+"px)","transition":"0.3s ease-out"})
		position.moving=true;
		$(".sliderbox")[0].addEventListener("webkitTransitionEnd",end,false)
		function end(){
			$(".sliderbox")[0].removeEventListener("webkitTransitionEnd",end,false)
				position.moving=false;
		}
	}

	return $(this);
}

$("#slider").touchSlider()




