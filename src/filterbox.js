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

// var FilterBox=function(container){
// 	this.c=$(container)
// }
// FilterBox.prototype.showbox = function() {
// 	var _this=this;
// 	_this.c.removeClass("hidefilterbox")
// 	setTimeout(function(){
// 		var filterboxheight=$(window).height()-136
// 		_this.c.height(filterboxheight)
// 	},100)
// }
// FilterBox.prototype.hidebox = function() {
// 	var _this=this;
// 	_this.c.attr("style","")
// 	function hidefilterbox(){
// 		_this.c.addClass("hidefilterbox")
// 		_this.c[0].removeEventListener('webkitTransitionEnd', hidefilterbox, false)
// 	}
// 	_this.c[0].addEventListener('webkitTransitionEnd', hidefilterbox, false)
// }


// var filterbox=new FilterBox("#filterbox")
// $("#filterbtn").bind("touchend",function(){
// 	if($("#filterbox").hasClass("hidefilterbox")){
// 		filterbox.showbox()
// 	}else{
// 		filterbox.hidebox()
// 	}
// })

