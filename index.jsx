let React = require('react');
let ReactDOM = require('react-dom');
require('!style!css!sass!./style.scss');

(() => {
	let Game = React.createClass({
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
				difficulty: 'medium',
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
			var check = (...tiles) => {
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
		
		perfectPlay: function() {

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
			let player = this.state.turn;
			let t = this.state.tiles;
			let pendingVictory = (a, b, c, x) => {
				if(t[a] == t[b] && t[a] == x) {
					if(!t[c]) return c;
				} else if(t[a] == t[c] && t[a] == x) {
					if(!t[b]) return b;
				} else if(t[b] == t[c] && t[b] == x) {
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

			let x = checkOpportunities(player);
			if(x !== undefined) return x;

			let otherPlayer = player === 'x' ? 'o' : 'x';
			return checkOpportunities(otherPlayer);
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
			let turn = this.state.turn === 'o' ? 'x' : 'o';
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
			this.setState(this.getInitialState());
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

	let Tile = React.createClass({
		clickHandler: function() {
			this.props.tileClick(this.props.reactKey, this.props.turn);
		},

		render: function() {
			let classes = this.props.status ? `tile status-$(this.props.status)` : 'tile';
			return (
				<div
					className={classes} 
					onClick={this.clickHandler}>
					{this.props.status}
				</div>
			);
		}
	});

	let Menu = React.createClass({
		render: function() {
			let h3;
			if(this.props.aiPlaying) {
				h3 = <h3>Player {this.props.turn.toUpperCase()} playing...</h3>
			} else if(this.props.result === 'n') {
				h3 = <h3>Player {this.props.turn.toUpperCase()}'s turn.</h3>;
			} else if(this.props.result === 'd') {
				h3 = <h3>Draw!</h3>;
			} else {
				h3 = <h3>Player {this.props.result.toUpperCase()} won!</h3>;
			}

			let ai = `Opponent: ${this.props.ai ? 'Computer' : 'Player 2'}`;
			let aiBtn;
			if(this.props.ai) {
				aiBtn = <button onClick={this.props.pvp}>PvP</button>;
			} else {
				aiBtn = <button onClick={this.props.pve}>PvE</button>;
			}

			return (
				<div id='menu'>
					{h3}
					<button onClick={this.props.resetAction}>Reset Game</button><br/>
					{ai}<br/>
					{aiBtn}
				</div>
			);
	  }
	});

	ReactDOM.render(
		<Game />,
		document.getElementById('container')
	);
})();
