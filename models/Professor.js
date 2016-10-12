'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('professor', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'professor',
		underscored: true,
		timestamps: true
	});
};