'use strict';
var db = require('../db');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('language', {
		name : {
			type: DataTypes.STRING,
			unique: true
		}
	}, {
		tableName: 'language',
		underscored: true,
		timestamps: false
	});
};