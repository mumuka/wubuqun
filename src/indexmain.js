require.config({
	baseUrl: "src",
	shim: {
		'bootstrap': ['jquery'],
		"wubuslider":['jquery']
	},
	paths: {
		"jquery": "../js/jquery",
		"bootstrap": "../js/bootstrap",
		"wubuslider": "../build/wubuslider",
		// "scrollpage": "scrollpage"
	}
})
require(["index2"])