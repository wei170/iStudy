'use strict';
var db = require('../db');
var user = require('./User');
var _ = require('underscore');
module.exports = function(sequelize, DataTypes){
    var profile =  sequelize.define('profile', {
    	
        major: {
            type: DataTypes.STRING,
            defaultValue: 'Unknown'
        },
        language: {
            type: DataTypes.STRING,
            defaultValue: '[]'
        },
        birthday: {
            type: DataTypes.DATEONLY
        },
        hobby: {
            type: DataTypes.STRING,
            defaultValue: '[]'
        },
        visibility: {
        type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        posts: {
            type: DataTypes.TEXT
        },
        friends: {
            type: DataTypes.TEXT
        },
        contributions: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'profile',
        underscored: true,
        timestamps: false,
        classMethods:{
            // associate: function(models){
            //     profile.belongsTo(models.user);
            // }
        },

        instanceMethods: {
            toPublicJSON: function() {
                var json = this.toJSON();
                return _.pick(json, 'major', 'language', 'birthday', 'hobby', 'visibility');
            }


        },

        setterMethods: {
            language: function(value){
                this.setDataValue('language', JSON.stringify(value));
            },
            posts: function(value){
                this.setDataValue('posts', JSON.stringify(value));
            },
            friends: function(value){
                this.setDataValue('friends', JSON.stringify(value));
            },
            contributions: function(value){
                this.setDataValue('contributions', JSON.stringify(value));
            },
			hobby: function (value) {
				this.setDataValue('hobby', JSON.stringify(value));
			}
        },
        getterMethods: {
            language: function () {
                var value = this.getDataValue('language');
                if (value){
                    return JSON.parse(value);
                }
            },
            posts: function () {
                var value = this.getDataValue('posts');
                if (value){
                    return JSON.parse(value);
                }
            },
            friends: function () {
                var value = this.getDataValue('friends');
                if (value){
                    return JSON.parse(value);
                }
            },
            contributions: function () {
                var value = this.getDataValue('contributions');
                if (value){
                    return JSON.parse(value);
                }
            },
			hobby: function () {
				var value = this.getDataValue('hobby');
				if (value){
					return JSON.parse(value);
				}
			}
        }
    });
    return profile;
};