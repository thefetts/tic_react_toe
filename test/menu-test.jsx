'use strict';

let React = require('react');
let Menu = require('./../jsx/menu.jsx');
let TestUtils = require('react-addons-test-utils');

describe('Menu', () => {
	describe('title text', () => {
		it('has a default', () => {
			let menu = TestUtils.renderIntoDocument(<Menu />);
			let dom = TestUtils.findRenderedDOMComponentWithTag(menu, 'h3');
			expect(dom.textContent).toEqual('Loading...');
		});

		it('lets you know when the AI is playing', () => {
			let aiPlaying = true;
			let turn = 'o';
			let menu = TestUtils.renderIntoDocument(<Menu aiPlaying={aiPlaying} turn={turn} />)
			let dom = TestUtils.findRenderedDOMComponentWithTag(menu, 'h3');
			expect(dom.textContent).toEqual('Player O playing...');
		});

		it('lets you know when it is your turn', () => {
			let result = 'n';
			let turn = 'x';
			let menu = TestUtils.renderIntoDocument(<Menu result={result} turn={turn} />)
			let dom = TestUtils.findRenderedDOMComponentWithTag(menu, 'h3');
			expect(dom.textContent).toEqual("Player X's turn.");
		});

		it('lets you know when the game is a draw', () => {
			let result = 'd';
			let menu = TestUtils.renderIntoDocument(<Menu result={result} />)
			let dom = TestUtils.findRenderedDOMComponentWithTag(menu, 'h3');
			expect(dom.textContent).toEqual('Draw!');
		});

		it('lets you know when a player has won', () => {
			let result = 'o';
			let menu = TestUtils.renderIntoDocument(<Menu result={result} />)
			let dom = TestUtils.findRenderedDOMComponentWithTag(menu, 'h3');
			expect(dom.textContent).toEqual('Player O won!');
		});
	});

	describe('ai toggle button', () => {
		it('shows the PVP button when ai is off', () => {
			let ai = false;
			let menu = TestUtils.renderIntoDocument(<Menu ai={ai} />)
			let dom = TestUtils.findRenderedDOMComponentWithTag(menu, 'button');
			console.log(dom);
			expect(dom.textContent).toEqual('Player O won!');
		});
	});
});
