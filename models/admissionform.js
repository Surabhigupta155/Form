'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdmissionForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdmissionForm.init({
    // attributes in admissionform table
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    batch: DataTypes.INTEGER,
    fees: DataTypes.BOOLEAN,
    joining: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'admissionform',
    modelName: 'AdmissionForm',
  });
  return AdmissionForm;
};