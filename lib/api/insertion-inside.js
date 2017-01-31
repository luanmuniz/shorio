'use strict';

const parser = require('../parser');

var InsertionInside = {

	append() { },
	appendTo() { },
	html() {
		return parser.render({
			type: 'root',
			name: 'root',
			parent: null,
			prev: null,
			next: null,
			children: this.selector
		});
	},
	prepend() { },
	prependTo() { },
	text() { }

};

module.exports = InsertionInside;
