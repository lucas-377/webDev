module.exports = function (grunt) {
  "use strict";

  var config;

  config = {
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'imagens/',
          src: ['**/*.{png, jpg, jpeg, gif}'],
          dest: 'dist/images/'
        }]
      }
    },
    jshint: {
      dist: {
        src: ['js/**/*.js']
      }
    },
    concat: {
      scripts: {
        src: ['js/**/*.js'],
        dest: 'dist/js/scripts.js'
      },
      estilos: {
        src: ['css/**/*.css'],
        dest: 'dist/css/style.css'
      }
    },
    uglify: {
      scripts: {
        src: ['dist/js/scripts.js'],
        dest: 'dist/js/scripts.min.js'
      }
    },
    cssmin: {
      all: {
        src: ['css/**/*.css'],
        dest: 'dist/css/style.min.css'
      }
    },
    copy: {
      imagens: {
        expand: true,
        src: ['images/*'],
        dest: 'dist/'
      }
    },
    clean: {
      temp: [],
      all: ['dist/']
    }
  };

  // Inicia o Grunt.
  grunt.initConfig(config);

  // Load das tasks.
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Registro de tasks.
  grunt.registerTask('imagens', ['imagemin']);
  
  // Task padrao.
  grunt.registerTask('dist', ['clean:all','copy:imagens','imagemin', 'jshint', 'concat:estilos', 'cssmin', 'concat:scripts', 'uglify']);
};