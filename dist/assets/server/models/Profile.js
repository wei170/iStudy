'use strict';
var db = require('../db');
var _ = require('underscore');
module.exports = function(sequelize, DataTypes){
    var profile =  sequelize.define('profile', {
    	
        major: {
            type: DataTypes.STRING,
            defaultValue: 'Unknown'
        },
        birthday: {
            type: DataTypes.DATEONLY
        },
        nationality: {
            type: DataTypes.STRING,
            defaultValue: "Unknown"
        },
        gender: {
            type: DataTypes.STRING,
            defaultValue: "Unknown"
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
        // posts: {
        //     type: DataTypes.TEXT
        // },
        // contributions: {
        //     type: DataTypes.TEXT
        // }
    }, {
        tableName: 'profile',
        underscored: true,
        timestamps: false,
        instanceMethods: {
            toPublicJSON: function() {
                var json = this.toJSON();
                return _.pick(json, 'major', 'birthday', 'visibility');
            }


        }
    });
    return profile;
};
