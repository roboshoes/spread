module.exports = function( grunt ) {

	grunt.initConfig( {
		compass: {
			dev: {
				options: {
					sassDir: "source/styles/scss",
					cssDir: "source/styles/css",
					environment: "development",
					outputStyle: "expanded",
					noLineComments: true,
					force: true
				}
			}
		},

		watch: {
			dev: {
				files: [ "source/styles/scss/**" ],
				tasks: "compass:dev",
				options: {
					debounceDelay: 100
				}
			}
		}
	} );

	grunt.loadNpmTasks( "grunt-contrib-compass" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
}