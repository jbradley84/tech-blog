const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post Model
class Post extends Model {}

// define columns/fields for Post Model
Post.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [4]
         }
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
      }
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
   }
);

module.exports = Post;