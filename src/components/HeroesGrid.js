var React = require('react');

var HeroCell = require('./HeroCell');

module.exports = React.createClass({

	getInitialState: function () {

		return { heroes: this.props.data || [] };

	},

	render: function () {

		var heroCells = this.state.heroes.map(function(hero) {

			return (

				<HeroCell hero={hero} key={hero.id} />

			);

		});

		return (

			<div className="heroesGrid">

				<ul>

					{heroCells}

				</ul>

			</div>

		);

	}

});