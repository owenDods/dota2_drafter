var React = require('react');
var request = require('ajax-request');

var InputSubmit = require('./InputSubmit');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			teams: [],
			selectedTeam: null
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

	render: function () {

		var selectOptions = this.state.teams.map(function (team) {

			var teamId = 'team_' + team.id;

			return (

				<option value={teamId} key={teamId}>{team.username}</option>

			);

		});

		return (

			<div className="teamSelector">

				<select>

					<option value="-1">Choose a team</option>

					{selectOptions}

				</select>

				<p>OR</p>

				<InputSubmit placeholder="Create a new team" buttonText="Create" />

				<label>{this.props.teamLabel}</label>

				<p>{this.state.selectedTeam}</p>

			</div>

		);

	}

});