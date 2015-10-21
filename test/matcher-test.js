'use strict';

let Matcher = require('./../matcher.jsx');

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

	describe('otherPlayer', () => {
		it('returns x if o is passed', () => {
			expect(Matcher.otherPlayer('o')).toEqual('x');
		});

		it('returns o if x is passed', () => {
			expect(Matcher.otherPlayer('x')).toEqual('o');
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
});
