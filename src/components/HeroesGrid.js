var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return { heroes: [] };

	},

	componentDidMount: function() {

		this.setState({ heroes: this.props.data });

	},

	selectHero: function (heroId) {

		console.log(this.state.heroes);

	},

	render: function () {

		var heroHolders = this.state.heroes.map(function(hero) {

			hero.formattedName = hero.name.replace('npc_dota_hero_', '');

			return (
				<li className="heroesGrid__hero" key={hero.id} onClick={this.selectHero.bind(this, hero.id)}>

					<div className="heroesGrid__avatar">

						<img src={'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.formattedName + '_hphover.png?v=3162717'} />

					</div>

					<label>{hero.localized_name}</label>

				</li>
			);
		}.bind(this));

		return (

			<ul>

				{heroHolders}

			</ul>

		);

	}

});