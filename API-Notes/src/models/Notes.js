const { Model, DataTypes } = require('sequelize');

class Notes extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Notes, { foreignKey: 'user_id', as: 'user' });
  }

}

module.exports = Notes;