const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  /*static associate(models) {
    this.belongsTo(models.Notes, { foreignKey: 'user_id', as: 'user' });
  }*/

}

module.exports = User;