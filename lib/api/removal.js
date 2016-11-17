'use strict';

const InsertionAround = require('./insertion-around');

var Removal = {

	detach() { },
	empty() { },
	remove() { },

	unwrap: InsertionAround.unwrap

};

module.exports = Removal;
