
module.exports = function(grunt){

    var path = require('path');
    var Ozma = require('ozma').Ozma;
    var _lock;

    grunt.registerMultiTask('ozma', '', function() {
        var done = this.async();
        var tasks = grunt.config('ozma');
        grunt.helper('ozma', tasks[this.target], done);
    });

    grunt.registerHelper('ozma', function(opt, cb) {
        if (_lock) {
            grunt.log.write('The interval(' + (+new Date() - _lock) +
                's) is shorter than ' + opt.debounceDelay + 's, skip...');
            return cb();
        }
        _lock = +new Date();
        opt = Object.create(opt);
        var src = opt.src;
        var config = opt.config;
        var save_cfg = opt.save_config;
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

};
