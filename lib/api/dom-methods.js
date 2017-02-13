'use strict';

var DomMethods = {

	get(index) {
		this.selector = this.selector[index];
		return this;
	},

	index() {},
	size() {},
	toArray() {}

};

module.exports = DomMethods;
