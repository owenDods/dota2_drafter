'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

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
				<CommentForm />
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
	render: function() {
		return (
			<div className="commentForm">
				Hello, world! I am a CommentForm.
			</div>
		);
	}
});

ReactDOM.render(
	<CommentBox url="http://jsonplaceholder.typicode.com/comments" pollInterval={60000} />,
	document.getElementById('content')
);
