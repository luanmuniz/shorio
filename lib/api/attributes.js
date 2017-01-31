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
		if(!value) {
			return this.removeAttr(attrName);
		}

		attrName = this.convertToArray(attrName);

		this.selector.forEach((thisElem, index) => {
			attrName.forEach((thisAttrName) => {
				if(!this.selector[index].attribs[thisAttrName]) {
					return this.selector[index].attribs[thisAttrName] = `${value}`;
				}

				var attrValueArray = this.selector[index].attribs[thisAttrName].split(' ');
				attrValueArray.push(value);

				this.selector[index].attribs[thisAttrName] = attrValueArray.join(' ');
			});
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
		if(!value){
			return !!this.selector[0][propertyName];
		}

		propertyName = this.convertToArray(propertyName);

		this.selector.forEach((thisElem, index) => {
			propertyName.forEach((thispropertyName) => {
				return this.selector[index][thisAttrName] = !!value;
			});
		});

		return this;
	},

	removeAttr(attrName) {
		attrName = this.convertToArray(attrName);

		this.selector.forEach((thisElem, index) => {
			attrName.forEach((thisAttrName) => {
				if (!thisElem || !thisElem.hasOwnProperty(thisAttrName)){
					return;
				}

				delete this.selector[index].attribs[thisAttrName];
			});
		});

		return this;
	},

	removeClass(className) {
		if(!className) {
			return this.setAttr('class', '');
		}

		this.selector.forEach((thisElem, index) => {
			let classesArray = this.selector[index].attribs['class'].split(' ');

			className.split(' ').forEach((thisClass) => {
				let classToRemoveIndex = classesArray.indexOf(thisClass);

				if (classToRemoveIndex !== -1) {
					classesArray.splice(classToRemoveIndex, 1);
				}
			});


			this.selector[index].attribs['class'] = classesArray.join(' ');
		});

		return this;
	},

	removeProp(propName) {
		propName = this.convertToArray(propName);

		this.selector.forEach((thisElem, index) => {
			propName.forEach((thisPropName) => {
				delete this.selector[index][thisPropName];
			});
		});

		return this;
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

	data(dataKey, value) {
		let dataName = `data-${dataKey.replace(/[A-Z]/g, "-$&").toLowerCase()}`;

		if(value) {
			return this.setAttr(dataName, value);
		}

		return this.getAttr(dataName);
	},

	removeData(dataKey) {
		let dataName = `data-${dataKey.replace(/[A-Z]/g, "-$&").toLowerCase()}`;

		return this.removeAttr(dataName);
	}

};

module.exports = Attributes;
