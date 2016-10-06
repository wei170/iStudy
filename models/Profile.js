'use strict';
var db = require('../db');
var user = require('./User');

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
        classes:{
            type: DataTypes.TEXT
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
            // associate: function(){
            //     profile.belongsTo(user);
            // }
        },
        setterMethods: {
            classes: function(value) {
                this.setDataValue('classes', JSON.stringify(value));
            },
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
            }
        },
        getterMethods: {
            classes: function () {
                var value = this.getDataValue('classes');
                if (value){
                    return JSON.parse(value);
                }
            },
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
            }
        }
    });
    return profile;
};