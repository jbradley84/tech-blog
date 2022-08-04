const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create associations between Models

// Post has only one User
Post.belongsTo(User, {
   foreignKey: 'user_id'
});

// Post has many Comment
Post.hasMany(Comment, {
   foreignKey: 'post_id'
});

// Comment has only one User
Comment.belongsTo(User, {
   foreignKey: 'user_id'
});


module.exports = { User, Post, Comment };

