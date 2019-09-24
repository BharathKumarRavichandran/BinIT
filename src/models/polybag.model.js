const Center = require('./center.model');
const Handler = require('./handler.model');

module.exports = (sequelize, DataTypes) => {
	const polybag = sequelize.define('polybag', {
        polybag_id: {
			field: 'polybag_id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        barcode: {
            field: 'barcode',
            type: DataTypes.STRING(32),
            allowNull: false
        },
        from: {
            field: 'from',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: Center,
                key: 'center_id',
            },
        },
        to: {
            field: 'to',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: Center,
                key: 'center_id',
            },
        },
        weight: { // Store weight in blockchain
            field: 'weight',
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
        status: {
            field: 'status',
            type: DataTypes.ENUM,
			allowNull: false,            
			values: ['Delivered', 'Not delivered'],
			defaultValue: 'Not delivered',
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
        }
    }, {});
    /*
        polybag.associate = function(models) {
            polybag.belongsTo(models.center, {
                foreignKey: 'center_id',
                as: 'from'
            });
    
            polybag.belongsTo(models.center, {
                foreignKey: 'center_id',
                as: 'to'
            });

            polybag.belongsTo(models.handler, {
                foreignKey: 'handler_id',
                as: 'handler'
            });
        };
    */
	return polybag;
};