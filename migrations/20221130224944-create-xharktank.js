'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Xharktanks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING
      },
      entrepreneur: {
        type: Sequelize.STRING
      },
      pitchIdea: {
        type: Sequelize.STRING
      },
      askAmount: {
        type: Sequelize.FLOAT
      },
      equity: {
        type: Sequelize.FLOAT
      },
      offers: {
        type: Sequelize.ARRAY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Xharktanks');
  }
};