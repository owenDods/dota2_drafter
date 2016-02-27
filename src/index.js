'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var heroData = require('../data/heroes.json');

var CommentBox = React.createClass({

	loadCommentsFromServer: function() {

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {

				this.setState({data: data});

			}.bind(this),
			error: function(xhr, status, err) {

				console.error(this.props.url, status, err.toString());

			}.bind(this)
		});

	},

	handleCommentSubmit: function(comment) {

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data) {

				var waap = this.state.data;

				var woop = {
					email: data.author,
					body: data.text,
					id: data.id
				};

				waap.push(woop);

				this.setState({data: waap });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

	},

	getInitialState: function () {

		return { data: [] };

	},

	componentDidMount: function() {

		this.loadCommentsFromServer();

		setInterval(this.loadCommentsFromServer, this.props.pollInterval);

	},

	render: function () {

		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);

	}

});

var CommentList = React.createClass({
	render: function() {

		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.email} key={comment.id}>
					{comment.body}
				</Comment>
			);
		});

		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);

	}
});

var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	getInitialState: function() {

		return {author: '', text: ''};

	},
	handleAuthorChange: function(e) {

		this.setState({author: e.target.value});

	},
	handleTextChange: function(e) {

		this.setState({text: e.target.value});

	},
	handleSubmit: function(e) {

		e.preventDefault();

		var author = this.state.author.trim();
		var text = this.state.text.trim();

		if (!text || !author) {

			return;

		}

		this.props.onCommentSubmit({author: author, text: text});

		this.setState({author: '', text: ''});

	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder="Your name"
					value={this.state.author}
					onChange={this.handleAuthorChange} />
				<input
					type="text"
					placeholder="Say something..."
					value={this.state.text}
					onChange={this.handleTextChange} />
				<input type="submit" value="Post" />
			</form>
		);
	}
});

// ReactDOM.render(
// 	<CommentBox url="http://jsonplaceholder.typicode.com/comments" pollInterval={60000} />,
// 	document.getElementById('content')
// );

var HeroesGrid = React.createClass({

	render: function () {

		var heroHolders = this.props.data ? this.props.data.result.heroes.map(function(hero) {

			hero.formattedName = hero.name.replace('npc_dota_hero_', '');

			return (
				<li className="hero-holder" key={hero.id}>

					<div className="hero-image-holder">

						<img src={'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.formattedName + '_hphover.png?v=3162717'} />

					</div>

					<label>{hero.localized_name}</label>

				</li>
			);
		}) : null;

		return (

			<ul>

				{heroHolders}

			</ul>

		);

	}

});

ReactDOM.render(
	<HeroesGrid data={heroData} />,
	document.getElementById('heroesGrid')
);
