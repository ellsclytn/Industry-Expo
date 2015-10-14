module.exports = function(grunt) {
  var secret = grunt.file.readJSON('secrets.json');
  var devBoltDirectory = "../../";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Copying files to places!
    copy: {
      dev: {
        expand: true,
        cwd: 'bolt-config',
        src: '**/*.yml',
        dest: devBoltDirectory + 'app/config/',
      },
      dist: {
        expand: true,
        cwd: 'bolt-config',
        src: '**/*.yml',
        dest: 'UPLOAD_TO_CONFIG',
      }
    },

    // NOTE: Must run AFTER copy tasks
    replace: {
      dev: {
        src: 'bolt-config/extensions/boltforms.bolt.yml',
        dest: devBoltDirectory + 'app/config/extensions/',
        replacements: [{
          from: 'RECAPTCHA_PUBLIC',
          to: secret.google.recaptcha_public
        },
        {
          from: 'RECAPTCHA_PRIVATE',
          to: secret.google.recaptcha_private
        }]
      },
      dist_recaptcha: {
        src: 'bolt-config/extensions/boltforms.bolt.yml',
        dest: 'UPLOAD_TO_CONFIG/extensions/',
        replacements: [{
          from: 'RECAPTCHA_PUBLIC',
          to: secret.google.recaptcha_public
        },
        {
          from: 'RECAPTCHA_PRIVATE',
          to: secret.google.recaptcha_private
        }]
      },
      dist_main: {
        src: 'bolt-config/config.yml',
        dest: 'UPLOAD_TO_CONFIG/',
        replacements: [{
          from: 'DB_USERNAME',
          to: secret.database.username
        },
        {
          from: 'DB_PASSWORD',
          to: secret.database.password
        },
        {
          from: 'DB_NAME',
          to: secret.database.name
        }]
      }
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
        tasks: ['copy:dev']
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
  grunt.loadNpmTasks('grunt-text-replace');

  // Register Tasks
  grunt.registerTask('build', ['compass', 'copy:dist', 'replace:dist_recaptcha', 'replace:dist_main']);
  grunt.registerTask('default', ['compass', 'copy:dev', 'replace:dev', 'browserSync', 'watch']);
}
