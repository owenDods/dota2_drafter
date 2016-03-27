var React = require('react');
var request = require('ajax-request');
var _ = require('underscore');
var InlineSVG = require('svg-inline-react');

var InputSubmit = require('./InputSubmit');

module.exports = React.createClass({

	idPrefix: 'team_',

	getInitialState: function () {

		return {
			teams: [],
			selectedTeamId: null,
			selectedTeamName: null
		};

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

		var selectedTeamId = event.target.value;
		var selectedTeamName = this.getTeamName(selectedTeamId);

		this.setState({
			selectedTeamId: selectedTeamId,
			selectedTeamName: selectedTeamName
		});

	},

	getTeamName: function(selectedTeamId) {

		var teamId = selectedTeamId ? selectedTeamId.replace(this.idPrefix, '') : null;
		var team = _.findWhere(this.state.teams, { id: parseInt(teamId) });

		return team ? team.username : '';

	},

	render: function () {

		var selectOptions = this.state.teams.map(function (team) {

			var teamId = this.idPrefix + team.id;

			return (

				<option value={teamId} key={teamId}>{team.username}</option>

			);

		}.bind(this));

		return (

			<div className="teamSelector">

				<select onChange={this.handleChange}>

					<option value="-1">Choose a team</option>

					{selectOptions}

				</select>

				<p>OR</p>

				<InputSubmit placeholder="Create a new team" buttonText="Create" />

				<label>{this.props.teamLabel}</label>

				<p className="teamSelector__selectedTeam">{this.state.selectedTeamName}</p>

				<InlineSVG className="icon" src={require('../../img/tick.svg')} />

			</div>

		);

	}

});