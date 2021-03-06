;
(function($) {
	$.fn.touchSlider = function(arguments) {
		var picarr = $(this).children()
		if (picarr.size() == 1) return;
		if(picarr.size()==2){
			$(this).append(picarr.clone())
			picarr = $(this).children()
			var therejusttwopic=true
		}
		//默认配置
		var args = {
				circulate: false, //循环
				automatic: false, //自动播放
				sliderpoint: true, //小点
				sliderpointwidth: 8, //点大小
				sliderpointcolor: "#aaa", //点颜色
				sliderpointbgcolor: "#eee", //点颜色
				timeinterval: 3000, //播放间隔时间
				animatetime: 300, //动画时间
			}
			//更新配置
		if (typeof arguments !== "undefined") {
			for (arg in arguments) {
				if (typeof args[arg] === typeof arguments[arg]) {
					args[arg] = arguments[arg]
				}
			}
		}
		var ssize = picarr.size(),
			swidth = $(this).width(),
			sheight = $(this).height(),
			position = {
				index: 0,
				notouch: false, //动画运行时不能操作slider
				leftrighttouch: false, //是否是左右拖动
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
			//基本数据初始化
		position.init()
		$(this).css({
			"position": "relative"
		}).find("a").click(function(e) {
			e.preventDefault()
		})
		picarr.each(function(index) {
				var p = (index == 0) ? 0 : 1
				$(this).css({
					"width": swidth,
					"transform": "translate3d(" + (swidth * p) + "px," + 0 + "px," + 0 + "px)",
					"transition": "0s ease-out",
					"position": "absolute"
				})
			})
			//小点
		if (args.sliderpoint) {
			$(this).append($("<ul class='pointlist'><li class='currentsliderpoint'></li></ul>"))
			//只有2个图片兼容
			var pointmargin = Math.ceil(args.sliderpointwidth / 5)
			var pointlistw = pointmargin * 2 + args.sliderpointwidth
			var pointlistwidth=pointlistw * ssize
			if(typeof therejusttwopic==="undefined"){
				for (var i = 1; i < ssize; i++) {
					$(".pointlist").append($("<li></li>"))
				}
			}else{
				var pointlistwidth=pointlistw * 2
				$(".pointlist").append($("<li></li>"))
			}
			var pointlistli = $(this).find(".pointlist").find("li")
			$(this).find(".pointlist").css({
				"width": pointlistwidth,
				"height": pointlistw,
				"position": "absolute",
				"transform": "translate3d(0," + (sheight / 2 - args.sliderpointwidth) + "px,1px)",
				"padding": 0,
				"top": 0,
				"left": 0,
				"right": 0,
				"bottom": 0,
				"margin": "auto",
			})
			pointlistli.css({
				"list-style": "none",
				"width": args.sliderpointwidth,
				"height": args.sliderpointwidth,
				"border-radius": args.sliderpointwidth,
				"margin": pointmargin,
				"float": "left",
				"background-color": args.sliderpointbgcolor,
				"transition": args.animatetime / 1000 + "s ease-out",
			})
			$(".currentsliderpoint").css({
				"background-color": args.sliderpointcolor
			})
		}



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

		//自动播放
		if (args.automatic) {
			autoplay()
		}

		function autoplay() {
				wubuslidersettime = setTimeout(picautoplay, args.timeinterval)

				function picautoplay() {
					initpicposition()
					setTimeout(picgo)
					wubuslidersettime = setTimeout(picautoplay, args.timeinterval)
				}
			}
			// clearTimeout(wubuslidersettime)

		function initpicposition(time, x) {
			if (position.notouch) {
				// console.log("动画無拖動position.notouch = false")
				//非左右拖动无动画运行  position.notouch不更新，上下拖动后position.notouch一直为false 导致slider无法操作
				if (!position.leftrighttouch) {
					position.notouch = false;
				}
				return;
			}
			var time = typeof time === "number" ? time : 0
			var x = typeof x === "number" ? x : 0
				//有滚动动画  动画完结前禁止touch
			if (time !== 0) {
				position.notouch = true;
				$(picarr[position.index])[0].addEventListener("webkitTransitionEnd", end, false)

				function end() {
					$(picarr[position.index])[0].removeEventListener("webkitTransitionEnd", end, false)
					position.notouch = false;
				}
			}

			// console.log(position.index + "prev" + position.prevpic + "next" + position.nextpic + "x" + x + "direction" + position.direction)

			$(picarr[position.index]).css({
				"transform": "translate3d(" + (0 + x) + "px," + 0 + "px," + 0 + "px)",
				"transition": time + "s ease-out"
			})
			if (time === 0 || position.direction >= 0) {
				$(picarr[position.prevpic]).css({
					"transform": "translate3d(" + (-swidth + x) + "px," + 0 + "px," + 0 + "px)",
					"transition": time + "s ease-out"
				})
			}
			if (time === 0 || position.direction <= 0) {
				$(picarr[position.nextpic]).css({
					"transform": "translate3d(" + (swidth + x) + "px," + 0 + "px," + 0 + "px)",
					"transition": time + "s ease-out"
				})
			}

			if (time != 0 && args.sliderpoint && position.direction != 0) {
				$(".currentsliderpoint").css({
					"background-color": args.sliderpointbgcolor
				}).removeClass("currentsliderpoint")

				//只有2个图片兼容
				if(typeof therejusttwopic==="undefined"){
					$(pointlistli[position.index]).addClass("currentsliderpoint").css({
						"background-color": args.sliderpointcolor
					})
				}else{
					$(pointlistli[(position.index>1)?(position.index-2):position.index]).addClass("currentsliderpoint").css({
						"background-color": args.sliderpointcolor
					})
				}
			}
		}

		function picgo() {
			position.init(position.index + 1)
			initpicposition(args.animatetime / 1000)
		}

		function picback() {
			position.init(position.index - 1)
			initpicposition(args.animatetime / 1000)
		}

		function picnomove() {
			position.init()
			initpicposition(args.animatetime / 2000)
		}

		function touchstart(e) {
			// console.log(e)
			// e.preventDefault()
			//暂停自动播放
			if (args.automatic) {
				clearTimeout(wubuslidersettime)
			}
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

			if (dtime < 400 && !position.leftrighttouch) {
				if (Math.abs(dx) > 8 && Math.abs(dy) < 8) {
					e.preventDefault()
					position.leftrighttouch = true
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
			// console.log("leftrighttouch:"+position.leftrighttouch+"--notouch:"+position.notouch)
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
			if (dtime < 250 && Math.abs(dx) < 8 && Math.abs(dy) < 8) {
				window.location.href = $(picarr[position.index]).attr("href");
				return
			}
			position.init()
			if (dx > 30 && position.leftrighttouch) {
				picback()
			} else if (dx < -30 && position.leftrighttouch) {
				picgo()
			} else if (Math.abs(dx) <= 10) {
				//无拖动不触发动画 无动画结束 position.notouch一直为true bug
				// console.log("无拖动position.notouch = true")
				initpicposition()
				position.notouch = true
			} else {
				picnomove()
			}
			position.leftrighttouch = false

			//重启自动播放
			if (args.automatic) {
				autoplay()
			}
		}


		return $(this);
	}
})((typeof(jQuery) != 'undefined') ? jQuery : window.Zepto)