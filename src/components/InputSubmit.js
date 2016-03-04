var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return {};

	},

	render: function () {

		return (

			<div className="inputSubmit">

				<button>{this.props.buttonText}</button>

				<div>

					<input placeholder={this.props.placeholder} type="text" />

				</div>

			</div>

		);

	}

});