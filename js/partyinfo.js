$(".weixinsharezhidao").weixinsharebtn();



$("#applyactivebtn").bind("touchstart",function(){
	gotopageanywhere('.activeinfomainlist',function(){	
		if(!$(".applyactive").attr("style")){
			var applyheight=$(".applyactiveinbox").height()+10
			$(".applyactive").css({"height":applyheight})
		}
	})
})

