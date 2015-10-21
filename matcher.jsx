let Finder = require('./finder.jsx');

module.exports = {
	bothEqual: (a, b, x) => a === b && a === x,

	middleAndCornerMatch: function(player, t) {
		let o = this.otherPlayer(player);
		let positions = [0, 2, 8, 6];
		for(let i in positions) {
			let a = positions[i];
			let b = Finder.opposite(a);

			if(this.bothEqual(t[a], t[4], player) && t[b] == o) {
				return Finder.nextCorner(b);
			}
		}
	},

	oppositeCornersMatch: function(player, t) {
		let positions = [0, 8, 2, 6];
		for(let i = 0; i < positions.length; i += 2) {
			let a = positions[i];
			let b = positions[i+1];
			if(this.bothEqual(t[a], t[b], player)) {
				return Finder.nextSide(a);
			}
		}
	},

	oppositeSideAndCornerMatch: function(player, t) {
		let sides = [1, 5, 7, 3];
		for(let i in sides) {
			let side = sides[i];
			let corners = Finder.oppositeCorners(side);
			for(let j in corners) {
				let corner = corners[j];
				if(this.bothEqual(t[side], t[corner], player)) {
					return Finder.cornerBetween(side, corner);
				}
			}
		}
	},

	oppositeSidesMatch: function(player, t) {
		let positions = [1, 7, 5, 3];
		for(let i = 0; i < positions.length; i += 2) {
			let a = positions[i];
			let b = positions[i+1];

			if(this.bothEqual(t[a], t[b], player)) {
				return Finder.nextCorner(a);
			}
		}
	},

	sidePairMatch: function(player, t) {
		let positions = [1, 5, 7, 3];
		for(let i in positions) {
			let a = positions[i];
			let b = Finder.nextSide(a);

			if(this.bothEqual(t[a], t[b], player)) {
				return Finder.nextCorner(a);
			}
		}
	},
};
