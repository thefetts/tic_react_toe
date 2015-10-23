module.exports = React.createClass({
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
