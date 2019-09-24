'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('center', {
            center_id: {
                field: 'center_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            address: {
                field: 'address',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            phone_number: {
                field: 'phone_number',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            email: {
                field: 'email',
                type: Sequelize.STRING(32),
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('center');
    }
};