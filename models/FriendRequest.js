'user strict';

module.exports = function (sequelize, DataTypes) {
		return sequelize.define('friend_request', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			status: {
				type: DataTypes.INTEGER,
				defaultValue: -1 // unchecked request
			}
		}, {
			tableName: 'friend_request',
			underscored: true,
			timestamps: true
		});
};