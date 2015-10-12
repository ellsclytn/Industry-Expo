module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Copying files to places!
    copy: {
      // NOTE: This task will only work if you run grunt from inside the theme directory which should be under
      //       /path/to/Bolt/theme/industry-expo.
      boltConfig: {
        expand: true,
        cwd: 'bolt-config',
        src: '**/*.yml',
        dest: '../../app/config/',
      },
    },

    // Compile Sass with compass into css/ directory
    compass: {
      dist: {
        options: {
          require: ['modular-scale'],
          sassDir: 'scss',
          cssDir: 'css',
          environment: 'production'
        }
      },
    },

    // Watch files that change frequently and require processing.
    watch: {
      compass: {
        files: 'scss/**/*.scss',
        tasks: ['compass']
      },
      boltConfig: {
        files: 'bolt-config/**/*.yml',
        tasks: ['copy:boltConfig']
      }
    },

    // Browser Sync task to automatically refresh the page on any changes that affect appearance.
    browserSync: {
      bsFiles: {
        src: ['javascripts/*.js', 'css/*.css', '*.twig', '../../app/config/**/*.yml']
      },
      options: {
        watchTask: true,
        proxy: "boltcms.local"
      }
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Tasks
  grunt.registerTask('build', ['compass', 'copy']);
  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
}
