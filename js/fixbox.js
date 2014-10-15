;(function ($) {
/*
用法
$("#askthisteacher").showfixbox("#discuss_exit");
*/
$.fn.showfixbox = function (button) {
	$(this).bind("touchend",function(e){
		e.preventDefault()
		$(".fixbox").removeClass("closethis");
		$(".fixbox").css({"transform":"translate3d(0px,0%,0px)","opacity":"1"});
	});

	$(button).bind("touchend",function(e){
		e.preventDefault()
		$(".fixbox").css({"transform":"translate3d(0px,-10%,0px)","opacity":"0"});
		$(".fixbox")[0].addEventListener("webkitTransitionEnd",closethis,false);
		function closethis(){
			$(".fixbox")[0].removeEventListener("webkitTransitionEnd",closethis,false);
			$(".fixbox").addClass("closethis");
		}
	})
};
})(jQuery); 
