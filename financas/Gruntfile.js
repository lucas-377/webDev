// Plugins Imagemin
const pngquant = require('imagemin-pngquant');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminGiflossy = require('imagemin-giflossy');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminSvgo = require('imagemin-svgo');

module.exports = function (grunt) {
  "use strict";

  var config;

  config = {
    imagemin: {
      jpg: {
        options: {
          use: [
            imageminJpegoptim({progressive: true}),
            //imageminJpegtran({progressive: true}),
            imageminMozjpeg({dcScanOpt: 2})
          ]
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.jpg'],
          dest: 'dist/images/'
        }]
      },

      jpeg: {
        options: {
          use: [
            imageminJpegoptim({progressive: true, max: 80})
          ]
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.jpeg'],
          dest: 'dist/images/'
        }]
      },
  
      png: {
        options: {
          use: [
            pngquant({speed: 1, quality: [0.7, 0.8]}),
            imageminZopfli({more: true})
          ]
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.png'],
          dest: 'dist/images/'
        }]
      },

      gif: {
        options: {
          use: [
            imageminGiflossy({
              optimizationLevel: 3, 
              optimize: 3, //keep-empty: Preserve empty transparent frames
              lossy: 2
            })
          ]
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.gif'],
          dest: 'dist/images/'
        }]
      },

      svg: {
        options: {
          use: [
            imageminSvgo({plugins: [{removeViewBox: false}]})
          ]
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.svg'],
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
  grunt.registerTask('imagens', ['imagemin:jpg', 'imagemin:jpeg', 'imagemin:png', 'imagemin:gif', 'imagemin:svg']);
  
  // Task padrao.
  grunt.registerTask('dist', ['clean:all', 'jshint', 'concat:scripts', 'uglify', 'imagens', 'concat:estilos', 'cssmin']);
};