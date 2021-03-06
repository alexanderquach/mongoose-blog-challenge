'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const authorSchema = mongoose.Schema({
  firstName: 'string',
  lastName: 'string',
  userName: {
    type: 'string',
    unique: true
  }
});

const commentSchema = mongoose.Schema({comment: 'string'});

const postSchema = mongoose.Schema({
  title: {type: 'string', required: true},
  content: {type: 'string'},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
  comment: [commentSchema]
});

postSchema.pre('find', function(next) {
  this.populate('author');
  next();
});

postSchema.pre('findOne', function(next) {
  this.populate('author');
  next();
});

postSchema.pre('create', function(next) {
  this.populate('author');
  next();
});

postSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

postSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.author,
    content: this.content,
    comments: this.comments
  };
};

const Author = mongoose.model('Author', authorSchema);
const BlogPost = mongoose.model('BlogPost', postSchema);
module.exports = {Author, BlogPost};