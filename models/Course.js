'use strict';

module.exports = function(sequelize, DataTypes){
	return sequelize.define('course', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		// professor_id: {
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	model: 'professor',
		// 	key: 'id'
		// },
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			defaultValue: 'There\'s no description about this course yet :('
		}
		//TODO: add ratings, classmates, resources
	}, {
		tableName: 'course',
		underscored: true,
		timestamps: true
	});
};