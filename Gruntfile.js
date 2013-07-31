
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            name: 'testapp',
            distDir: 'tests/dist',
            staticDir: 'tests/static',
            banner: '/*!\n * test app for <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */'
        },
        oz: {
            // coming soon...
        },
        ozma: {
            testapp: {
                src: 'tests/js/main.js',
                saveConfig: false, // true for default ('ozconfig.json'), or string for specified path and file name
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
            options: {
                stripBanners: true,
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['<%= meta.distDir %>/js/main.js'],
                dest: '<%= meta.staticDir %>/js/<%= meta.name %>.js'
            }
        },
        uglify: {
            dist: {
                src: ['<%= meta.banner %>', '<%= concat.dist.dest %>'],
                dest: '<%= meta.staticDir %>/js/<%= meta.name %>.min.js'
            }
        },
        jshint: {
            all: ['grunt.js', 'tasks/*.js']
        },
        watch: {
            files: 'tests/js/**/*.js',
            tasks: ['ozma:testapp', 'concat']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'ozma:testapp', 'concat', 'uglify']);

};
