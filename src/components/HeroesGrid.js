var React = require('react');
var _ = require('underscore');

var HeroCell = require('./HeroCell');

module.exports = React.createClass({

	render: function () {

		var onSelect = this.props.onSelect;
		var heroes = _.sortBy(this.props.data, 'localized_name');

		var heroCells = heroes.map(function(hero) {

			return (

				<HeroCell hero={hero} key={hero.id} onSelect={onSelect} />

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