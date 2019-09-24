const Bin = require('./bin.model');
const Handler = require('./handler.model');

module.exports = (sequelize, DataTypes) => {
	const log = sequelize.define('log', {
        log_id: {
			field: 'log_id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        bin_id: {
            field: 'bin_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: Bin,
                key: 'bin_id',
            },
        },
        weight: {
            field: 'weight',
            type: DataTypes.FLOAT,
			allowNull: false
        },
        accessed_by: {
            field: 'accessed_by',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: Handler,
                key: 'handler_id',
            },
        }
	}, {});
	// log.associate = function (models) {
	//   // associations can be defined here
	// };
	return log;
};