$("#filterbtn").bind("touchend",function(){
	if($("#filterbox").hasClass("hidefilterbox")){
		$("#filterbox").removeClass("hidefilterbox")
		setTimeout(function(){
			var filterboxheight=$(window).height()-136;
			$("#filterbox").height(filterboxheight);
		},100)
	}else{
		$("#filterbox").attr("style","")
		function hidefilterbox(){
			$("#filterbox").addClass("hidefilterbox")
			$("#filterbox")[0].removeEventListener('webkitTransitionEnd', hidefilterbox, false);
		}
		$("#filterbox")[0].addEventListener('webkitTransitionEnd', hidefilterbox, false);

	}
})

