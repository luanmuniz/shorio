'use strict';

const parser = require('../parser');

var InsertionInside = {

	append() { },
	appendTo() { },
	html() {
		return parser.render(this.selector);
	},
	prepend() { },
	prependTo() { },
	text() { }

};

module.exports = InsertionInside;
