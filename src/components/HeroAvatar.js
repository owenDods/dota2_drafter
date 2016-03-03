var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			heroName: this.formatName(),
			vertical: this.props.vertical
		};

	},

	formatName: function () {

		return this.props.name.replace('npc_dota_hero_', '');

	},

	render: function () {

		var orientation = this.state.vertical ? '_vert.jpg' : '_full.png';
		var imageUrl = 'url(http://cdn.dota2.com/apps/dota2/images/heroes/' + this.state.heroName + orientation + ')';

		return (

			<div className="heroAvatar" style={{ backgroundImage: imageUrl }}></div>

		);

	}

});