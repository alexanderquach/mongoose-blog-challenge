'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String},
  author: {
    firstName: String,
    lastName: String
  },
  created: {type: Date, default: Date.now}
});

postSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

postSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.authorString,
    content: this.content,
    created: this.created
  };
};

const BlogPost = mongoose.model('BlogPost', postSchema);
module.exports = {BlogPost};