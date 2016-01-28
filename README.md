angular-slider-easy
====================
![][bower-url]
[![NPM version][npm-image]][npm-url]
![][david-url]
![][dt-url]
![][license-url]


An angular slider directive aim to ease the way to build up friendly app

This is an `angular` directive, by which, you would set up an slider-bar easily in few lines of code.

![](https://raw.githubusercontent.com/leftstick/angular-slider-easy/master/docs/img/example.png)

Try it: [plunker](http://plnkr.co/edit/sf0a6NBQ8GO5NccIBMY8?p=preview)

## Requirement ##

- [angularjs](http://angularjs.org/) (1.2.0+)

## Install via bower ##

```JavaScript
bower install --save angular-slider-easy
```

## Install via npm ##

```JavaScript
npm install --save angular-slider-easy
```

## Basic Usage ##

### Include `angular-slider-easy.*` ###

```HTML
<link rel="stylesheet" type="text/css" href="angular-slider-easy.css">
<script type="text/javascript" src="angular-slider-easy.js"></script>
```

> Be sure load `angular-slider-easy.js` after `angular.js` is loaded.


### Set `angular-slider-easy` as dependency ###

```JavaScript
var demo = angular.module('demo', ['angular-slider-easy']);
```

### Set `option` in `ngController` ###

```JavaScript
$scope.option = {
    start: 3,  //start point of the slider bar
    end: 218,  //end point of the slider bar
    handles: [19, 60],  //init point of two handles
    outFormatter: function(value, decimals) {
        if (value.point) {
            return '当前值：' + value.point;
        } else {
            return '选中范围：' + (value.end - value.start).toFixed(decimals);
        }
    }//formatter of hint message
};
```

### Set `value` in `ngController` ###

```JavaScript
$scope.val = {};
```

> This is very important, you won't get the selected point/range if you missed this variable

### Use `directive` in `HTML` ###

```HTML
<slider-easy value="val" option="option"></slider-easy>
<span>{{ val }}</span> <!-- display the val while moving the slider handle -->
```


## API ##

### option[[expression]] ###

| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| start | number | Yes | start point of the slider bar |
| end | number | Yes | end point of the slider bar |
| decimals | int | No | the number of decimals will be kept in `value`, 0 by default |
| handles | array | No | the init points of handles. If you want a range set in `value`, this is mandantory. If handles is missed, only one handle with init point as `start` will be generated |
| outFormatter | function(value, decimals) | No | the formatter will be used format the hint message. usefull while you want to customize the hint message |

### value[[expression]] ###

> An empty plain object should be set in the `$scope`, and it will be filled with the selected value

| Attribute        | Type             | Description |
| :------------- |:-------------| :-----|
| point | number | will be filled while no `handles` set or `handles` has only one value in it. Which means, it is an point selector |
| start | number | will be filled while `handles` is set with two values. Which means, it is an range selector |
| end | number | will be filled while `handles` is set with two values. Which means, it is an range selector |

## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular-slider-easy/master/LICENSE)



[expression]: https://docs.angularjs.org/guide/expression
[bower-url]: https://img.shields.io/bower/v/angular-slider-easy.svg
[npm-url]: https://npmjs.org/package/angular-slider-easy
[npm-image]: https://badge.fury.io/js/angular-slider-easy.png
[david-url]: https://david-dm.org/leftstick/angular-slider-easy.png
[dt-url]:https://img.shields.io/npm/dt/angular-slider-easy.svg
[license-url]:https://img.shields.io/npm/l/angular-slider-easy.svg
