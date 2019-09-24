'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
            user_id: {
                field: 'user_id',
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
            password: {
                field: 'password',
                type: Sequelize.STRING(32),
                allowNull: false,
            },
            name: {
                field: 'name',
                type: Sequelize.STRING(32),
                allowNull: false,
                validate: {
                    isEmpty(val, next) {
                        if (val.length >= 1) return next();
                        return next('Name cannot be empty.');
                    },
                },
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
        return queryInterface.dropTable('user');
    }
};