!function(t){t.fn.touchSlider=function(n){function e(t){var n=t.originalEvent.changedTouches[0];x.start[0]=n.clientX,x.start[1]=n.clientY,x.starttime=t.timeStamp}function i(n){function e(){x.notouch=!1}if(!x.notouch){var i=n.originalEvent.changedTouches[0];x.now[0]=i.clientX,x.now[1]=i.clientY,x.nowtime=n.timeStamp;var o=x.now[0]-x.start[0],a=x.now[1]-x.start[1],r=x.nowtime-x.starttime;if(400>r&&!x.cancontrol)if(Math.abs(o)>8&&Math.abs(a)<8)n.preventDefault(),x.cancontrol=!0;else if(Math.abs(o)<8&&Math.abs(a)>8){if(x.notouch=!0,navigator.userAgent.match(/Android/i)){try{clearTimeout(clearnotoucht)}catch(n){}clearnotoucht=setTimeout(e,500)}return}var c=o-x.index*m;t(".sliderbox").css({transform:"translate3d("+c+"px,0px,0px)",transition:"0s ease-out"})}}function o(n){var e=n.originalEvent.changedTouches[0];x.end[0]=e.clientX,x.end[1]=e.clientY,x.endtime=n.timeStamp;var i=x.end[0]-x.start[0],o=x.end[1]-x.start[1],r=x.endtime-x.starttime;return 250>r&&Math.abs(i)<8&&Math.abs(o)<8?void(window.location.href=t(".sliderbox").find("a:eq("+x.index+")").attr("href")):(i>30&&x.cancontrol?x.index--:-30>i&&x.cancontrol?x.index++:Math.abs(i)<=10&&(x.notouch=!0),x.cancontrol=!1,x.index<0?x.index=0:x.index>=f&&(x.index=f-1),void a(x.index))}function a(n){function e(){t(".sliderbox")[0].removeEventListener("webkitTransitionEnd",e,!1),x.notouch=!1}if(x.notouch)return void(x.notouch=!1);var i=-n*m;t(".sliderbox").css({transform:"translate3d("+i+"px,0px,0px)",transition:"0.3s ease-out"}),x.notouch=!0,t(".sliderbox")[0].addEventListener("webkitTransitionEnd",e,!1)}function r(){setTimeout(r,1e3)}var c=t(this).children();if(1!=c.size()){var s=!1,d=!1,u=3e3;if("undefined"!=typeof n&&("boolean"==typeof n.circulate&&(s=n.circulate),"boolean"==typeof n.automatic&&(d=n.automatic),"number"==typeof n.timeinterval&&(u=n.timeinterval)),s){var h=t(c[0]),l=t(c[c.length-1]);l.after(h.clone()),h.before(l.clone()),console.log(c),c=t(this).children()}var f=c.size(),m=t(this).width(),v=t(this).height(),x={index:0,notouch:!1,cancontrol:!1,starttime:0,nowtime:0,endtime:0,start:[0,0],now:[0,0],end:[0,0]};return t(this).wrapInner('<div class="sliderbox"></div>').css({transform:"translate3d(0,0,1px)"}),t(this).find("a").click(function(t){t.preventDefault()}),c.css({width:m}),t(".sliderbox").css({width:f*m,height:v}),t(this).bind("touchstart",function(t){e(t)}),t(this).bind("touchmove",function(t){i(t)}),t(this).bind("touchend",function(t){o(t)}),setTimeout(r,1e3),t(this)}}}("undefined"!=typeof jQuery?jQuery:window.Zepto);
//# sourceMappingURL=wubuslider.js.map