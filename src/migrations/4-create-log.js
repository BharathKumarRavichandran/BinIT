'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('log', {
            log_id: {
                field: 'log_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            bin_id: {
                field: 'bin_id',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'bin',
                    key: 'bin_id',
                },
            },
            weight: {
                field: 'weight',
                type: Sequelize.FLOAT,
                allowNull: false
            },
            accessed_by: {
                field: 'accessed_by',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'handler',
                    key: 'handler_id',
                },
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('log');
    }
};