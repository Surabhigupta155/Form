'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CounterOffers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CounterOffers.init({
    //attributes in counterOffer table
    id: { // primary key
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    investor: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    equity: DataTypes.FLOAT,
    comment: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'counterOffers',
    modelName: 'CounterOffers',
  });
  return CounterOffers;
};