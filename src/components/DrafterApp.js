var React = require('react');

var HeroesGrid = require('./HeroesGrid');
var DraftConsole = require('./DraftConsole');

module.exports = React.createClass({

	getInitialState: function () {

		return { heroes: this.props.data || [] };

	},

	render: function () {

		var heroes = this.state.heroes;

		return (

			<div>

				<HeroesGrid data={heroes} />
				<DraftConsole data={heroes} />

			</div>

		);

	}

});