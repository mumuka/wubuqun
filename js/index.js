var cx4 = $(".mainnav").find(".col-xs-4")
cx4.css({
	"height": cx4.width()
})



$('#myTaskPage').on("pageshow", function() {
	var height = $(window).height() - 120;
	$('#tabMineWrapper').css({
		'width': '100%',
		'height': +height + 'px'
	});
	/*****************设置玩法界面滚动********************************/
	if (myScroll != null) {
		myScroll.destroy();
		myScroll = null;
	}
	var pullDownEl = document.getElementById('pullDown'),
		pullUpEl = document.getElementById('pullUp');
	var pullDownOffset = pullDownEl.offsetHeight,
		pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll('tabMineWrapper', {
		topOffset: pullDownOffset,
		onRefresh: function() {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function() {
			if (this.y > OFFSET && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
				this.minScrollY = 0;
				//$("#pullUp").css('visibility','visible');
			} else if (this.y < OFFSET && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - OFFSET) && !pullUpEl.className.match('flip') && 'hidden' != $("#pullUp").css('visibility')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始加载...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + OFFSET) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = this.maxScrollY;
			}
		},
		onScrollEnd: function() {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在刷新...';
				refreshInfo();
			} else if (pullUpEl.className.match('flip') && 'hidden' != $("#pullUp").css('visibility')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载...';
				nextPage();
			} else {
				if ((this.y > -50 && this.y < 0) || this.y >= 0) {
					// console.log(this.y+'  |y|  '+this.maxScrollY +'  ||  '+this.minScrollY);
					if ($("#listviewid>li").length != 0) {
						// console.log(this.y+'  |z|  '+this.maxScrollY +'  ||  '+this.minScrollY);
						myScroll.scrollTo(0, -50, 0);
					}
				} else {
					// console.log(this.y+'  |x|  '+this.maxScrollY +'  ||  '+this.minScrollY);
					if ((this.y >= this.maxScrollY && this.y < (this.maxScrollY + 50)) || (this.y < this.maxScrollY && this.y != this.minScrollY)) {
						if (pullUpEl.className.match('flip') && 'hidden' != $("#pullUp").css('visibility')) {
							this.maxScrollY = (this.maxScrollY < -50) ? -50 : this.maxScrollY;
							myScroll.scrollTo(0, this.maxScrollY + 50, 0)
						} else if (pullDownEl.className.match('flip')) {
							this.maxScrollY = (this.maxScrollY < -50) ? -50 : this.maxScrollY;
						}

					}
				}
			}
		}
	});
	// myScroll = new iScroll('tabMineWrapper', {
	// vScrollbar : false
	// });

	//myScroll.refresh();

	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);
	//page = 1;
	//localStorageUtils.setParam("page",page);
	getInfomation();
});