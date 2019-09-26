const Center = require('./center.model');

module.exports = (sequelize, DataTypes) => {
	const handler = sequelize.define('handler', {
        handler_id: {
			field: 'handler_id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        name: {
            field: 'name',
			type: DataTypes.STRING(32),
			allowNull: false
        },
        department: {
            field: 'department',
			type: DataTypes.STRING(32),
			allowNull: false
        },
        phone_number: {
            field: 'phone_number',
			type: DataTypes.STRING(32),
            allowNull: false
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
        designation: {
            field: 'designation',
			type: DataTypes.STRING(32),
			allowNull: false
        },
		center_id: {
			field: 'center_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: Center,
                key: 'center_id',
            },
        },
        finger_hash: {
            field: 'finger_hash',
            type: DataTypes.STRING(32),
            allowNull: false
        }
	}, {
        timestamps: true,
    	underscored: true
    });
	// handler.associate = function (models) {
	//   // associations can be defined here
	// };
	return handler;
};