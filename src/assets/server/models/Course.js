'use strict';

module.exports = function(sequelize, DataTypes){
	return sequelize.define('course', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		description: {
			type: DataTypes.STRING,
			defaultValue: 'There\'s no description about this course yet :('
		}
	}, {
		tableName: 'course',
		underscored: true,
		timestamps: true
	});
};