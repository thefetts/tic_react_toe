'use strict';

let order = [0, 1, 2, 5, 8, 7, 6, 3];

let getIndex = (x) => {
	let a = order.indexOf(x);
	if(a === -1) {
		throw new Error(`Invalid argument: ${x}`);
	}
	return a;
};

let opposite = (x) => 8-x;

let cornerBetween = function(side, corner) {
	let a = getIndex(side);
	let b = getIndex(corner);

	if(a > b) b += 8;
	let index;
	if(b - a === 3) {
		index = a === order.length-1 ? 0 : a+1;
	} else if(b - a === 5) {
		index = a === 0 ? order.length : a-1;
	} else {
		throw new Error(`Invalid side and corner pair: ${side}, ${corner}`);
	}
	return order[index];
};

let nextCorner = function(x) {
	let a = getIndex(x);
	let evenPosition = Math.floor(a/2)*2;
	let index = evenPosition < 6 ? evenPosition+2 : 0;
	return order[index];
};

let nextSide = function(x) {
	let a = getIndex(x);
	let evenPosition = Math.ceil(a/2)*2;
	let index = evenPosition < 8 ? evenPosition+1 : 1;
	return order[index];
};

let oppositeCorners = function(x) {
	let index = getIndex(x);
	let a = (index + 3) % 8;
	let b = (index + 5) % 8;
	return [order[a], order[b]];
};

module.exports = {
	opposite,
	cornerBetween,
	nextCorner,
	nextSide,
	oppositeCorners,
};
