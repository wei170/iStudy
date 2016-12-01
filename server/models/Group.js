'use strict';
var _ = require('underscore');
var db = require('../db');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('group', {
		groupName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		}
	},{
        tableName: 'group',
        underscored: true,
        timestamps: true
    });

};
