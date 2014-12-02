define(["wubuslider"],function() {
	mainnavheight()
	$(window).resize(function() {
		mainnavheight();
	})

	function mainnavheight() {
		var cx4 = $(".mainnav").find(".col-xs-4")
		cx4.css({
			"height": cx4.width()
		})
	}

	$("#newslistbtn").click(function() {
		if ($("#newslistbtn").hasClass("wbtn_greenyellow")) return;
		$("#discusslistbtn").removeClass("wbtn_yellow");
		$("#newslistbtn").addClass("wbtn_greenyellow");
		$(".discusslist").hide();
		$(".articlelist").show();
	})
	$("#discusslistbtn").click(function() {
		if ($("#discusslistbtn").hasClass("wbtn_yellow")) return;
		$("#newslistbtn").removeClass("wbtn_greenyellow");
		$("#discusslistbtn").addClass("wbtn_yellow");
		$(".articlelist").hide();
		$(".discusslist").show();
	})


	$("#slider").touchSlider()
})