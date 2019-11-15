'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('centers', {
            center_id: {
                field: 'center_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING(100),
                allowNull: false
            },
            address: {
                field: 'address',
                type: Sequelize.STRING(100),
                allowNull: false
            },
            phone_number: {
                field: 'phone_number',
                type: Sequelize.STRING(100),
                allowNull: false
            },
            email: {
                field: 'email',
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                },
            },
            lat: {
                field: 'lat',
                type: Sequelize.FLOAT,
                allowNull: false
            },
            lon: {
                field: 'lon',
                type: Sequelize.FLOAT,
                allowNull: false
            },
            type: {
                field: 'type',
                type: Sequelize.ENUM,
                allowNull: false,
                values: ['Hospital', 'WMC'],
                defaultValue: 'Hospital',
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
        return queryInterface.dropTable('centers');
    }
};