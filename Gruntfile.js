module.exports = function(grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: "src",
					dir: "build",
					//默认：false 每次更新全部文件
					// keepBuildDir: false,
					//默认：false 压缩全部文件, true 压缩主文件
					// skipDirOptimize: true,
					optimize: 'uglify2',
					generateSourceMaps: true,
					preserveLicenseComments: false,
					modules: [
						{
							name: "indexmain",
							// include: ["index2"],
							exclude: ["jquery","bootstrap","wubuslider"],
						},
					],
				}
			}
		},
		watch: {
			client: {
				//我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
				options: {
					livereload: true
				},
				//'**'表示包含所有的子目录
				//'*'表示包含所有的文件
				files: ['*.html', 'css/*', 'js/*', 'images/**/*']
			},
			js: {
				files: 'src/*.js',
				tasks: ['requirejs']
			},
		},
	});
	//加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//默认任务
	grunt.registerTask('default', ['requirejs']);

}