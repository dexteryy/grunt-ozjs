# grunt-ozjs

> [OzJS](https://github.com/dexteryy/OzJS) is a microkernel for modular javascript, with bundles of powerful yet micro-framework friendly AMD modules. 

> [Ozma](https://github.com/dexteryy/ozma.js) is an intelligent autobuild tool for OzJS.

## Getting Started
Install this [grunt] plugin next to your project's [grunt.js gruntfile][getting_started] with: 

```
npm install grunt-ozjs
```

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-ozjs');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

#### Config Example

``` javascript
oz: {
    // not yet
},
ozma: {
    dist: {
        src: 'tests/js/main.js',
        config: { // or existing configuration file
            baseUrl: "tests/js/",
            distUrl: "tests/.tmp/js/",
            loader: "lib/oz.js",
            disableAutoSuffix: true
        },
        save_config: false, // or specified path and file name
        debounceDelay: 3000
    }
}
```

#### Options

For a full list of possible options, [see the grunt.js example]().

## Examples

Execute the following command from `./` directory 

```
grunt ozma:dist
```

See `tests/.tmp/js/main.js`

Then execute:

```
grunt
```

See `tests/index.html` and `tests/dist/js/`

## License
Copyright (c) 2012 dexteryy  
Licensed under the MIT license.

