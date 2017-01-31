'use strict';

var Helper = {

	getType(value) {
		return Object.prototype.toString.call(value)
			.replace(/^\[object (.+)\]$/, "$1")
			.toLowerCase();
	},

	isFunction(value) {
		return !!(value && value.constructor && value.call && value.apply);
	},

	convertToArray(value) {
		if(typeof value === 'object') {
			value = Object.keys(value);
		}

		if(!Array.isArray(value)) {
			value = [ value ];
		}

		return value;
	}

};

module.exports = Helper;
