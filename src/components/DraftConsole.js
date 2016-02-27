var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			selectedHeroes: this.props.data || []
		};

	},

	renderSelectedHeroes: function () {

		return this.state.selectedHeroes.map(function (hero, i) {

			hero.formattedName = hero.name.replace('npc_dota_hero_', '');

			var status = ((i === 0) || (i === 1) || (i === 4) || (i === 5)) ? 'ban' : 'pick';

			return (

				<li className={"draftConsole--" + status} key={hero.id}>

					<div className="heroesGrid__avatar">

						<img src={'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.formattedName + '_hphover.png?v=3162717'} />

					</div>

					<label>{status}</label>

				</li>

			);

		});

	},

	render: function () {

		var selectedHeroes = this.renderSelectedHeroes();

		return (

			<div className="draftConsole">

				<ul className="draftConsole__placeholder">

					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Pick</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Pick</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Pick</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Pick</label>
					</li>

				</ul>

				<ul className="draftConsole__selectedHeroes">

					{selectedHeroes}

				</ul>

			</div>

		);

	}

});