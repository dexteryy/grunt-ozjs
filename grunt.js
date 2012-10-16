
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        info: grunt.file.readJSON('package.json'),
        meta: {
            name: 'testapp',
            distDir: 'tests/dist',
            staticDir: 'tests/static',
            banner: '/*!\n * test app for <%= info.title || info.name %> - v<%= info.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= info.author.name %>;' +
                ' Licensed <%= _.pluck(info.licenses, "type").join(", ") %>\n */'
        },
        oz: {
            // comming soon...
        },
        ozma: {
            testapp: {
                src: 'tests/js/main.js',
                saveConfig: false, // true for default ('ozconfig.json'), or string for specified path and file name
                debounceDelay: 3000, // fix for built-in watc
                'config': { // or existing configuration file, same as option '--config'
                    baseUrl: "tests/js/",
                    distUrl: "<%= meta.distDir %>/js/",
                    loader: "lib/oz.js",
                    disableAutoSuffix: true
                },
                'silent': false, // same as 'ozma --silent'
                'jam': false, // same as 'ozma --jam'
                'enable-modulelog': false // same as 'ozma --enable-modulelog'
            }
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<%= meta.distDir %>/js/main.js'],
                dest: '<%= meta.staticDir %>/js/<%= meta.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<%= concat.dist.dest %>'],
                dest: '<%= meta.staticDir %>/js/<%= meta.name %>.min.js'
            }
        },
        lint: {
            all: ['grunt.js', 'tasks/*.js']
        },
        watch: {
            files: 'tests/js/**/*.js',
            tasks: 'ozma:testapp concat'
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'lint ozma:testapp concat min');

};
