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
        dest: 'dist/css/main.css'
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
        src: ['dist/**/*.css'],
        dest: 'dist/css/style.min.css'
      },
      main: {
        src: ['dist/css/main.css'],
        dest: 'dist/css/main.min.css'
      }
    },

    copy: {
      imagens: {
        expand: true,
        src: ['images/**/*'],
        dest: 'dist/'
      },
      html: {
        expand: true,
        src: '*.html',
        dest: 'dist/'
      }
    },

    clean: {
      temp: ['.tmp'],
      all: ['dist/', 'images/icons/spritesheet.png'],
      sprite: ['images/icons/spritesheet.png']
    },

    'dart-sass': {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    purgecss: {
      dist: {
        options: {
          content: ['*.html', '*.js'],
          keyframes: true,
          fontFace: true,
          safelist: [/^slick-/, 'slick-dots li', 'slick-dots li button', 'header.active', /^cs__/]
        },
        files: {
          'dist/css/main.css': ['dist/css/main.css']
        }
      }
    },

    useminPrepare: {
      html: '*.html',
      options: {
        dest: 'dist/'
      }
    },
    usemin: {
      html:['dist/*.html']
    },

    sprite:{
      all: {
        src: 'images/icons/*.png',
        dest: 'images/icons/spritesheet.png',
        destCss: 'css/sprites.css',
        padding: 2
      }
    },

    cwebp: {
      dynamic: {
        options: {
          
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    watch: {
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['dart-sass'],
        options: {
          nospawn: true
        }
      },
      images: {
        files: ['images/**/*'],
        tasks: ['imagemin', 'cwebp', 'clean:sprite', 'sprite'],
        options: {
          nospawn: true
        }
      }
    },

    webpcss: {
      main: {
        options: {
          webpClass:'.webp',
          replace_from:/\.(png|jpg|jpeg)/,
          replace_to:'.webp'
        },
        files: {
          'css/main.css':['css/main.css'],
          'css/sprites.css':['css/sprites.css']
        }
      }
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
  grunt.loadNpmTasks('grunt-purgecss');
  grunt.loadNpmTasks('grunt-dart-sass');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-cwebp');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpcss');

  // Registro de tasks.
  grunt.registerTask('imagens', ['imagemin:jpg', 'imagemin:jpeg', 'imagemin:png', 'imagemin:gif', 'imagemin:svg']);
  
  // Task padrao.
  grunt.registerTask('dist', ['clean:all', 'sprite', 'copy:imagens', 'imagens', 'cwebp', 'copy:html', 'useminPrepare', 'webpcss', 'concat', 'purgecss', 'uglify:scripts', 'cssmin:main', 'usemin', 'clean:temp']);
};