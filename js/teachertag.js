
//导师详情页
$("#askthisteacher").showfixbox("#discuss_exit");
//安卓关闭时会打开键盘
$(".secondtextarea").css({"height":$(window).height()-131})
$("#discuss_exit").bind("touchstart",function(){
	$("textarea").blur()
})


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

