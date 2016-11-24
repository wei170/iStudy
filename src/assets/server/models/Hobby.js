'use strict';
var db = require('../db');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('hobby', {
		name : {
			type: DataTypes.STRING,
			unique: true
		}
	}, {
		tableName: 'hobby',
		underscored: true,
		timestamps: false
	});
};