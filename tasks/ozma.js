
module.exports = function(grunt){

    var path = require('path');
    var Ozma = require('ozma').Ozma;
    var DESC = 'enables you to use gruntfile to configure ozma and integrate with other grunt tasks';
    var _lock;

    grunt.registerMultiTask('ozma', DESC, function() {
        var done = this.async();
        grunt.helper('ozma', this.data, done);
    });

    grunt.registerHelper('ozma', function(opt, cb) {
        if (_lock) {
            grunt.log.write('The interval(' + (+new Date() - _lock) +
                's) is shorter than ' + opt.debounceDelay + 's, skip...');
            return cb();
        }
        _lock = +new Date();
        recurse_process(opt);
        opt = Object.create(opt);
        var src = opt.src;
        var config = opt.config;
        var save_cfg = opt.saveConfig;
        if (typeof config !== 'string' && save_cfg) {
            if (typeof save_cfg === 'boolean') {
                opt.config = path.join(path.dirname(src), 'ozconfig.json');
            } else {
                opt.config = save_cfg;
            }
            grunt.file.write(opt.config, 
                JSON.stringify(config).replace(/\,"/g, ',\n  "')
                    .replace('{', '{\n  ').replace('}', '\n}'));
        }
        opt._ = [src];
        Ozma()(opt, function(){
            cb();
            setTimeout(function(){
                _lock = false;
            }, opt.debounceDelay || 2000);
        });
    });

    function recurse_process(obj){
        for (var i in obj) {
            if (typeof obj[i] === 'string') {
                obj[i] = grunt.template.process(obj[i]);
            } else if (typeof obj[i] === 'object') {
                recurse_process(obj[i]);
            }
        }
    }

};
