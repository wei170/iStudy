'use strict';
var db = require('../db');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('group_users', {
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
		}
	}, {
		tableName: 'group_users',
		underscored: true,
		timestamps: false
	});
};
