'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('course_professor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.DOUBLE,
            defaultValue: 0

        }
    }, {
        tableName: 'course_professor',
        underscored: true,
        timestamps: true
    });
};
