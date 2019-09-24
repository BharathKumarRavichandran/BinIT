'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('handler', {
            handler_id: {
                field: 'handler_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING(32),
                allowNull: false
            },
            department: {
                field: 'department',
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
            designation: {
                field: 'designation',
                type: Sequelize.STRING(32),
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
            finger_hash: {
                field: 'finger_hash',
                type: Sequelize.STRING(32),
                allowNull: false
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('handler');
    }
};