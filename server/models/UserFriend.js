'use strict';
var db = require('../db');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('user_friends', {
		id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
		}
	}, {
		tableName: 'user_friends',
		underscored: true,
		timestamps: false
	});
};