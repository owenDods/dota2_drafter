var React = require('react');

var HeroesGrid = require('./HeroesGrid');
var DraftConsole = require('./DraftConsole');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			heroes: this.props.data || [],
			selectedHeroes: [],
			selectionComplete: false
		};

	},

	onHeroSelect: function (hero) {

		var selectedHeroes = this.state.selectedHeroes;

		if (selectedHeroes.length < 8) {

			selectedHeroes.push(hero);

			this.setState({ selectedHeroes: selectedHeroes });

			this.setState({ selectionComplete: (selectedHeroes.length === 8) });

			return true;

		} else {

			return false;

		}

	},

	onReset: function () {

		console.log(this);

		this.setState({
			selectedHeroes: [],
			selectionComplete: false
		});

	},

	render: function () {

		return (

			<div>

				<HeroesGrid data={this.state.heroes} onSelect={this.onHeroSelect} selectionComplete={this.state.selectionComplete} />
				<DraftConsole data={this.state.selectedHeroes} selectionComplete={this.state.selectionComplete} onReset={this.onReset} />

			</div>

		);

	}

});