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
            type: DataTypes.STRING(100),
            allowNull: false
        },
        barcode_image_path: {
            field: 'barcode_image_path',
            type: DataTypes.STRING(100),
            allowNull: false
        },
        type: {
            field: 'type',
            type: DataTypes.STRING(100),
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
        handler_id: {
            field: 'handler_id',
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
    }, {
        timestamps: true,
    	underscored: true
    });
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