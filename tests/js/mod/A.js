
define(['mod/C', 'mod/D'], function(C, D){

    return {
        name: 'mod/A',
        deps: {
            'mod/C': C,
            'mod/D': D
        }
    };

});

