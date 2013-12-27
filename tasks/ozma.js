
module.exports = function(grunt){

    var path = require('path');
    var ozma = require('ozma').ozma;
    var DESC = 'enables you to use gruntfile to configure ozma and integrate with other grunt tasks';

    grunt.registerMultiTask('ozma', DESC, function() {
        var done = this.async();
        run_ozma(this.data, done);
    });

    function run_ozma(opt, cb) {
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
        ozma().exec(opt, cb);
    }

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
