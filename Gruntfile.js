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

    /* local server */

    connect: {
      options: {
        open: true,
        port: true,
        hostname: '*', /* make the server accessible from any local IPv4
                        * address like '127.0.0.1' and the IP assigned to
                        * an ethernet or wireless interface
                        * (like '192.168.0.x' or '10.0.0.x'). */
        keepalive: true,
      },
      src: {},
      dist: {},
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
        tasks: ['jscs:src'],
      },
    },

    /* build */

    // sass tasks
    compass: {
      compilesrc: {
        options: {
          config: 'sassconfig.rb',
        },
      },
      'compilesrc-cm': {
        options: {
          config: 'sassconfig-cm.rb',
        },
      },
      watchsrc: {
        options: {
          config: 'sassconfig.rb',
          watch: true,
        },
      },
      'watchsrc-cm': {
        options: {
          config: 'sassconfig-cm.rb',
          watch: true,
        },
      },
    },

    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      run: [
        'openui5_connect:src',
        'watch',
        'compass:watchsrc',    // can be rewritted to watch task without
        'compass:watchsrc-cm', //   using `watch: true`
      ],
    },

    jscs: {
      src: '<%= dir.src %>',
      options: {
        config: '.jscsrc',
        verbose: true,
        fix: false, // Autofix code style violations when possible.
      },
    },

    clean: {
      dest: [
        '<%= dir.dest %>',
        '<%= dir.src %>/css',
        '<%= dir.src %>/zlib/Codemirror.css',
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
      // update openui5 src url
      destindexhtml: {
        files: {
          'dist/index.html': 'dist/index.html',
          'dist/test/integration/opaTests.qunit.html':
                             'dist/test/integration/opaTests.qunit.html',
          'dist/test/unit/unitTests.qunit.html':
                             'dist/test/unit/unitTests.qunit.html',
        },
        options: {
          replacements: [{
            pattern: /src=[^\n]*/ig,
            replacement: 'src="https://openui5.hana.ondemand.com/<%= bower.dependencies["openui5-sap.m"].pkgMeta.version %>/resources/sap-ui-core.js"',
          }],
        },
      },
      // update index.html resource roots
      // @todo why manifest JSON resourceroots not sufficient?
      destresourceroots: {
        files: {
          'dist/index.html': 'dist/index.html',
          'dist/test/integration/opaTests.qunit.html':
                             'dist/test/integration/opaTests.qunit.html',
          'dist/test/unit/unitTests.qunit.html':
                             'dist/test/unit/unitTests.qunit.html',
        },
        options: {
          replacements: [{
            pattern: /zlib.CodeMirror.native\": \"[^\"]*/ig,
            replacement: 'zlib.CodeMirror.native": "https://unpkg.com/codemirror@<%= bower.dependencies.codemirror.pkgMeta.version %>/',
          }, {
            pattern: /zlib.Flocking.native\": \"[^\"]*/ig,
            replacement: 'zlib.Flocking.native": "https://unpkg.com/flocking@<%= bower.dependencies.flocking.pkgMeta.version %>/',
          }],
        },
      },
    },

    modify_json: {
      // update version
      destmanifestversion: {
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
          },
        },
      },
      // update resourceRoots
      destmanifestresourceroots: {
        src: 'dist/manifest.json',
        options: {
          add: true,
          indent: '  ',
          fields: {
            'sap.ui5': {
              resourceRoots: {
                'zlib.CodeMirror.native': 'https://unpkg.com/codemirror@<%= bower.dependencies.codemirror.pkgMeta.version %>/',
                'zlib.Flocking.native': 'https://unpkg.com/flocking@<%= bower.dependencies.flocking.pkgMeta.version %>/',
              },
            },
          },
        },
      },
      // update version
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
      // fetch bower info
      bower: {
        command: 'bower -j list',
        options: {
          callback: store,
          stderr: false,
          stdout: false,
        },
      },
      changelog: {
        options: {
          stdinRawMode: true,
        },
        command: 'subl -w CHANGELOG.md',
      },
    },

    qunit: { // make sure `grunt serve` is running
      all: {
        options: {
          urls: [
            'http://localhost:8080/test/unit/unitTests.qunit.html',
          ],
        },
      },
    },

    /* deploy */

    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: 'angular',
          releaseCount: 0,
        },
      },
      release: {
        src: 'CHANGELOG.md',
      },
    },

    'gh-pages': {
      options: {
        base: '<%= dir.dest %>',
        message: 'v<%= pkg.version %>-<%= githash.main.short %>\n\n' +
                 'Auto generated commit',
      },
      src: '**/*',
    },

  });

  // Default task
  grunt.registerTask('default', [
    'concurrent:run',
  ]);

  /* develop */

  grunt.registerTask('serve', function (target) {
    if (target === 'src' || typeof target === 'undefined') {
      grunt.task.run('concurrent:run');
    } else if (target === 'dist') {
      grunt.task.run('openui5_connect:dist');
    }
  });

  /* build */

  function store(err, stdout, stderr, fCallBack) {
    grunt.config('bower', JSON.parse(stdout));
    fCallBack();
  };

  grunt.registerTask('buildprepare', [
    'jscs',                            // js linter checks
    // 'html/xmlcheck',                   // xml/html syntax check
    // 'json',                            // json syntax check
    'clean:dest',                      // clean destination folder
    'compass:compilesrc',              // generate css files
    'compass:compilesrc-cm',
    'copy:dest',                       // src -> dest
    'githash',                         // fetch git info
    'shell:bower',                     // fetch bower info
  ]);

  grunt.registerTask('build', [
    'buildprepare',
    'modify_json:destmanifestversion', // update resourcePath and version
    'openui5_preload',                 // make component/library preload
  ]);

  // by some reason should run in two steps
  grunt.registerTask('releasepatch-1', [
    'bump-only:patch',               // increment patch version
  ]);

  grunt.registerTask('releasepatch-2', [
    'githash',                         // fetch git info
    'modify_json:destmanifestversion', // update version
    'bump-commit',                     // commit, tag, push
  ]);

  /* deploy */

  grunt.registerTask('deploy', [
    'buildprepare',

    'modify_json:destmanifestversion',  // replace resourcePath and version
    'modify_json:destmanifestresourceroots',
    'string-replace:destresourceroots',
    'string-replace:destindexhtml',     // update openui5 src url
    'openui5_preload',                  // make component/library preload

    'gh-pages',                         // publish to github
  ]);

  /* test */

  grunt.registerTask('test', [
    'jscs',                             // js linter checks
  ]);

};
