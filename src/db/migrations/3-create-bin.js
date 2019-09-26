'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('bins', {
            bin_id: {
                field: 'bin_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            department: {
                field: 'department',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            handler_id: {
                field: 'handler_id',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'handlers',
                    key: 'handler_id',
                },
            },
            type: {
                field: 'type',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            weight: { // default unit 'KG'
                field: 'weight',
                type: Sequelize.FLOAT,
                allowNull: false
            },
            capacity: { // default unit 'KG'
                field: 'capacity',
                type: Sequelize.FLOAT,
                allowNull: false
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
        return queryInterface.dropTable('bins');
    }
};