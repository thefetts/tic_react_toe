module.exports = {
	cornerBetween: function(x, y) {
		if(x === 1 && y === 8) return 2;
		if(x === 1 && y === 6) return 0;
		if(x === 5 && y === 6) return 8;
		if(x === 5 && y === 0) return 2;
		if(x === 7 && y === 0) return 6;
		if(x === 7 && y === 2) return 8;
		if(x === 3 && y === 2) return 0;
		if(x === 3 && y === 8) return 6;
	},

	nextCorner: function(x) {
		if(x === 0 || x === 1) return 2;
		if(x === 2 || x === 5) return 8;
		if(x === 8 || x === 7) return 6;
		if(x === 6 || x === 3) return 0;
	},

	nextSide: function(x) {
		if(x === 3 || x === 0) return 1;
		if(x === 1 || x === 2) return 5;
		if(x === 5 || x === 8) return 7;
		if(x === 7 || x === 6) return 3;
	},

	opposite: (x) => 8-x,

	oppositeCorners: function(x) {
		if(x === 1) return [8, 6];
		if(x === 5) return [6, 0];
		if(x === 7) return [0, 2];
		if(x === 3) return [2, 8];
	},
};
