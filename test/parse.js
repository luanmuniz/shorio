var expect = require('chai').expect,
    parse = require('../lib/parser'),
	defaultOpts = {};


// Tags
var basic = '<html></html>';
var siblings = '<h2></h2><p></p>';

// Single Tags
var single = '<br/>';
var singleWrong = '<br>';

// Children
var children = '<html><br/></html>';
var li = '<li class="durian">Durian</li>';

// Attributes
var attributes = '<img src="hello.png" alt="man waving">';
var noValueAttribute = '<textarea disabled></textarea>';

// Comments
var comment = '<!-- sexy -->';
var conditional = '<!--[if IE 8]><html class="no-js ie8" lang="en"><![endif]-->';

// Text
var text = 'lorem ipsum';

// Script
var script = '<script type="text/javascript">alert("hi world!");</script>';
var scriptEmpty = '<script></script>';

// Style
var style = '<style type="text/css"> h2 { color:blue; } </style>';
var styleEmpty = '<style></style>';

// Directives
var directive = '<!doctype html>';


describe('parse', function() {

  describe('.eval', function() {

    it('should parse basic empty tags: ' + basic, function() {
      var tag = parse.parse(basic, defaultOpts).children[0];
      expect(tag.type).to.equal('tag');
      expect(tag.name).to.equal('html');
      expect(tag.children).to.have.length(2);
    });

    it('should handle sibling tags: ' + siblings, function() {
      var dom = parse.parse(siblings, defaultOpts).children,
          h2 = dom[0],
          p = dom[1];

      expect(dom).to.have.length(2);
      expect(h2.name).to.equal('h2');
      expect(p.name).to.equal('p');
    });

    it('should handle single tags: ' + single, function() {
      var tag = parse.parse(single, defaultOpts).children[0];
      expect(tag.type).to.equal('tag');
      expect(tag.name).to.equal('br');
      expect(tag.children).to.have.length(0);
    });

    it('should handle malformatted single tags: ' + singleWrong, function() {
      var tag = parse.parse(singleWrong, defaultOpts).children[0];
      expect(tag.type).to.equal('tag');
      expect(tag.name).to.equal('br');
      expect(tag.children).to.have.length(0);
    });

    it('should handle tags with children: ' + children, function() {
      var tag = parse.parse(children, defaultOpts).children[0];
      expect(tag.type).to.equal('tag');
      expect(tag.name).to.equal('html');
      expect(tag.children).to.be.a('array');
      expect(tag.children).to.have.length(2);
    });

    it('should handle tags with children: ' + li, function() {
      var tag = parse.parse(li, defaultOpts).children[0];
      expect(tag.children).to.have.length(1);
      expect(tag.children[0].data).to.equal('Durian');
    });

    it('should handle tags with attributes: ' + attributes, function() {
      var attrs = parse.parse(attributes, defaultOpts).children[0].attribs;
      expect(attrs).to.be.a('object');
      expect(attrs.src).to.equal('hello.png');
      expect(attrs.alt).to.equal('man waving');
    });

    it('should handle value-less attributes: ' + noValueAttribute, function() {
      var attrs = parse.parse(noValueAttribute, defaultOpts).children[0].attribs;

      expect(attrs)
      	.to.be.a('object')
      	.to.have.property('disabled')
      	.with.is.a('string')
      	.and.equal('');
    });

    it('should handle comments: ' + comment, function() {
      var elem = parse.parse(comment, defaultOpts).children[0];
      expect(elem.type).to.equal('comment');
      expect(elem.data).to.equal(' sexy ');
    });

    it('should handle conditional comments: ' + conditional, function() {
      var elem = parse.parse(conditional, defaultOpts).children[0];
      expect(elem.type).to.equal('comment');
      expect(elem.data).to.equal(conditional.replace('<!--', '').replace('-->', ''));
    });

    it('should handle text: ' + text, function() {
      var text_ = parse.parse(text, defaultOpts).children[0];
      expect(text_.type).to.equal('text');
      expect(text_.data).to.equal('lorem ipsum');
    });

    it('should handle script tags: ' + script, function() {
      var script_ = parse.parse(script, defaultOpts).children[0];
      expect(script_.type).to.equal('script');
      expect(script_.name).to.equal('script');
      expect(script_.attribs.type).to.equal('text/javascript');
      expect(script_.children).to.have.length(1);
      expect(script_.children[0].type).to.equal('text');
      expect(script_.children[0].data).to.equal('alert("hi world!");');
    });

    it('should handle style tags: ' + style, function() {
      var style_ = parse.parse(style, defaultOpts).children[0];
      expect(style_.type).to.equal('style');
      expect(style_.name).to.equal('style');
      expect(style_.attribs.type).to.equal('text/css');
      expect(style_.children).to.have.length(1);
      expect(style_.children[0].type).to.equal('text');
      expect(style_.children[0].data).to.equal(' h2 { color:blue; } ');
    });

    it('should handle directives: ' + directive, function() {
      var elem = parse.parse(directive, defaultOpts).children[0];
      expect(elem.type).to.equal('directive');
      expect(elem.data).to.equal('!DOCTYPE html');
      expect(elem.name).to.equal('!doctype');
    });

  });

  describe('.parse', function() {

    // root test utility
    function rootTest(root) {
      expect(root.name).to.be.equal('root');

      // Should exist but be null
      expect(root.next).to.be.equal(null);
      expect(root.prev).to.be.equal(null);
      expect(root.parent).to.be.equal(null);

      var child = root.children[0];
      expect(child.parent).to.be.equal(root);
    }

    it('should add root to: ' + basic, function() {
      var root = parse.parse(basic, defaultOpts);
      rootTest(root);
      expect(root.children).to.have.length(1);
      expect(root.children[0].name).to.equal('html');
    });

    it('should add root to: ' + siblings, function() {
      var root = parse.parse(siblings, defaultOpts);
      rootTest(root);
      expect(root.children).to.have.length(2);
      expect(root.children[0].name).to.equal('h2');
      expect(root.children[1].name).to.equal('p');
      expect(root.children[1].parent).to.equal(root);
    });

    it('should add root to: ' + comment, function() {
      var root = parse.parse(comment, defaultOpts);
      rootTest(root);
      expect(root.children).to.have.length(1);
      expect(root.children[0].type).to.equal('comment');
    });

    it('should add root to: ' + text, function() {
      var root = parse.parse(text, defaultOpts);
      rootTest(root);
      expect(root.children).to.have.length(1);
      expect(root.children[0].type).to.equal('text');
    });

    it('should add root to: ' + scriptEmpty, function() {
      var root = parse.parse(scriptEmpty, defaultOpts);
      rootTest(root);
      expect(root.children).to.have.length(1);
      expect(root.children[0].type).to.equal('script');
    });

    it('should add root to: ' + styleEmpty, function() {
      var root = parse.parse(styleEmpty, defaultOpts);
      rootTest(root);
      expect(root.children).to.have.length(1);
      expect(root.children[0].type).to.equal('style');
    });

    it('should add root to: ' + directive, function() {
      var root = parse.parse(directive, defaultOpts);
      rootTest(root);
      expect(root.children).to.have.length(2);
      expect(root.children[0].type).to.be.equal('directive');
    });

    it('should expose the DOM level 1 API', function() {
      var root = parse.parse('<div><a></a><span></span><p></p></div>', defaultOpts).children[0];
      var childNodes = root.children;

      expect(childNodes).to.have.length(3);

      expect(root.tagName).to.be.equal('div');
      expect(root.firstChild).to.be.equal(childNodes[0]);
      expect(root.lastChild).to.be.equal(childNodes[2]);

      expect(childNodes[0].tagName).to.be.equal('a');
      expect(childNodes[0].previousSibling).to.be.equal(null);
      expect(childNodes[0].nextSibling).to.be.equal(childNodes[1]);
      expect(childNodes[0].parentNode).to.be.equal(root);
      expect(childNodes[0].childNodes).to.have.length(0);
      expect(childNodes[0].firstChild).to.be.equal(null);
      expect(childNodes[0].lastChild).to.be.equal(null);

      expect(childNodes[1].tagName).to.be.equal('span');
      expect(childNodes[1].previousSibling).to.be.equal(childNodes[0]);
      expect(childNodes[1].nextSibling).to.be.equal(childNodes[2]);
      expect(childNodes[1].parentNode).to.be.equal(root);
      expect(childNodes[1].childNodes).to.have.length(0);
      expect(childNodes[1].firstChild).to.be.equal(null);
      expect(childNodes[1].lastChild).to.be.equal(null);

      expect(childNodes[2].tagName).to.be.equal('p');
      expect(childNodes[2].previousSibling).to.be.equal(childNodes[1]);
      expect(childNodes[2].nextSibling).to.be.equal(null);
      expect(childNodes[2].parentNode).to.be.equal(root);
      expect(childNodes[2].childNodes).to.have.length(0);
      expect(childNodes[2].firstChild).to.be.equal(null);
      expect(childNodes[2].lastChild).to.be.equal(null);
    });
  });

});
