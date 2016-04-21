var React = require('react');

var TeamManager = require('./TeamManager');
var HeroesGrid = require('./HeroesGrid');
var DraftConsole = require('./DraftConsole');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			heroes: this.props.data || [],
			draftingActive: false,
			selectedHeroes: [],
			selectionComplete: false,
			team1: null,
			team2: null
		};

	},

	onHeroSelect: function (hero) {

		var selectedHeroes = this.state.selectedHeroes;

		if (selectedHeroes.length < 8) {

			selectedHeroes.push(hero);

			this.setState({
				selectedHeroes: selectedHeroes,
				selectionComplete: (selectedHeroes.length === 8)
			});

			return true;

		} else {

			return false;

		}

	},

	onReset: function () {

		this.setState({
			selectedHeroes: [],
			selectionComplete: false
		});

	},

	startDraft: function () {

		this.setState({ draftingActive: true });

	},

	updateSelectedTeam: function (teamName, selectedTeam) {

		var selectedTeamHash = {};

		selectedTeamHash[teamName] = selectedTeam;

		this.setState(selectedTeamHash);

	},

	render: function () {

		return (

			<div className={'drafterApp' + (this.state.draftingActive ? ' drafterApp--draftingActive' : '')}>

				<h1>Dota 2 2v2 Drafter</h1>

				<TeamManager url="http://jsonplaceholder.typicode.com/users" startDraft={this.startDraft} updateSelectedTeam={this.updateSelectedTeam} />

				<HeroesGrid data={this.state.heroes} onSelect={this.onHeroSelect} selectionComplete={this.state.selectionComplete} />

				<DraftConsole data={this.state.selectedHeroes} selectionComplete={this.state.selectionComplete} onReset={this.onReset} team1={this.state.team1} team2={this.state.team2} />

			</div>

		);

	}

});