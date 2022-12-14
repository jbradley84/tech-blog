const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User Model
class User extends Model {
   // custom method to verify password
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
   }
}

// define columns/fields for User Model
User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            len: [4]
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [4]
         }
      }
   },
   {
      hooks: {
         async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
         },

         async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
         }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
   }
);

module.exports = User;