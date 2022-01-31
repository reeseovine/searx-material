module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				implementation: require('sass'),
				outputStyle: 'expanded',
				sourceMap: true,
				sourceMapContents: true,
				functions: Object.assign( {}, require('node-sass-svg')(__dirname) )
			},
			dist: {
				files: {
					'css/material-light.user.css': 'scss/material-light.user.scss',
					'css/material-light.css': 'scss/material-light.scss',
					'css/material-dark.user.css': 'scss/material-dark.user.scss',
					'css/material-dark.css': 'scss/material-dark.scss'
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/**/*',
						'test_pages/**/*'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: '.'
					}
				}
			}
		},
		watch: {
			css: {
				files: ['scss/**/*.scss'],
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['browserSync', 'watch']);
};
