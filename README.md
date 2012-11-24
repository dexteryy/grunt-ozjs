<!---
layout: intro
title: grunt-ozjs
-->

# grunt-ozjs

> * [OzJS](https://github.com/dexteryy/OzJS) is a microkernel for modular javascript, with bundles of powerful yet micro-framework friendly AMD modules. 
> * [Ozma](https://github.com/dexteryy/ozma.js) is an intelligent autobuild tool for OzJS.

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
    // comming soon...
},
ozma: {
    testapp: {
        src: 'tests/js/main.js', // same as 'ozma tests/js/main.js'
        saveConfig: false, // true for default ('ozconfig.json'), or string for specified path and file name
        debounceDelay: 3000, // see [1]
        config: { // or existing configuration file, same as option '--config'
            baseUrl: "tests/js/",
            distUrl: "tests/.tmp/js/",
            loader: "lib/oz.js",
            disableAutoSuffix: true
        }
    }
}
```

[1]: fix for [built-in watch](https://github.com/gruntjs/grunt/issues/376)

#### Options

For a full list of possible options, [see the grunt.js example](https://github.com/dexteryy/grunt-ozjs/blob/master/grunt.js).

## Examples

Execute the following command from `./` directory 

```
grunt ozma:testapp
```

See `tests/dist/js/main.js`

Then execute:

```
grunt
```

See `tests/index.html` and `tests/static/js/`

## Source code

* [View on Github](https://github.com/dexteryy/grunt-ozjs)

## More References

See [OzJS References](http://ozjs.org/#ref)

## Release History

See [OzJS Release History](http://ozjs.org/#release)

## License

Copyright (c) 2010 - 2013 dexteryy  
Licensed under the MIT license.

