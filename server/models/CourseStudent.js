'use strict';
var db = require('../db');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes){
	return sequelize.define('course_student', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		tableName: 'course_student',
		underscored: true,
		timestamps: false
	});
};