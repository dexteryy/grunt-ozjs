
module.exports = function(grunt){

    var path = require('path');

    grunt.registerMultiTask('oz', '', function() {
        var done = this.async();
        if (this.data.jstemplate) {
            grunt.helper('pretemplate', this.data.jstemplate, done);
        }
    });

    grunt.registerHelper('pretemplate', function(opt, done) {
        grunt.file.recurse(opt.src, function(abspath, rootdir, subdir, filename) {
            var text = grunt.file.read(abspath, { encoding: 'utf-8' });
            var json = {
                'template': text.toString()
            };
            var INDENT = '    ';
            var code = 'define([], function(){\n\n' 
                + INDENT + 'return ' 
                + JSON.stringify(json)
                + '; \n\n});';
            var output = path.join(opt.dest, filename.replace(/\..+?$/, '.js'));
            grunt.file.write(output, code);
            grunt.log.writeln( "File '" + output + "' created." );
        });
        done();
    });

};
