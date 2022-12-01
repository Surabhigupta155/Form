'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pitches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pitches.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    entrepreneur: DataTypes.STRING,
    pitchTitle: DataTypes.STRING,
    pitchIdea: DataTypes.STRING,
    askAmount: DataTypes.FLOAT,
    equity: DataTypes.FLOAT,
    offers: DataTypes.ARRAY(DataTypes.JSON)
  }, {
    sequelize,
    tableName: 'pitches',
    modelName: 'Pitches',
  });
  return Pitches;
};