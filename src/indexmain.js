require.config({
	baseUrl: "src",
	shim: {
		'bootstrap': ['jquery'],
		"wubuslider":['jquery']
	},
	paths: {
		"jquery": "jquery",
		"wubuslider": "wubuslider",
		"scrollpage": "scrollpage"
	}
})
require(["index2"])