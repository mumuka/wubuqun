
define(["jquery","gotopageanywhere"],function($) {
	$("#earnscorebtn").bind("touchend",function(){
		showhideearnbtn()
	})
	$("#earnscorebtn2").bind("touchend",function(){
		gotopageanywhere(0,showhideearnbtn)
	})

	function showhideearnbtn(){
		var c=$(".earnscore").hasClass("showearnscore");
		if(c){
			$(".earnscore").removeClass("showearnscore")
		}else{
			$(".earnscore").addClass("showearnscore")
		}
	}
});