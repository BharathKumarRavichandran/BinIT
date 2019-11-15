'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('logs', {
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
                    model: 'bins',
                    key: 'bin_id',
                },
            },
            center_id: {
                field: 'center_id',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'centers',
                    key: 'center_id',
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
                    model: 'handlers',
                    key: 'handler_id',
                },
            },
            created_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
            },
            updated_at: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('logs');
    }
};