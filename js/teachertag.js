

$(".teacherinfobox").css({"min-height":$(window).height()-190});
$(".teacherinfotag").find(".col-xs-4").each(function(index){
	
	$(this).bind("touchend",function(){

		$(".change2").removeClass("change2");
		$(".change1").removeClass("change1");
		$(".change0").removeClass("change0");
		$(this).addClass("change"+index);
		$(".teacherpagetagshow").removeClass("teacherpagetagshow");
		$(".teacherpagetag:eq("+index+")").addClass("teacherpagetagshow");

	})

})