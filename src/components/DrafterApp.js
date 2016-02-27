var React = require('react');

var HeroesGrid = require('./HeroesGrid');
var DraftConsole = require('./DraftConsole');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			heroes: this.props.data || [],
			selectedHeroes: []
		};

	},

	onHeroSelect: function (hero) {

		var selectedHeroes = this.state.selectedHeroes;
		selectedHeroes.push(hero);

		this.setState({ selectedHeroes: selectedHeroes });

	},

	render: function () {

		return (

			<div>

				<HeroesGrid data={this.state.heroes} onSelect={this.onHeroSelect} />
				<DraftConsole data={this.state.selectedHeroes} />

			</div>

		);

	}

});