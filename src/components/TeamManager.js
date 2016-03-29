var React = require('react');

var TeamSelector = require('./TeamSelector');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			team1Ready: false,
			team2Ready: false
		};

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

				<TeamSelector url="http://jsonplaceholder.typicode.com/users" teamLabel="Team 1" updateState={this.updateTeam1State} />

				<TeamSelector url="http://jsonplaceholder.typicode.com/users" teamLabel="Team 2" updateState={this.updateTeam2State} />

				<button disabled={!(this.state.team1Ready && this.state.team2Ready)}>Draft</button>

			</div>

		);

	}

});