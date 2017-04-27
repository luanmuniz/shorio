'use strict';

var shorio = require('./index');
var cheerio = require('cheerio');

// var $ = cheerio.load('<h1 class="wer ewrt">asd<span>fgh</span></h1><h1>asd<span>fgh</span></h1>');
// console.log($('h1'), $('h1').hasClass('wer'));
var $ = shorio.load('<h1 class="wer ghj ewrt">asd<span>fgh</span></h1><h1>asd<span>fgh</span></h1><input type="checkbox" checked="checked">');
console.log($('input').selector[0]['x-attribsPrefix']);
