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

	render: function () {

		return (

			<div className="inputSubmit">

				<button onClick={this.props.onSubmit.bind(null, this.state.value)}>{this.props.buttonText}</button>

				<div>

					<input placeholder={this.props.placeholder} type="text" value={this.state.value} onChange={this.handleChange} />

				</div>

			</div>

		);

	}

});