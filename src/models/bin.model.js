const Center = require('./center.model');
const Handler = require('./handler.model');

module.exports = (sequelize, DataTypes) => {
	const bin = sequelize.define('bin', {
		bin_id: {
			field: 'bin_id',
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
		department: {
			field: 'department',
			type: DataTypes.STRING(32),
			allowNull: false
		},
		handler: {
            field: 'handler',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: Handler,
                key: 'handler_id',
            },
		},
		type: {
			field: 'type',
			type: DataTypes.STRING(32),
			allowNull: false
		},
		weight: { // default unit 'KG'
			field: 'weight',
			type: DataTypes.FLOAT,
			allowNull: false
		},
		capacity: { // default unit 'KG'
			field: 'capacity',
			type: DataTypes.FLOAT,
			allowNull: false
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
	// bin.associate = function (models) {
	//   // associations can be defined here
	// };
	return bin;
};