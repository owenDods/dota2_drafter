var React = require('react');

var HeroAvatar = require('./HeroAvatar');

module.exports = React.createClass({

	getInitialState: function () {

		return this.props.hero || {};

	},

	onClick: function () {

		if (!this.state.selected) {

			var selectSucceeded = this.props.onSelect(this.state);

			if (selectSucceeded) {

				this.selectHero();

			}

		}

	},

	selectHero: function () {

		this.setState({ selected: true });

	},

	render: function () {

		var hero = this.state;

		return (

			<li className={"heroCell" + (hero.selected ? ' selected' : '')} onClick={this.onClick}>

				<HeroAvatar name={hero.name} />

				<label>{hero.localized_name}</label>

			</li>

		);

	}

});