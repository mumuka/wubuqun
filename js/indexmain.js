define("index",["wubuslider"],function(){function e(){var e=$(".mainnav").find(".col-xs-4");e.css({height:e.width()})}e(),$(window).resize(function(){e()}),$("#newslistbtn").click(function(){if($("#newslistbtn").hasClass("wbtn_greenyellow"))return;$("#discusslistbtn").removeClass("wbtn_yellow"),$("#newslistbtn").addClass("wbtn_greenyellow"),$(".discusslist").hide(),$(".articlelist").show()}),$("#discusslistbtn").click(function(){if($("#discusslistbtn").hasClass("wbtn_yellow"))return;$("#newslistbtn").removeClass("wbtn_greenyellow"),$("#discusslistbtn").addClass("wbtn_yellow"),$(".articlelist").hide(),$(".discusslist").show()}),$("#slider").touchSlider({animatetime:300,automatic:!0,timeinterval:4e3,sliderpoint:!0,sliderpointwidth:8,sliderpointcolor:"#4fa2ff"})}),require.config({shim:{bootstrap:["jquery"],wubuslider:["jquery"]},paths:{jquery:"jquery",bootstrap:"bootstrap",wubuslider:"wubuslider"}}),require(["index"]),define("indexmain",function(){});