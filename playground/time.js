const moment = require('moment');

var date = moment();

console.log(date.format('x'));

console.log(date.format('dddd, MMMM Do YYYY'));
console.log('It\'s', date.format('h:mm a'));