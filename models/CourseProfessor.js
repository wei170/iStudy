'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('course_professor', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	},{
		tableName: 'course_professor',
		underscored: true,
		timestamps: true
	});
};
