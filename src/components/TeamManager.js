var React = require('react');

var TeamSelector = require('./TeamSelector');

module.exports = React.createClass({

	getInitialState: function () {

		return {};

	},

	render: function () {

		return (

			<div className="teamManager">

				<label>Who will be drafting?</label>

				<TeamSelector url="http://jsonplaceholder.typicode.com/users" teamLabel="Team 1" />

				<TeamSelector url="http://jsonplaceholder.typicode.com/users" teamLabel="Team 2" />

			</div>

		);

	}

});