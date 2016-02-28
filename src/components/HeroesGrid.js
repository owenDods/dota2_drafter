var React = require('react');

var HeroCell = require('./HeroCell');

module.exports = React.createClass({

	getInitialState: function () {

		return { heroes: this.props.data || [] };

	},

	render: function () {

		var onSelect = this.props.onSelect;

		var heroCells = this.state.heroes.map(function(hero) {

			return (

				<HeroCell hero={hero} key={hero.id} onSelect={onSelect}/>

			);

		});

		return (

			<div className={'heroesGrid' + (this.props.selectionComplete ? ' heroesGrid--selectionComplete' : '')}>

				<ul>

					{heroCells}

				</ul>

			</div>

		);

	}

});