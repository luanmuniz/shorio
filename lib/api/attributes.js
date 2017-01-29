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

		return this;
	},

	removeClass(className) {
		if(!className) {
			return this.setAttr('class', '');
		}

		this.selector.forEach((thisElem, index) => {
			let classesArray = this.selector[index].attribs['class'].split(' ');

			className..split(' ').forEach((thisClass) => {
				let classToRemoveIndex = classesArray.indexOf(thisClass);

				if (classToRemoveIndex !== -1) {
					classesArray.splice(classToRemoveIndex, 1);
				}
			});


			this.selector[index].attribs['class'] = classesArray.join(' ');
		});

		return this;
	},

	removeProp() {
		return 1;
	},

	toggleClass(className, stateVal) {
		if (typeof stateVal === "boolean") {
			return stateVal ? this.addClass(className) : this.removeClass(className);
		}

		if(this.hasClass(className)) {
			return this.removeClass(className);
		}

		return this.addClass(className);
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
