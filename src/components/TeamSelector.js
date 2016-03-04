var React = require('react');

var request = require('ajax-request');

module.exports = React.createClass({

	getInitialState: function () {

		return { data: [] };

	},

	loadTeams: function() {

		request({
			url: this.props.url,
			json: true
		}, function (err, res, data) {

			if (err) {

				console.error(this.props.url, res.statusCode, err.toString());

			} else {

				this.setState({ data: data });

			}

		}.bind(this));

	},

	componentDidMount: function() {

		this.loadTeams();

	},

	render: function () {

		var selectOptions = this.state.data.map(function (team) {

			var teamId = 'team_' + team.id;

			return (

				<option value={teamId} key={teamId}>{team.username}</option>

			);

		});

		return (

			<div className="teamSelector">

				<label>{this.props.teamLabel}</label>

				<select>

					<option value="-1">Choose a team</option>

					{selectOptions}

				</select>

				<p>OR</p>

				<input type="text" placeholder="Create a new team" />

			</div>

		);

	}

});