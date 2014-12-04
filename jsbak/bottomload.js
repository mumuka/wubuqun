;
(function($) {
	/*
用法
$("#askthisteacher").showfixbox("#discuss_exit");
*/
	$.fn.bottomLoad = function(dnum, callback) {
		var _this = $(this)
		if (typeof dnum == "function") {
			var callback = dnum
			dnum = 0
		}
		$(window).bind("scroll", function() {
			var dh = _this.outerHeight() + dnum - $(window).height();
			var bodys = $("body")[0].scrollTop;
			var d = dh - bodys;
			if (d <= 10 && d >= 0) {
				if (typeof callback === "function") {
					$(window).unbind("scroll");
					callback();
				}
			}
		})
		return $(this);
	};
})(jQuery);