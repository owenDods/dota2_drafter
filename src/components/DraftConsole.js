var React = require('react');
var _ = require('underscore');

var HeroAvatar = require('./HeroAvatar');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			selectedHeroes: this.props.data || [],
			displayResult: false
		};

	},

	componentDidUpdate: function () {

		if (this.props.selectionComplete && !this.state.displayResult) {

			_.defer(function () { this.setState({ displayResult: this.props.selectionComplete }) }.bind(this));

		}

	},

	getStatus: function (i) {

		return ((i === 0) || (i === 1) || (i === 4) || (i === 5)) ? 'ban' : 'pick';

	},

	pickSort: function (hero, i) {

		return i % 2;

	},

	removeBans: function (hero, i) {

		var status = this.getStatus(i);

		return status === 'pick';

	},

	processFinalSelection: function (selectedHeroes) {

		selectedHeroes = _.filter(selectedHeroes, this.removeBans);

		selectedHeroes = _.sortBy(selectedHeroes, this.pickSort);

		return selectedHeroes;

	},

	renderSelectedHeroes: function (finalSelection) {

		var selectedHeroes = this.state.selectedHeroes;

		selectedHeroes = finalSelection ? this.processFinalSelection(selectedHeroes) : selectedHeroes;

		return selectedHeroes.map(function (hero, i) {

			var status = this.getStatus(i);

			return (

				<li className={ finalSelection ? '' : 'draftConsole--' + status} key={hero.id}>

					<HeroAvatar name={hero.name} vertical={finalSelection} />

					<label>{finalSelection ? hero.localized_name : status}</label>

				</li>

			);

		}.bind(this));

	},

	render: function () {

		var selectedHeroes = this.renderSelectedHeroes();
		var finalSelection = this.state.displayResult ? this.renderSelectedHeroes(true) : undefined;

		return (

			<div className={'draftConsole' + (this.state.displayResult ? ' draftConsole--selectionComplete' : '')}>

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

				<ul className="draftConsole__finalSelection">

					<p>VS</p>

					{finalSelection}

				</ul>

			</div>

		);

	}

});