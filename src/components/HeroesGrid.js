var React = require('react');

module.exports = React.createClass({

	render: function () {

		var heroHolders = this.props.data ? this.props.data.map(function(hero) {

			hero.formattedName = hero.name.replace('npc_dota_hero_', '');

			return (
				<li className="heroesGrid__hero" key={hero.id}>

					<div className="heroesGrid__avatar">

						<img src={'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.formattedName + '_hphover.png?v=3162717'} />

					</div>

					<label>{hero.localized_name}</label>

				</li>
			);
		}) : null;

		return (

			<ul>

				{heroHolders}

			</ul>

		);

	}

});