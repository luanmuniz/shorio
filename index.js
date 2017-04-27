'use strict';

const Parser = require('./lib/parser');
const cssSelect = require('css-select');
const Helper = require('./lib/helper');
const Attributes = require('./lib/api/attributes');
const Clone = require('./lib/api/clone');
const DomMethods = require('./lib/api/dom-methods');
const IntertionAround = require('./lib/api/insertion-around');
const IntertionInside = require('./lib/api/insertion-inside');
const IntertionOutside = require('./lib/api/insertion-outside');
const Removal = require('./lib/api/removal');

var Shorio = {

	defaultOptions: { },

	load(html, options = {}) {
		const opt = Object.assign({}, Shorio.defaultOptions, options);

		Shorio.DOM = Parser.parse(html, opt);

		return Shorio.select;
	},

	select(cssQuery) {
		let domSelected = cssSelect(cssQuery, Shorio.DOM.children);

		return Shorio.getAllMethods(Shorio.DOM, domSelected);
	},

	getAllMethods(DOM, selector) {
		return Object.assign(
			{
				DOM,
				selector
			},
			Helper,
			Attributes,
			Clone,
			DomMethods,
			IntertionAround,
			IntertionInside,
			IntertionOutside,
			Removal
		);
	}

};

module.exports = Object.create(Shorio);
