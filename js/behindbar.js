;
(function($) {
	/*使用方法
arr为所有要向右侧移动的块
var arr=[".footerbar",".wtopbar",".mainlist",".paixu"];
$("#categorybtn").controlbehindbar(arr);
html结构
<body>
<div class="behindbar">
	<!-- 这块要自主添加到页面中 -->
</div>

<div class="other">
	<!-- 其他块 -->
</div>
<div class="other">
	<!-- 其他块 -->
</div>
</body>
*/
	$.fn.controlbehindbar = function(arr, listbox) {
		$("body").wrapInner('<div class="sidebarbox"></div>');
		$(".sidebarbox").append('<div class="sidebarhidebtn"></div>')
		$(listbox).css({
			"min-height": $(window).height()
		});
		$(".behindbar").show();
		for (var i in arr) {
			$(arr[i]).addClass("transitionnomal")
		}
		//测试侧栏
		// for(var i in arr){
		// 	$(arr[i]).addClass("sdiebartranslate")
		// }
		$(this).bind("touchend", function(e) {
			$(".sidebarhidebtn").show();
			for (var i in arr) {
				$(arr[i]).addClass("sdiebartranslate")
			}
		})

		$(".sidebarhidebtn").bind("touchstart", function(e) {
			e.preventDefault();

			//复位动画禁点击
			$(window).bind("click", function(e) {
				e.preventDefault();
			})
			//动画完 取消禁点击
			$(arr[0])[0].addEventListener("webkitTransitionEnd", cc)

			function cc() {
				$(arr[0])[0].removeEventListener("webkitTransitionEnd", cc)
				setTimeout(function() {
					$(window).unbind("click");
				}, 500)
			}

			//复位动画
			for (var i in arr) {
				$(arr[i]).removeClass("sdiebartranslate")
			}
			$(".sidebarhidebtn").hide();
		})

		return $(this);
	};

})(jQuery);