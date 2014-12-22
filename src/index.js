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
		inittagbar()
		$("#newslistbtn").addClass("wbtn_greenyellow")
		$(".articlelist").show()
	})
	$("#discusslistbtn").click(function() {
		if ($("#discusslistbtn").hasClass("wbtn_yellow")) return;
		inittagbar()
		$("#discusslistbtn").addClass("wbtn_yellow")
		$(".discusslist").show()
	})
	$("#followarticlebtn").click(function() {
		if ($("#followarticlebtn").hasClass("wbtn_yellow")) return;
		inittagbar()
		$("#followarticlebtn").addClass("wbtn_yellow")
		$(".followarticlelist").show()

	})
	function inittagbar(){
		$(".tagbar .wbtn").removeClass("wbtn_greenyellow").removeClass("wbtn_yellow")
		$(".mainlist").hide()
	}

	$("#slider").touchSlider({
		animatetime:300,
		automatic:true,
		timeinterval:4000,
		sliderpoint:true,
		sliderpointwidth:8,
		sliderpointcolor: "#4fa2ff",
	})
})