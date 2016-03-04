var React = require('react');

var TeamSelector = require('./TeamSelector');

module.exports = React.createClass({

	getInitialState: function () {

		return {};

	},

	render: function () {

		return (

			<div className="teamManager">

				<TeamSelector url="http://jsonplaceholder.typicode.com/users" />

				<TeamSelector url="http://jsonplaceholder.typicode.com/users" />

			</div>

		);

	}

});