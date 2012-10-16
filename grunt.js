
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        info: '<json:package.json>',
        meta: {
            banner: '/*!\n * test cases for <%= info.title || info.name %> - v<%= info.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= info.author.name %>;' +
                ' Licensed <%= _.pluck(info.licenses, "type").join(", ") %>\n */'
        },
        oz: {},
        ozma: {
            test: {
                src: 'tests/js/main.js',
                config: {
                    baseUrl: "tests/js/",
                    distUrl: "tests/.tmp/js/",
                    loader: "lib/oz.js",
                    disableAutoSuffix: true
                },
                save_config: false,
                debounceDelay: 3000,
                silent: false,
                jam: false,
                'enable-modulelog': false
            }
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', 'tests/.tmp/js/main.js'],
                dest: 'tests/dist/js/test.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'tests/dist/js/test.min.js'
            }
        },
        lint: {
            all: ['grunt.js', 'tasks/*.js']
        },
        watch: {
            files: 'tests/js/**/*.js',
            tasks: 'ozma:test concat'
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'lint ozma:test concat min');

};
