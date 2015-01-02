
define(["jquery","gotopageanywhere"],function($) {



	//赚积分
	$("#earnscorebtn").bind("touchend",function(){
		showhideearnbtn()
	})
	// $("#earnscorebtn2").bind("touchend",function(){
	// 	gotopageanywhere(0,showhideearnbtn)
	// })

	function showhideearnbtn(){
		var c=$(".earnscore").hasClass("showearnscore");
		if(c){
			$(".earnscore").removeClass("showearnscore")
		}else{
			$(".earnscore").addClass("showearnscore")
		}
	}

	// //积分增长
	// requestAnimationFrame(numrun)
	// function numrun(){
	// 	var nowscore=parseInt($("#scoreshownum").text());
	// 	var lastscore=parseInt($("#scorehidenum").text());
	// 	var dscore=lastscore-nowscore;
	// 	if(dscore>10){
	// 		nowscore+=parseInt(dscore/10);
	// 		requestAnimationFrame(numrun)
	// 	}else{
	// 		nowscore=lastscore;
	// 	}
	// 	$("#scoreshownum").text(nowscore);
	// }

});