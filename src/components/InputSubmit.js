var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			value: null
		};

	},

	handleChange: function (event) {

		this.setState({ value: event.target.value });

	},

	onSubmit: function (event) {

		event.preventDefault();

		this.props.onSubmit(this.state.value);

	},

	render: function () {

		return (

			<form className="inputSubmit" onSubmit={this.onSubmit}>

				<button type="submit">{this.props.buttonText}</button>

				<div>

					<input placeholder={this.props.placeholder} type="text" value={this.state.value} onChange={this.handleChange} />

				</div>

			</form>

		);

	}

});