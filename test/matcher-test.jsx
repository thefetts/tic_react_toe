'use strict';

let Matcher = require('./../jsx/matcher.jsx');

describe('matcher', () => {
	describe('allEqual', () => {
		it('returns true if all three values are the same', () => {
			expect(Matcher.allEqual(1, 1, 1)).toBe(true);
			expect(Matcher.allEqual('o', 'o', 'o')).toBe(true);
			expect(Matcher.allEqual('x', 'x', 'x')).toBe(true);
		});

		it('returns false if at least one value does not match', () => {
			expect(Matcher.allEqual(1, 1, 5)).toBe(false);
			expect(Matcher.allEqual(1, undefined, 1)).toBe(false);
			expect(Matcher.allEqual(1, 1, '1')).toBe(false);
			expect(Matcher.allEqual('x', 'x', 'o')).toBe(false);
			expect(Matcher.allEqual('o', 'x', 'o')).toBe(false);
		});
	});

	describe('middleAndCornerMatch', () => {
		it('returns a free corner if the enemy holds the center and a corner', () => {
			let tiles = ['x','','','','o','','','','o'];
			expect(Matcher.middleAndCornerMatch('o', tiles)).toEqual(2);

			tiles = ['','','x','','o','','o','',''];
			expect(Matcher.middleAndCornerMatch('o', tiles)).toEqual(8);

			tiles = ['o','','','','o','','','','x'];
			expect(Matcher.middleAndCornerMatch('o', tiles)).toEqual(6);

			tiles = ['','','x','','x','','o','',''];
			expect(Matcher.middleAndCornerMatch('x', tiles)).toEqual(0);
		});

		it('returns undefined if the tileset does not match', () => {
			let tiles = ['', '', '', '', '', '', '', '', ''];
			expect(Matcher.middleAndCornerMatch('o', tiles)).toEqual(undefined);

			tiles = ['', '', 'x', 'x', '', 'o', '', '', ''];
			expect(Matcher.middleAndCornerMatch('o', tiles)).toEqual(undefined);

			tiles = ['', 'o', '', '', 'o', '', 'x', '', ''];
			expect(Matcher.middleAndCornerMatch('x', tiles)).toEqual(undefined);
		});
	});

	describe('oppositeCornersMatch', () => {
		it('returns a free side spot if opposite corners match', () => {
			let tiles = ['x','','','','o','','','','x'];
			expect(Matcher.oppositeCornersMatch('x', tiles)).toEqual(1);

			tiles = ['','','o','','x','','o','',''];
			expect(Matcher.oppositeCornersMatch('o', tiles)).toEqual(5);
		});

		it('returns undefined if the tileset does not match', () => {
			let tiles = ['', '', '', '', '', '', '', '', ''];
			expect(Matcher.oppositeCornersMatch('o', tiles)).toEqual(undefined);

			tiles = ['', '', 'x', 'x', '', 'o', '', '', ''];
			expect(Matcher.oppositeCornersMatch('o', tiles)).toEqual(undefined);

			tiles = ['', 'o', '', '', 'o', '', 'x', '', ''];
			expect(Matcher.oppositeCornersMatch('x', tiles)).toEqual(undefined);
		});
	});

	describe('oppositeSideAndCornerMatch', () => {
		it('returns the corner between a matching side and opposite corner', () => {
			let tiles = ['','x','','','o','','','','x'];
			expect(Matcher.oppositeSideAndCornerMatch('x', tiles)).toEqual(2);

			tiles = ['','','o','o','x','','','',''];
			expect(Matcher.oppositeSideAndCornerMatch('o', tiles)).toEqual(0);
		});

		it('returns undefined if the tileset does not match', () => {
			let tiles = ['', '', '', '', '', '', '', '', ''];
			expect(Matcher.oppositeSideAndCornerMatch('o', tiles)).toEqual(undefined);

			tiles = ['', '', 'x', 'x', '', 'o', '', '', ''];
			expect(Matcher.oppositeSideAndCornerMatch('o', tiles)).toEqual(undefined);

			tiles = ['', 'o', '', '', 'o', '', 'x', '', ''];
			expect(Matcher.oppositeSideAndCornerMatch('x', tiles)).toEqual(undefined);
		});
	});

	describe('oppositeSidesMatch', () => {
		it('returns a corner if opposite sides match', () => {
			let tiles = ['','x','','','o','','','x',''];
			expect(Matcher.oppositeSidesMatch('x', tiles)).toEqual(2);

			tiles = ['','','','o','x','o','','',''];
			expect(Matcher.oppositeSidesMatch('o', tiles)).toEqual(8);
		});

		it('returns undefined if the tileset does not match', () => {
			let tiles = ['', '', '', '', '', '', '', '', ''];
			expect(Matcher.oppositeSidesMatch('o', tiles)).toEqual(undefined);

			tiles = ['', '', 'x', 'x', '', 'o', '', '', ''];
			expect(Matcher.oppositeSidesMatch('o', tiles)).toEqual(undefined);

			tiles = ['', 'o', '', '', 'o', '', 'x', '', ''];
			expect(Matcher.oppositeSidesMatch('x', tiles)).toEqual(undefined);
		});
	});

	describe('otherPlayer', () => {
		it('returns x if o is passed', () => {
			expect(Matcher.otherPlayer('o')).toEqual('x');
		});

		it('returns o if x is passed', () => {
			expect(Matcher.otherPlayer('x')).toEqual('o');
		});
	});

	describe('sidePairMatch', () => {
		it('returns the corner between a pair of matching sides', () => {
			let tiles = ['','x','','','o','x','','',''];
			expect(Matcher.sidePairMatch('x', tiles)).toEqual(2);

			tiles = ['','','','o','x','','','o',''];
			expect(Matcher.sidePairMatch('o', tiles)).toEqual(6);
		});

		it('returns undefined if the tileset does not match', () => {
			let tiles = ['', '', '', '', '', '', '', '', ''];
			expect(Matcher.sidePairMatch('o', tiles)).toEqual(undefined);

			tiles = ['', '', 'x', 'x', '', 'o', '', '', ''];
			expect(Matcher.sidePairMatch('o', tiles)).toEqual(undefined);

			tiles = ['', 'o', '', '', 'o', '', 'x', '', ''];
			expect(Matcher.sidePairMatch('x', tiles)).toEqual(undefined);
		});
	});
});
