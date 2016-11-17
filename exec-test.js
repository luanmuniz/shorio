'use strict';

var dommanip = require('./index');
var cheerio = require('cheerio');

// var $ = cheerio.load('<h1 class="wer ewrt">asd<span>fgh</span></h1><h1>asd<span>fgh</span></h1>');
// console.log($('h1'), $('h1').hasClass('wer'));
var $ = dommanip.load('<h1 class="wer ghj ewrt">asd<span>fgh</span></h1><h1>asd<span>fgh</span></h1>');
console.log($('h1').attr('class').selector);
