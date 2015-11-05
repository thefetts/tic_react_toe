let Matcher = require('./matcher.jsx');

let Menu = require('./menu.jsx');
let Tile = require('./tile.jsx');

module.exports = React.createClass({
	getInitialState: function() {
    return {
			tiles: [
				'', '', '',
				'', '', '',
				'', '', ''
			],
			turn: 'o',
			result: 'n',
			ai: true,
			difficulty: 'hard',
			boardDisabled: false
		};
	},

	slices: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[2, 4, 6]
	],

	checkBoard: function() {
		let t = this.state.tiles;
		let check = (...tiles) => {
			let t = tiles.join('');
		  return (t === 'xxx' || t === 'ooo');
		}
		for(let index in this.slices) {
			let s = this.slices[index];
			if(check(t[s[0]], t[s[1]], t[s[2]])) return t[s[0]];
		}

		if(t.join('').length === 9) return 'd';
		return 'n';
	},

	aiPlay: function() {
		this.setState({boardDisabled: true});
		setTimeout(() => {
			if(this.state.difficulty === 'hard') {
				this.perfectPlay();
			} else if(this.state.difficulty === 'medium') {
				this.reactivePlay();
			} else {
				this.randomPlay();
			}
			this.setState({boardDisabled: false});
		}, 1000);
	},

	advantageousPlay: function() {
		let t = this.state.tiles;
		let x = t.join('').length;
		let p = this.state.turn;
		let o = Matcher.otherPlayer(this.state.turn);
		if(x === 1) {
			if(t[4]) {
				return 0;
			} else {
				return 4;
			}
		} else if(x === 3) {
			if(t[4] == p) {
				let checks = [
					Matcher.sidePairMatch,
					Matcher.oppositeSideAndCornerMatch,
					Matcher.oppositeSidesMatch,
					Matcher.oppositeCornersMatch,
				];
				for(let i in checks) {
					let y = checks[i](o, t);
					if(y !== undefined) return y;
				}
			} else {
				let y = Matcher.middleAndCornerMatch(o, t)
				if(y !== undefined) return y;
			}
		}
	},
	
	perfectPlay: function() {
		let x = this.opportunisticPlay();
		if(x !== undefined) {
			this.play(x);
			return;
		}

		x = this.advantageousPlay();
		if(x !== undefined) {
			this.play(x);
			return;
		}

		this.randomPlay();
	},

	reactivePlay: function() {
		let x = this.opportunisticPlay();
		if(x !== undefined) {
			this.play(x);
			return;
		}
		this.randomPlay();
	},

	opportunisticPlay: function() {
		let t = this.state.tiles;
		let pendingVictory = (a, b, c, x) => {
			if(Matcher.allEqual(t[a], t[b], x)) {
				if(!t[c]) return c;
			} else if(Matcher.allEqual(t[a], t[c], x)) {
				if(!t[b]) return b;
			} else if(Matcher.allEqual(t[b], t[c], x)) {
				if(!t[a]) return a;
			}
		}

		let checkOpportunities = (player) => {
			for(let index in this.slices) {
				let s = this.slices[index];
				let x = pendingVictory(s[0], s[1], s[2], player);
				if(x !== undefined) return x;
			}
		}

		let x = checkOpportunities(this.state.turn);
		if(x !== undefined) return x;

		return checkOpportunities(Matcher.otherPlayer(this.state.turn));
	},

	randomPlay: function() {
		let tiles = this.state.tiles;
		let positions = '012345678'.split('').filter((el, index) => {
			return !tiles[index];
		});
		if(!positions.length) return;

		let position = positions[Math.floor(Math.random() * positions.length)];
		this.play(position);
	},

	play: function(position, cb=()=>{}) {
		let tiles = this.state.tiles;
		tiles[position] = this.state.turn;
		let turn = Matcher.otherPlayer(this.state.turn);
		this.setState({tiles, turn, result: this.checkBoard()}, cb);
	},

	tileClick: function(position) {
		if(this.state.boardDisabled) return;

		let tiles = this.state.tiles;
		if(tiles[position] || this.state.result !== 'n') return;

		let cb = () => {
			if(this.state.ai && this.state.result === 'n') {
				this.aiPlay();
			}
		};
		this.play(position, cb);
	},

	twoPlayer: function() {
		this.setState({ai: false});
	},

	onePlayer: function() {
		this.setState({ai: true});
	},

	resetGame: function() {
		let state = this.getInitialState();
		delete state.ai;
		delete state.difficulty;
		this.setState(state);
	},

	render: function() {
		return <div>
			<div id='game'>
				{ this.state.tiles.map(function(tile, position) {
					return (
						<Tile 
							status={tile} 
							key={position} 
							reactKey={position} 
							turn={this.state.turn} 
							tileClick={this.tileClick} />
					);
				}, this)}
			</div>
			<Menu 
				turn={this.state.turn}
				result={this.state.result}
				pvp={this.twoPlayer}
				pve={this.onePlayer}
				ai={this.state.ai}
				aiPlaying={this.state.boardDisabled}
				resetAction={this.resetGame} />
		</div>;
	}
});
