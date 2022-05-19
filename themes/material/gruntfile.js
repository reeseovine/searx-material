module.exports = (grunt) => {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				implementation: require('sass'),
				outputStyle: 'compressed',
				sourceMap: true,
				sourceMapContents: true,
				functions: Object.assign( {}, require('node-sass-svg')(__dirname) )
			},
			dist: {
				files: {
					'css/searxng.min.css': 'src/scss/style.scss',
				}
			}
		},
		svg2jinja: {
			all: {
				src: {
					'home': 'node_modules/@mdi/svg/svg/home.svg',
					'information': 'node_modules/@mdi/svg/svg/information.svg',
					'cog': 'node_modules/@mdi/svg/svg/cog.svg',
					'check-circle': 'node_modules/@mdi/svg/svg/check-circle.svg',
					'close': 'node_modules/@mdi/svg/svg/close.svg',
					'cached': 'node_modules/@mdi/svg/svg/cached.svg',
					'magnify': 'node_modules/@mdi/svg/svg/magnify.svg'
				},
				dest: '../../../templates/material/icons.html'
			}
		},
		watch: {
			css: {
				files: ['gruntfile.js', 'src/**'],
				tasks: ['sass']
			}
		}
	});

	grunt.registerMultiTask('svg2jinja', 'Create Jinja2 macro', () => {
		const svgo = require('svgo');
		const data = grunt.config('svg2jinja').all;
		const icons = {};
		for (const iconName in data.src) {
			const svgFileName = data.src[iconName];
			try {
				const svgContent = grunt.file.read(svgFileName, { encoding: 'utf8' });
				const svgoResult = svgo.optimize(svgContent, {
					path: svgFileName,
					multipass: true,
					plugins: [
						'removeXMLProcInst',
						'removeXMLNS',
						'removeDoctype',
						{
							name: 'removeAttrs',
							params: {
								attrs: 'id'
							}
						},
						{
							name: 'addClassesToSVGElement',
							params: {
								className: 'mdi'
							}
						},
						{
							name: 'addAttributesToSVGElement',
							params: {
								attributes: [
									{ 'aria-hidden': 'true' }
								]
							}
						}
					]
				});
				icons[iconName] = svgoResult.data.replace("'", "\\'");
			} catch (err) {
				grunt.log.error(err);
			}
		}
		const template = `{# this file was generated by searx/static/themes/material/gruntfile.js #}
{%- set icons = ${ JSON.stringify(icons, null, "\t") } -%}\n`;
		grunt.file.write(data.dest, template, { encoding: 'utf8' });
		grunt.log.ok(data.dest + " created");
	});


	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'svg2jinja']);
};