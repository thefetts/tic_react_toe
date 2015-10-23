module.exports = React.createClass({
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
