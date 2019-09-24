module.exports = (sequelize, DataTypes) => {
	const center = sequelize.define('center', {
		center_id: {
			field: 'center_id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        name: {
            field: 'name',
			type: DataTypes.STRING(32),
			allowNull: false
        },
        address: {
            field: 'address',
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
        lat: {
            field: 'lat',
			type: DataTypes.FLOAT,
			allowNull: false
        },
        lon: {
            field: 'lon',
			type: DataTypes.FLOAT,
			allowNull: false
        },
		type: {
            field: 'type',
            type: DataTypes.ENUM,
			allowNull: false,            
			values: ['Hospital', 'WMC'],
			defaultValue: 'Hospital',
		},
	}, {});
	// center.associate = function (models) {
	//   // associations can be defined here
	// };
	return center;
};