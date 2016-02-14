/*!
 * This file is part of Flocking UI5 Playground
 * Copyright (C) 2016 Aleksey Krasnobaev <alekseykrasnobaev@gmail.com>
 *
 * You should have received a copy of the GNU General Public License
 * version 3 along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';
module.exports = function (grunt) {

  grunt.initConfig({

    /* vars */

    dir: {
      src: 'src',
      lib: 'zlib',
      dest: 'dist',
      bower_components: 'bower_components',
    },

    /* body */

    clean: {
      dest: [
        '<%= dir.dest %>',
      ],
    },

    copy: {
      dest: {
        cwd: '<%= dir.src %>',
        src: ['**/*'],
        dest: '<%= dir.dest %>',
        expand: true,
      },
    },

    connect: {
      options: {
        port: 8080,
        hostname: '*',
        keepalive: true,
      },
      src: {},
      dist: {},
    },

    openui5_preload: {

      component: {
        options: {
          resources: {
            cwd: '<%= dir.src %>',
            prefix: '<%= dir.src %>',
          },
          dest: '<%= dir.dest %>',
        },
        components: '<%= dir.src %>',
      },

      library: {
        options: {
          resources: '<%= dir.src %>',
          dest: '<%= dir.dest %>',
        },
        libraries: '<%= dir.lib %>',
      },

    },

    openui5_connect: {
      options: {
        resources: [
          '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
          '<%= dir.bower_components %>/openui5-sap.m/resources',
          '<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources',
          '<%= dir.bower_components %>/codemirror',
          '<%= dir.bower_components %>/flocking',
        ],
      },
      src: {
        options: {
          appresources: [
            '<%= dir.src %>',
          ],
        },
      },
      dist: {
        options: {
          appresources: [
            '<%= dir.dest %>',
          ],
        },
      },
    },

    watch: {
      options: {livereload: true},
      default: {
        files: ['src/**'],
        // tasks: ['jshint'],
      },
    },

    concurrent: {
      run: ['openui5_connect:src', 'watch'],
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-openui5');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('serve', function (target) {
    if (target === 'src' || typeof target === 'undefined') {
      grunt.task.run('concurrent:run');
    } else if (target === 'dist') {
      grunt.task.run('openui5_connect:dist');
    }
  });

  grunt.registerTask('build', [
    'clean:dest',
    'copy:dest',
    'openui5_preload',
  ]);

  // Default task
  grunt.registerTask('default', [
    'concurrent:run',
  ]);
};
