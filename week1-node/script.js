const lodash = require('lodash');

console.log('Hejssan vaagot');

const a = 'Foo Bar'; //fooBar
const b = lodash.camelCase(a);

console.log(b);