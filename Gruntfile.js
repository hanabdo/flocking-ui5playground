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
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    /* vars */

    pkg: grunt.file.readJSON('package.json'),
    bower: '',
    githash: {main: {}},
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

    jscs: {
      src: '<%= dir.src %>',
      options: {
        config: '.jscsrc',
        verbose: true,
        fix: false, // Autofix code style violations when possible.
      },
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        metadata: '',
        regExp: false,
      },
    },

    'string-replace': {
      destindexhtml: {
        files: {
          'dist/index.html': 'src/index.html',
        },
        options: {
          replacements: [{
            pattern: /src=[^\n]*/ig,
            replacement: 'src="https://openui5.hana.ondemand.com/<%= bower.dependencies["openui5-sap.m"].pkgMeta.version %>/resources/sap-ui-core.js"',
          }],
        },
      },
    },

    modify_json: {
      destmanifest: {
        src: 'dist/manifest.json',
        options: {
          add: true,
          indent: '  ',
          fields: {
            'sap.app': {
              applicationVersion: {
                version: '<%= pkg.version %>-<%= githash.main.short %>',
              },
            },
            'sap.ui5': {
              resourceRoots: {
                'zlib.CodeMirror.native': 'https://npmcdn.com/codemirror@<%= bower.dependencies.codemirror.pkgMeta.version %>',
                'zlib.Flocking.native': 'https://npmcdn.com/codemirror@<%= bower.dependencies.flocking.pkgMeta.version %>',
              },
            },
          },
        },
      },
      srcmanifest: {
        src: 'src/manifest.json',
        options: {
          add: true,
          indent: '  ',
          fields: {
            'sap.app': {
              applicationVersion: {
                version: '<%= pkg.version %>',
              },
            },
          },
        },
      },
    },

    shell: {
      bower: {
        command: 'bower -j list',
        options: {
          callback: store,
          stderr: false,
          stdout: false,
        },
      },
    },

    'gh-pages': {
      options: {
        base: 'dist',
        tag: '<%= githash.main %>',
      },
      src: '**/*',
    },

  });

  function store(err, stdout, stderr, fCallBack) {
    grunt.config('bower', JSON.parse(stdout));
    fCallBack();
  };

  grunt.registerTask('serve', function (target) {
    if (target === 'src' || typeof target === 'undefined') {
      grunt.task.run('concurrent:run');
    } else if (target === 'dist') {
      grunt.task.run('openui5_connect:dist');
    }
  });

  grunt.registerTask('build', [
    'jscs',
    'clean:dest',
    'copy:dest',
    'githash',
    'shell:bower',
    'modify_json:destmanifest',
    'string-replace:destindexhtml',
    'openui5_preload',
  ]);

  grunt.registerTask('releasepatch-1', [
    'bump-only:patch',
  ]);

  grunt.registerTask('releasepatch-2', [
    'githash',
    'modify_json:srcmanifest',
    'bump-commit',
  ]);

  grunt.registerTask('deploy', [
    'gh-pages',
  ]);

  // Default task
  grunt.registerTask('default', [
    'concurrent:run',
  ]);
};
