export let a = 'will';
require('@babel/polyfill')

class B {

}

function * gen() {
    yield 1
}

console.log(gen().next());

'aaa'.includes('a')
