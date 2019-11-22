let str = require('./a.js')
let image = require('./image.js')

// import 'bootstrap'

require('./ajax.js')

console.log(str)

// require('./index.css')
// require('./index.less')
require('./style')

let fn = () => {
    console.log('log1')
}

fn();

@log
class A {
    constructor() {
        console.log('出差了1')
    }

    a = 5;
}

function log(t) {
    console.log(t)
}

let a = new A()
console.log(a.a)


import $ from 'jquery'

console.log($)

console.log('FLAG=', FLAG)
console.log('DEV', DEV)
console.log('EXPRESSION', EXPRESSION)


let url = '';
if (DEV === 'dev') {
    url = 'http://127.0.0.1:3000'
} else {
    url = 'http://tps.allcure.cn'
}
console.log('url=', url)
