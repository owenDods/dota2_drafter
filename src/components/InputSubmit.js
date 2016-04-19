var React = require('react');

module.exports = React.createClass({

	getInitialState: function () {

		return {
			value: null,
			valid: false
		};

	},

	handleChange: function (event) {

		this.setState({ value: event.target.value }, this.validate);

	},

	validate: function () {

		var valid = this.state.value ? !!this.state.value.length : false;

		this.setState({ valid: valid });

	},

	reset: function () {

		this.setState({
			value: null,
			valid: false
		});

	},

	onSubmit: function (event) {

		event.preventDefault();

		if (this.state.valid) {

			this.props.onSubmit(this.state.value).then(this.reset);

		}

	},

	render: function () {

		return (

			<form className="inputSubmit" onSubmit={this.onSubmit}>

				<button type="submit" disabled={!this.state.valid}>{this.props.buttonText}</button>

				<div>

					<input placeholder={this.props.placeholder} type="text" value={this.state.value} onChange={this.handleChange} />

				</div>

			</form>

		);

	}

});