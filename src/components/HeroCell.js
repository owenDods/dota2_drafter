var React = require('react');

var HeroAvatar = require('./HeroAvatar');

module.exports = React.createClass({

	getInitialState: function () {

		return { selected: false };

	},

	onClick: function () {

		if (!this.state.selected) {

			var selectSucceeded = this.props.onSelect(this.props.hero);

			if (selectSucceeded) {

				this.selectHero();

			}

		}

	},

	componentDidUpdate: function (prevProps) {

		if (prevProps.selectionComplete && !this.props.selectionComplete) {

			this.setState({ selected: false });

		}

	},

	selectHero: function () {

		this.setState({ selected: true });

	},

	render: function () {

		var hero = this.props.hero;

		return (

			<li className={"heroCell" + (this.state.selected ? ' selected' : '')} onClick={this.onClick}>

				<HeroAvatar name={hero.name} />

				<label>{hero.localized_name}</label>

			</li>

		);

	}

});