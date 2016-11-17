'use strict';

var Attributes = {

	addClass(className) {
		return this.setAttr('class', className);
	},

	attr(attrName, value) {
		if(!attrName) {
			return this.selector[0].attribs;
		}

		if(value) {
			return this.setAttr(attrName, value);
		}

		return this.getAttr(attrName);
	},

	getAttr(attrName) {
		return this.selector[0].attribs[attrName];
	},

	setAttr(attrName, value) {
		this.selector.forEach((thisElem, index) => {
			if(!this.selector[index].attribs[attrName]) {
				return this.selector[index].attribs[attrName] = value;
			}

			if(!value) {
				return this.removeAttr(attrName);
			}

			var attrValueArray = this.selector[index].attribs[attrName].split(' ');
			attrValueArray.push(value);

			this.selector[index].attribs[attrName] = attrValueArray.join(' ');
		});

		return this;
	},

	hasClass(className) {
		var hasClass = false;

		this.selector.forEach((thisElem) => {
			if(!thisElem.attribs.class) {
				return;
			}

			if(thisElem.attribs.class.includes(className)) {
				hasClass = true;
			}
		});

		return hasClass;
	},

	prop(propertyName, value) {
		return 1;
	},

	removeAttr(attrName) {
		this.selector.forEach((thisElem, index) => {
			delete this.selector[index].attribs[attrName];
		});
	},

	removeClass() {
		return 1;
	},

	removeProp() {
		return 1;
	},

	toggleClass() {
		return 1;
	},

	val() {
		return 1;
	},

	data(dataName) {
		return 1;
	},

	removeData() {
		return 1;
	}

};

module.exports = Attributes;
