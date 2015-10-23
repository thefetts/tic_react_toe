'use strict';

let Finder = require('./../jsx/finder.jsx');

describe('finder', () => {
	describe('cornerBetween', () => {
		it('picks the correct corner between the two points', () => {
			expect(Finder.cornerBetween(1, 8)).toEqual(2);
			expect(Finder.cornerBetween(1, 6)).toEqual(0);

			expect(Finder.cornerBetween(5, 6)).toEqual(8);
			expect(Finder.cornerBetween(5, 0)).toEqual(2);

			expect(Finder.cornerBetween(7, 0)).toEqual(6);
			expect(Finder.cornerBetween(7, 2)).toEqual(8);

			expect(Finder.cornerBetween(3, 2)).toEqual(0);
			expect(Finder.cornerBetween(3, 8)).toEqual(6);
		});

		it('throws an error if you supply bad input', () => {
			expect(() => Finder.cornerBetween(1, 2)).toThrow(
				new Error('Invalid side and corner pair: 1, 2')
			);

			expect(() => Finder.cornerBetween(4, 2)).toThrow(
				new Error('Invalid argument: 4')
			);

			expect(() => Finder.cornerBetween(1)).toThrow(
				new Error('Invalid argument: undefined')
			);

			expect(() => Finder.cornerBetween('test', 5)).toThrow(
				new Error('Invalid argument: test')
			);
		});
	});

	describe('nextCorner', () => {
		it('picks the next clockwise corner', () => {
			expect(Finder.nextCorner(0)).toEqual(2);
			expect(Finder.nextCorner(1)).toEqual(2);

			expect(Finder.nextCorner(2)).toEqual(8);
			expect(Finder.nextCorner(5)).toEqual(8);

			expect(Finder.nextCorner(8)).toEqual(6);
			expect(Finder.nextCorner(7)).toEqual(6);

			expect(Finder.nextCorner(6)).toEqual(0);
			expect(Finder.nextCorner(3)).toEqual(0);
		});

		it('throws an error if you supply bad input', () => {
			expect(() => Finder.nextCorner()).toThrow(
				new Error('Invalid argument: undefined')
			);

			expect(() => Finder.nextCorner(4)).toThrow(
				new Error('Invalid argument: 4')
			);

			expect(() => Finder.nextCorner('test')).toThrow(
				new Error('Invalid argument: test')
			);
		});
	});

	describe('nextSide', () => {
		it('picks the next clockwise corner', () => {
			expect(Finder.nextSide(1)).toEqual(5);
			expect(Finder.nextSide(2)).toEqual(5);

			expect(Finder.nextSide(5)).toEqual(7);
			expect(Finder.nextSide(8)).toEqual(7);

			expect(Finder.nextSide(7)).toEqual(3);
			expect(Finder.nextSide(6)).toEqual(3);

			expect(Finder.nextSide(3)).toEqual(1);
			expect(Finder.nextSide(0)).toEqual(1);
		});

		it('throws an error if you supply bad input', () => {
			expect(() => Finder.nextSide()).toThrow(
				new Error('Invalid argument: undefined')
			);

			expect(() => Finder.nextSide(4)).toThrow(
				new Error('Invalid argument: 4')
			);

			expect(() => Finder.nextSide('test')).toThrow(
				new Error('Invalid argument: test')
			);
		});
	});

	describe('opposite', () => {
		it('returns the direct opposite value in the grid', () => {
			expect(Finder.opposite(0)).toEqual(8);
			expect(Finder.opposite(1)).toEqual(7);
			expect(Finder.opposite(2)).toEqual(6);
			expect(Finder.opposite(3)).toEqual(5);
			expect(Finder.opposite(4)).toEqual(4);
			expect(Finder.opposite(5)).toEqual(3);
			expect(Finder.opposite(6)).toEqual(2);
			expect(Finder.opposite(7)).toEqual(1);
			expect(Finder.opposite(8)).toEqual(0);
		});
	});

	describe('oppositeCorners', () => {
		it('returns the two opposite corners for a side', () => {
			expect(Finder.oppositeCorners(1)).toEqual([8, 6]);
			expect(Finder.oppositeCorners(5)).toEqual([6, 0]);
			expect(Finder.oppositeCorners(7)).toEqual([0, 2]);
			expect(Finder.oppositeCorners(3)).toEqual([2, 8]);
		});

		it('throws an error with invalid arguments', () => {
			expect(() => Finder.oppositeCorners()).toThrow(
				new Error('Invalid argument: undefined')
			);
			expect(() => Finder.oppositeCorners(4)).toThrow(
				new Error('Invalid argument: 4')
			);
			expect(() => Finder.oppositeCorners('test')).toThrow(
				new Error('Invalid argument: test')
			);
		});
	})
});
