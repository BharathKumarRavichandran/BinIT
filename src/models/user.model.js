const Center = require('./center.model');

module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('user', {
		user_id: {
			field: 'user_id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			field: 'email',
			type: DataTypes.STRING(32),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			},
		},
		password: {
			field: 'password',
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		name: {
			field: 'name',
			type: DataTypes.STRING(32),
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
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: Center,
                key: 'center_id',
            },
		},
	}, {});
	// user.associate = function (models) {
	//   // associations can be defined here
	// };
	return user;
};