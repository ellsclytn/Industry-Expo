module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          environment: 'production'
        }
      },
    },

    watch: {
      compass: {
        files: 'scss/**/*.scss',
        tasks: ['compass']
      }
    },

    browserSync: {
      bsFiles: {
        src: ['css/*.css', '*.twig']
      },
      options: {
        watchTask: true,
        proxy: "boltcms.local"
      }
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Register Tasks
  grunt.registerTask('build', ['compass']);
  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
}
