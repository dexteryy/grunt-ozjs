
require.config({
    baseUrl: 'js/',
    distUrl: 'dist/js/'
});

require([
    'test/app'
], function(app){
    console.info(app);
});
