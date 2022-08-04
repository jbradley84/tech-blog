const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Comment Model
class Comment extends Model {}

// define columns/fields for Comment Model
Comment.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      content: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [4]
         }
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id'
         }
      },
      post_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'post',
            key: 'id'
         }
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
   }
);

module.exports = Comment;