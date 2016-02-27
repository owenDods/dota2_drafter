var React = require('react');

module.exports = React.createClass({

	render: function () {

		var selectedHeroes = (<div></div>);

		return (

			<div>

				<ul className="draftConsole__placeholder">

					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Pick</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Pick</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Ban</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 1</label>
						<label>Pick</label>
					</li>
					<li>
						<label className="draftConsole__teamLabel">Team 2</label>
						<label>Pick</label>
					</li>

				</ul>

				<ul className="draftConsole__selectedHeroes">

					{selectedHeroes}

				</ul>

			</div>

		);

		// <ul class="draft-console-selected-heroes">

		// 	<% _.each(selectedHeroes, function(selectedHero) { %>

		// 		<li class="draft-console-<%=selectedHero.status%>">

		// 			<div class="hero-image-holder">

		// 				<img src="http://cdn.dota2.com/apps/dota2/images/heroes/<%=selectedHero.formattedName%>_hphover.png?v=3162717" />

		// 			</div>

		// 			<label><%=selectedHero.status%></label>

		// 		</li>

		// 	<%});%>

		// </ul>

	}

});