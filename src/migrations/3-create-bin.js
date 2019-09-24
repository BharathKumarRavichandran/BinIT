'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('bin', {
            bin_id: {
                field: 'bin_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
            department: {
                field: 'department',
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
            center: {
                field: 'center',
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'center',
                    key: 'center_id',
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('bin');
    }
};