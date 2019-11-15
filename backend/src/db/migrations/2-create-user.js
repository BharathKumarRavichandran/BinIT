'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            user_id: {
                field: 'user_id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING(100),
                allowNull: false,
                validate: {
                    isEmpty(val, next) {
                        if (val.length >= 1) return next();
                        return next('Name cannot be empty.');
                    },
                },
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
            password: {
                field: 'password',
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            phone_number: {
                field: 'phone_number',
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
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
        return queryInterface.dropTable('users');
    }
};