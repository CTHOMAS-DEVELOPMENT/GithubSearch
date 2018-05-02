module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	sass: {
		dist: {                            // Target
			options: {                       // Target options
			style: 'expanded'
			},
			files: {                         // Dictionary of files
			'css/search.scss': 'css/search.css'
			}	
		}
	},
	concat: {
		options: {
			// define a string to put between each file in the concatenated output
			separator: ';'
		},
		dist: {
			// the files to concatenate
			src: ['javascript/*.js', 'javascript/controllers/*.js', 'javascript/directives/*.js', 'javascript/filters/*.js', 'javascript/services/*.js'],
			// the location of the resulting JS file
			dest: 'dist/bulk.js'
		}
	},
    // define source files and their destinations
	jshint: {
		files: ['javascript/*.js', 'javascript/controllers/*.js', 'javascript/directives/*.js', 'javascript/filters/*.js', 'javascript/services/pager.js'],
		// configure JSHint (documented at http://www.jshint.com/docs/)
		options: {
			// more options here if you want to override JSHint defaults
			globals: {
			jQuery: true,
			console: true,
			module: true,
			asi: true
			}
		}
		
	},
	watch: {
      files: ['<%= jshint.files %>','css/search.scss'],
      tasks: ['jshint','sass','concat']
    }
});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch','jshint','concat']);
};