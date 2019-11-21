let str = require('./a.js')

console.log(str)

require('./index.css')
require('./index.less')

let fn = ()=>{
  console.log('log')
}

fn();

@log
class A {
  a = 5;
}

function log(t) {
  console.log(t)
}

let a = new A()
console.log(a.a)


import $ from 'jquery'
console.log(window.$)
