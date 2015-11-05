let ReactDOM = require('react-dom');
	
let Game = require('./jsx/game.jsx');
require('!style!css!sass!./style.scss');

(() => {
	ReactDOM.render(
		<Game />,
		document.getElementById('container')
	);
})();
