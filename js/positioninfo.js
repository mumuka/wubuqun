$(".weixinsharezhidao").weixinsharebtn();

$("#applythisposition").bind("touchstart",function(){
	gotopageanywhere('#applyposition',function(){	
		if(!$("#applyposition").attr("style")){
			var applyheight=$(".applybox").height()+60
			$("#applyposition").css({"height":applyheight})
		}
	})
})