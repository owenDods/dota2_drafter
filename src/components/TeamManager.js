var React = require('react');
var request = require('ajax-request');

var TeamSelector = require('./TeamSelector');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			team1Ready: false,
			team2Ready: false,
			teams: [],
			processing: 'Fetching Teams'
		};

	},

	componentDidMount: function() {

		this.loadTeams();

	},

	loadTeams: function() {

		request({
			url: this.props.url,
			json: true
		}, function (err, res, data) {

			if (err) {

				console.error(this.props.url, res.statusCode, err.toString());

			} else {

				this.setState({
					teams: data,
					processing: null
				});

			}

		}.bind(this));

	},

	updateTeam1State: function (ready) {

		this.setState({ team1Ready: ready });

	},

	updateTeam2State: function (ready) {

		this.setState({ team2Ready: ready });

	},

	render: function () {

		return (

			<div className="teamManager">

				<label>Who will be drafting?</label>

				<TeamSelector url={this.props.url} teamLabel="Team 1" updateState={this.updateTeam1State} processing={this.state.processing} teams={this.state.teams} />

				<TeamSelector url={this.props.url} teamLabel="Team 2" updateState={this.updateTeam2State} processing={this.state.processing} teams={this.state.teams} />

				<button disabled={!(this.state.team1Ready && this.state.team2Ready)} onClick={this.props.startDraft}>Draft</button>

			</div>

		);

	}

});