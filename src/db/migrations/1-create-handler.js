'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('handlers', {
            handler_id: {
                field: 'handler_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING(100),
                allowNull: false
            },
            department: {
                field: 'department',
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
            designation: {
                field: 'designation',
                type: Sequelize.STRING(100),
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
            finger_hash: {
                field: 'finger_hash',
                type: Sequelize.STRING(100),
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
        return queryInterface.dropTable('handlers');
    }
};