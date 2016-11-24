'use strict';
var db = require('../db');
var _ = require('underscore');
module.exports = function(sequelize, DataTypes){
    return sequelize.define('comment', {
        comment: {
            type: DataTypes.STRING,
            defaultValue: 'Unknown'
        },
        userName: {
            type: DataTypes.STRING,
            defaultValue: 'Anonymity'
        }

    }, {
        tableName: 'comment',
        underscored: true,
        timestamps: false

    });
};
