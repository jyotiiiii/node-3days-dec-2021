"use strict";

const sayHiTo = prefixer("Hello ");
const sayByeTo = prefixer("Goodbye ");
console.log(sayHiTo("Kevin")); // prints 'Hello Kevin'
console.log(sayHiTo("Paula")); // prints 'Hello Paula'
console.log(sayByeTo("Kevin")); // prints 'Goodbye Kevin'
