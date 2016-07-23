import React, { Component, PropTypes } from 'react';
import request from 'ajax-request';
import _ from 'underscore';
import InlineSVG from 'svg-inline-react';

import InputSubmit from './InputSubmit';
import tick from '../../img/tick.svg';
import question from '../../img/question.svg';
import spinner from '../../img/spinner.svg';

const className = 'teamSelector';

class TeamSelector extends Component {

	constructor(props) {

		super(props);

		this.idPrefix = 'team_';

		this.state = {
			selectedId: null,
			selectedTeamId: null,
			selectedTeamName: null,
			processing: null
		};

		this.saveTeam = this.saveTeam.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	getTeamName(selectedTeamId) {

		const teamId = this.getTeamId(selectedTeamId);
		const team = _.findWhere(this.props.teams, { id: parseInt(teamId, 10) });

		return team ? team.username : '';

	}

	getTeamId(selectedTeamId) {

		const teamId = selectedTeamId ? selectedTeamId.slice().replace(this.idPrefix, '') : null;

		return parseInt(teamId, 10);

	}

	updateParentState() {

		const teamSelected = this.state.selectedTeamId ? !!this.state.selectedTeamId.length : false;
		const notProcessing = !this.state.processing;

		this.props.updateTeamSelection(teamSelected && notProcessing, this.state.selectedId);

	}

	handleChange(event) {

		const { value } = event.target;
		const { idPrefix } = this;
		const selectedTeamId = value.substring(0, idPrefix.length) === idPrefix ? value : null;
		const selectedTeamName = this.getTeamName(selectedTeamId);

		this.setState({
			selectedId: this.getTeamId(selectedTeamId),
			selectedTeamId,
			selectedTeamName
		}, this.updateParentState);

	}

	saveTeam(teamName) {

		const save = (resolve, reject) => {

			this.setState({ processing: 'Saving' }, this.updateParentState);

			request({
				url: this.props.url,
				method: 'POST',
				json: true,
				data: {
					name: teamName,
					username: teamName
				}
			}, (err, res, data) => {

				if (err) {

					this.setState({ processing: null }, this.updateParentState);

					reject(this.props.url, res.statusCode, err.toString());

				} else {

					this.props.teams.push(data);

					this.setState({
						selectedId: data.id,
						selectedTeamId: this.idPrefix + data.id.toString(),
						selectedTeamName: data.username,
						processing: null
					}, () => {

						this.updateParentState();

						resolve();

					});

				}

			});

		};

		return new Promise(save);

	}

	render() {

		const selectOptions = this.props.teams.map((team) => {

			const teamId = this.idPrefix + team.id;

			return (

				<option value={teamId} key={teamId}>{team.username}</option>

			);

		});

		const { selectedTeamId, processing: stateProcessing } = this.state;
		const { processing } = this.props;
		const selectedClass = selectedTeamId ? ` ${className}--selected` : '';
		const processingClass = (processing || stateProcessing) ? ` ${className}--processing` : '';
		const componentClass = `${className}${selectedClass}${processingClass}`;

		return (

			<div className={componentClass}>

				<select
					onChange={this.handleChange}
					value={this.state.selectedTeamId}
					disabled={this.state.processing}
				>

					<option value="-1">Choose a team</option>

					{selectOptions}

				</select>

				<p>OR</p>

				<InputSubmit
					placeholder="Create a new team"
					buttonText="Create"
					onSubmit={this.saveTeam}
					disabled={this.state.processing}
				/>

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

}

TeamSelector.propTypes = {
	teams: PropTypes.array,
	teamLabel: PropTypes.string,
	processing: PropTypes.any,
	updateTeamSelection: PropTypes.func,
	url: PropTypes.string
};

export default TeamSelector;
