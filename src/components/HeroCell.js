var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return this.props.hero || {};

	},

	selectHero: function () {

		this.setState({ selected: this.state.selected ? !this.state.selected : true });

		console.log(this);

	},

	render: function () {

		var hero = this.state;

		hero.formattedName = hero.name.replace('npc_dota_hero_', '');

		return (

			<li className="heroesGrid__hero" key={hero.id} onClick={this.selectHero}>

				<div className="heroesGrid__avatar">

					<img src={'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.formattedName + '_hphover.png?v=3162717'} />

				</div>

				<label>{hero.localized_name}</label>

			</li>

		);

	}

});