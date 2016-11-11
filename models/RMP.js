'use strict';
var db = require('../db');
var _ = require('underscore');
module.exports = function(sequelize, DataTypes){
    var RMP =  sequelize.define('RMP', {

        comment: {
            type: DataTypes.STRING,
            defaultValue: 'Unknown'
        },
        userName: {
            type: DataTypes.STRING,
            defaultValue: 'Anonymity'
        }

    }, {
        tableName: 'RMP',
        underscored: true,
        timestamps: false

    });
    return RMP;
};
