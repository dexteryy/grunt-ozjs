
define(['mod/B'], function(B){

    require('mod/A', function(A){
        console.info('mod/A ready', A);
    });

    return {
        name: 'app',
        deps: {
            'mod/B': B
        }
    };

});
