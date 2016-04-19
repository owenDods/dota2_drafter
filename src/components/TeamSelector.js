var React = require('react');
var request = require('ajax-request');
var _ = require('underscore');
var InlineSVG = require('svg-inline-react');

var InputSubmit = require('./InputSubmit');
var tick = require('../../img/tick.svg');
var question = require('../../img/question.svg');

module.exports = React.createClass({

	idPrefix: 'team_',

	getInitialState: function () {

		return {
			teams: [],
			selectedId: null,
			selectedTeamId: null,
			selectedTeamName: null,
			saving: false
		};

	},

	saveTeam: function(teamName) {

		var save = function (resolve, reject) {

			this.setState({ saving: true });

			request({
				url: this.props.url,
				method: 'POST',
				json: true,
				data: {
					name: teamName,
					username: teamName
				}
			}, function (err, res, data) {

				if (err) {

					this.setState({ saving: false });

					reject(console.error(this.props.url, res.statusCode, err.toString()));

				} else {

					var teams = this.state.teams;

					teams.push(data);

					this.setState({
						teams: teams,
						selectedId: data.id,
						selectedTeamId: this.idPrefix + data.id.toString(),
						selectedTeamName: data.username,
						saving: false
					}, function () {

						this.updateParentState();

						resolve();

					});

				}

			}.bind(this));

		}.bind(this);

		return new Promise(save);

	},

	loadTeams: function() {

		request({
			url: this.props.url,
			json: true
		}, function (err, res, data) {

			if (err) {

				console.error(this.props.url, res.statusCode, err.toString());

			} else {

				this.setState({ teams: data });

			}

		}.bind(this));

	},

	componentDidMount: function() {

		this.loadTeams();

	},

	handleChange: function(event) {

		var selectedTeamId = event.target.value.substring(0, this.idPrefix.length) === this.idPrefix ? event.target.value : null;
		var selectedTeamName = this.getTeamName(selectedTeamId);

		this.setState({
			selectedId: this.getTeamId(selectedTeamId),
			selectedTeamId: selectedTeamId,
			selectedTeamName: selectedTeamName
		}, this.updateParentState);

	},

	updateParentState: function () {

		this.props.updateState(this.state.selectedTeamId ? !!this.state.selectedTeamId.length : false);

	},

	getTeamName: function(selectedTeamId) {

		var teamId = this.getTeamId(selectedTeamId);
		var team = _.findWhere(this.state.teams, { id: parseInt(teamId) });

		return team ? team.username : '';

	},

	getTeamId: function(selectedTeamId) {

		selectedTeamId = selectedTeamId ? selectedTeamId.replace(this.idPrefix, '') : null;

		return parseInt(selectedTeamId);

	},

	render: function () {

		var selectOptions = this.state.teams.map(function (team) {

			var teamId = this.idPrefix + team.id;

			return (

				<option value={teamId} key={teamId}>{team.username}</option>

			);

		}.bind(this));

		return (

			<div className={'teamSelector' + (this.state.selectedTeamId ? ' teamSelector--selected' : '')}>

				<select onChange={this.handleChange} value={this.state.selectedTeamId} disabled={this.state.saving}>

					<option value="-1">Choose a team</option>

					{selectOptions}

				</select>

				<p>OR</p>

				<InputSubmit placeholder="Create a new team" buttonText="Create" onSubmit={this.saveTeam} disabled={this.state.saving} />

				<label>{this.props.teamLabel}</label>

				<p className="teamSelector__selectedTeam">{this.state.selectedTeamName}</p>

				<InlineSVG className="icon" src={this.state.selectedTeamId ? tick : question} />

			</div>

		);

	}

});