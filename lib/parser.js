'use strict';

const parse5 = require('parse5');

const Parser = {

	defaultOptions: {
		treeAdapter: parse5.treeAdapters.htmlparser2
	},

	parse(html, options) {
		var dom = null;

		const opt = Object.assign({}, Parser.defaultOptions, options);

		if(Buffer.isBuffer(html)) {
			html = html.toString();
		}

		if(typeof html === 'string') {
			if(Parser.shouldParseAsDocument(html)) {
				dom = parse5.parse(html, opt);
			} else {
				dom = parse5.parseFragment(html, opt);
			}

			return dom;
		}

		return html;
	},

	shouldParseAsDocument(content) {
		// NOTE: if evaluate was called in fragment parsing mode, but doctype or <html> tag was passed
		// we should switch to document parsing mode. This is a pretty simple heuristic, e.g. we don't expect
		// comments at the beginning of the content.
		return (/^\s*<!doctype/i).test(content) || (/^\s*<html/i).test(content);
	},

	render(dom, options) {
		return parse5.serialize(dom, Parser.defaultOptions);
	}

};

module.exports = Object.create(Parser);
