$("#filterbtn").bind("touchend",function(){
	if(!$("#filterbox").attr("style")){
		var filterboxheight=$(window).height()-136;
		$("#filterbox").height(filterboxheight);
	}else{
		$("#filterbox").attr("style","")
	}
})

