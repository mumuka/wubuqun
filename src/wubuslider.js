;
(function($) {
	$.fn.touchSlider = function(arguments) {
		var picarr = $(this).children()
		if (picarr.size() == 1) return;

		var circulate = false //循环
		var automatic = false //自动播放
		var timeinterval = 3000 //播放间隔时间
		if (typeof arguments !== "undefined") {
			if (typeof arguments.circulate == "boolean") {
				circulate = arguments.circulate
			}
			if (typeof arguments.automatic == "boolean") {
				automatic = arguments.automatic
			}
			if (typeof arguments.timeinterval == "number") {
				timeinterval = arguments.timeinterval
			}
		}
		var ssize = picarr.size()
		var swidth = $(this).width()
		var sheight = $(this).height()
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
			end: [0, 0],
			direction: 0, //动画方向 1向← -1向→  0不动
			init: function(num) {
				if (typeof num === "number") {
					if (num < 0) {
						this.direction = -1
						this.index = ssize - 1
					} else if (num >= ssize) {
						this.direction = 1
						this.index = 0
					} else {
						this.direction = num > this.index ? 1 : -1
						this.index = num
					}
				} else {
					this.direction = 0
				}
				var prevpic = position.index - 1
				this.prevpic = prevpic >= 0 ? prevpic : ssize - 1
				var nextpic = position.index + 1
				this.nextpic = nextpic < ssize ? nextpic : 0
			},
		}
		position.init()

		$(this).find("a").click(function(e) {
			e.preventDefault()
		})
		picarr.css({
			"width": swidth
		})
		picarr.css({
			"transform": "translate3d(" + swidth + "px," + 0 + "px," + 0 + "px)",
			"transition": "0s ease-out"
		})
		$(picarr[position.index]).css({
			"transform": "translate3d(" + 0 + "px," + 0 + "px," + 0 + "px)",
			"transition": "0s ease-out"
		})
		picarr.addClass("positionbox")



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

		function initpicposition(time, x) {

			var time = typeof time === "number" ? time : 0
			var x = typeof x === "number" ? x : 0
			console.log(position.index + "prev" + position.prevpic + "next" + position.nextpic + "x" + x+"direction"+position.direction)
			
			$(picarr[position.index]).css({
				"transform": "translate3d(" + (0 + x) + "px," + 0 + "px," + 0 + "px)",
				"transition": time + "s ease-out"
			})
			if(time===0||position.direction>=0){
				$(picarr[position.prevpic]).css({
					"transform": "translate3d(" + (-swidth + x) + "px," + 0 + "px," + 0 + "px)",
					"transition": time + "s ease-out"
				})
			}
			if(time===0||position.direction<=0){		
				$(picarr[position.nextpic]).css({
					"transform": "translate3d(" + (swidth + x) + "px," + 0 + "px," + 0 + "px)",
					"transition": time + "s ease-out"
				})
			}
		}

		function touchstart(e) {
			// console.log(e)
			// e.preventDefault()
			var touches = e.originalEvent.changedTouches[0]
			position.start[0] = touches.clientX
			position.start[1] = touches.clientY
			position.starttime = e.timeStamp
				// console.log("start-" + position.start)
			initpicposition()
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
					if (navigator.userAgent.match(/Android/i)) {
						try {
							clearTimeout(clearnotoucht)
						} catch (e) {}
						clearnotoucht = setTimeout(clearnotouch, 500)

						function clearnotouch() {
							position.notouch = false
						}
					}
					return
				}
			}
			// console.log("cancontrol:"+position.cancontrol+"--notouch:"+position.notouch)
			var x = dx
				// var dy=position.now[1]-position.start[1]
			initpicposition(0, x)
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
			var dtime = position.endtime - position.starttime

			//点击链接跳转
			// console.log(Math.abs(dy) < 8)
			if (dtime < 250 && Math.abs(dx) < 8 && Math.abs(dy) < 8) {
				window.location.href = $(".sliderbox").find("a:eq(" + position.index + ")").attr("href");
				return
			}
			position.init()
			if (dx > 30 && position.cancontrol) {
				position.init(position.index - 1)
			} else if (dx < -30 && position.cancontrol) {
				position.init(position.index + 1)
			} else if (Math.abs(dx) <= 10) {
				//无拖动不触发动画 无动画结束 position.notouch一直为true bug
				// console.log("无拖动position.notouch = true")
				position.notouch = true
			}
			position.cancontrol = false
				// console.log(position.index+"prev"+position.prevpic+"next"+position.nextpic)
			moveadmintion(position.index)
		}

		function moveadmintion(index) {
			if (position.notouch) {
				// console.log("动画無拖動position.notouch = false")
				position.notouch = false;
				return;
			}
			initpicposition(1)
			position.notouch = true;
			$(picarr[index])[0].addEventListener("webkitTransitionEnd", end, false)

			function end() {
				$(picarr[index])[0].removeEventListener("webkitTransitionEnd", end, false)
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
})((typeof(jQuery) != 'undefined') ? jQuery : window.Zepto)