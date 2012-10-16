
define(['mod/A', 'mod/B'], function(A, B){

    return {
        name: 'app',
        deps: {
            'mod/A': A,
            'mod/B': B
        }
    };

});
