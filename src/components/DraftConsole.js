var React = require('react');

var HeroAvatar = require('./HeroAvatar');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			selectedHeroes: this.props.data || []
		};

	},

	renderSelectedHeroes: function () {

		return this.state.selectedHeroes.map(function (hero, i) {

			var status = ((i === 0) || (i === 1) || (i === 4) || (i === 5)) ? 'ban' : 'pick';

			return (

				<li className={"draftConsole--" + status} key={hero.id}>

					<HeroAvatar name={hero.name} />

					<label>{status}</label>

				</li>

			);

		});

	},

	render: function () {

		var selectedHeroes = this.renderSelectedHeroes();

		return (

			<div className={'draftConsole' + (this.props.selectionComplete ? ' draftConsole--selectionComplete' : '')}>

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