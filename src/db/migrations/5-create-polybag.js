'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('polybags', {
            polybag_id: {
                field: 'polybag_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            barcode: {
                field: 'barcode',
                type: Sequelize.STRING(100),
                allowNull: false
            },
            barcode_image_path: {
                field: 'barcode_image_path',
                type: Sequelize.STRING(100),
                allowNull: false
            },
            type: {
                field: 'type',
                type: Sequelize.STRING(100),
                allowNull: false
            },
            from: {
                field: 'from',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'centers',
                    key: 'center_id',
                },
            },
            to: {
                field: 'to',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'centers',
                    key: 'center_id',
                },
            },
            handler: {
                field: 'handler_id',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'handlers',
                    key: 'handler_id',
                },
            },
            weight: {
                field: 'weight',
                type: Sequelize.FLOAT,
                allowNull: false,
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
        return queryInterface.dropTable('polybags');
    }
};