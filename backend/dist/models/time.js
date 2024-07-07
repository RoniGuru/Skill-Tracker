"use strict";
console.log(new Date());
const today = new Date();
// Subtract one day (24 hours) from the current date
today.setDate(today.getDate() - 1);
console.log(today);
const decay = 100 * Math.pow(0.99, 3);
console.log(100 - decay);
