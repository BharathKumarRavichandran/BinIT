'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('polybag', {
            polybag_id: {
                field: 'polybag_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            barcode: {
                field: 'barcode',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            from: {
                field: 'from',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'center',
                    key: 'center_id',
                },
            },
            to: {
                field: 'to',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'center',
                    key: 'center_id',
                },
            },
            weight: { // Store weight in blockchain
                field: 'weight',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            handler: {
                field: 'handler',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'handler',
                    key: 'handler_id',
                },
            },
            status: {
                field: 'status',
                type: Sequelize.ENUM,
                allowNull: false,
                values: ['Delivered', 'Not delivered'],
                defaultValue: 'Not delivered',
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
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('polybag');
    }
};