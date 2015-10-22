'use strict';

describe('Menu', () => {
	it('displays a title based on the state of the game', () => {
		let menu = jasmineReact.render(<Menu aiPlaying={true}/>);
		console.log(menu);
	});
});
