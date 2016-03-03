var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return { heroName: this.formatName() };

	},

	formatName: function () {

		return this.props.name.replace('npc_dota_hero_', '');

	},

	render: function () {

		return (

			<div className="heroAvatar" style={{backgroundImage: 'url(http://cdn.dota2.com/apps/dota2/images/heroes/' + this.state.heroName + '_full.png)'}}></div>

		);

	}

});