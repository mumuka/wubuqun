require.config({
	// baseUrl: "src",
	shim: {
		'bootstrap': ['jquery'],
		"wubuslider":['jquery']
	},
	paths: {
		"jquery": "jquery",
		"bootstrap": "bootstrap",
		"wubuslider": "wubuslider",
		// "scrollpage": "scrollpage"
	}
})
require(["index"])