var React = require('react');
var request = require('ajax-request');
var _ = require('underscore');
var InlineSVG = require('svg-inline-react');

var InputSubmit = require('./InputSubmit');
var tick = require('../../img/tick.svg');
var question = require('../../img/question.svg');
var spinner = require('../../img/spinner.svg');

module.exports = React.createClass({

	idPrefix: 'team_',

	getInitialState: function () {

		return {
			selectedId: null,
			selectedTeamId: null,
			selectedTeamName: null,
			processing: null
		};

	},

	saveTeam: function(teamName) {

		var save = function (resolve, reject) {

			this.setState({ processing: 'Saving' }, this.updateParentState);

			request({
				url: this.props.url,
				method: 'POST',
				json: true,
				data: {
					name: teamName,
					username: teamName
				}
			}, function (err, res, data) {

				if (err) {

					this.setState({ processing: null }, this.updateParentState);

					reject(console.error(this.props.url, res.statusCode, err.toString()));

				} else {

					this.props.teams.push(data);

					this.setState({
						selectedId: data.id,
						selectedTeamId: this.idPrefix + data.id.toString(),
						selectedTeamName: data.username,
						processing: null
					}, function () {

						this.updateParentState();

						resolve();

					});

				}

			}.bind(this));

		}.bind(this);

		return new Promise(save);

	},

	handleChange: function(event) {

		var selectedTeamId = event.target.value.substring(0, this.idPrefix.length) === this.idPrefix ? event.target.value : null;
		var selectedTeamName = this.getTeamName(selectedTeamId);

		this.setState({
			selectedId: this.getTeamId(selectedTeamId),
			selectedTeamId: selectedTeamId,
			selectedTeamName: selectedTeamName
		}, this.updateParentState);

	},

	updateParentState: function () {

		var teamSelected = this.state.selectedTeamId ? !!this.state.selectedTeamId.length : false;
		var notProcessing = !this.state.processing;

		this.props.updateTeamSelection(teamSelected && notProcessing, this.state.selectedId);

	},

	getTeamName: function(selectedTeamId) {

		var teamId = this.getTeamId(selectedTeamId);
		var team = _.findWhere(this.props.teams, { id: parseInt(teamId) });

		return team ? team.username : '';

	},

	getTeamId: function(selectedTeamId) {

		selectedTeamId = selectedTeamId ? selectedTeamId.replace(this.idPrefix, '') : null;

		return parseInt(selectedTeamId);

	},

	render: function () {

		var selectOptions = this.props.teams.map(function (team) {

			var teamId = this.idPrefix + team.id;

			return (

				<option value={teamId} key={teamId}>{team.username}</option>

			);

		}.bind(this));

		return (

			<div className={'teamSelector' + (this.state.selectedTeamId ? ' teamSelector--selected' : '') + (this.props.processing || this.state.processing ? ' teamSelector--processing' : '')}>

				<select onChange={this.handleChange} value={this.state.selectedTeamId} disabled={this.state.processing}>

					<option value="-1">Choose a team</option>

					{selectOptions}

				</select>

				<p>OR</p>

				<InputSubmit placeholder="Create a new team" buttonText="Create" onSubmit={this.saveTeam} disabled={this.state.processing} />

				<label>{this.props.teamLabel}</label>

				<p className="teamSelector__selectedTeam">{this.state.selectedTeamName}</p>

				<InlineSVG className="icon" src={this.state.selectedTeamId ? tick : question} />

				<div className="teamSelector__overlay">

					<InlineSVG className="icon icon__spinner teamSelector__spinner" src={spinner} />

					<p>{this.props.processing || this.state.processing}</p>

				</div>

			</div>

		);

	}

});