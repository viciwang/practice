"use strict";
module.exports = (sequelize, DataTypes) => {
  var Administrator = sequelize.define(
    "Administrator",
    {
      adminId: DataTypes.STRING,
      nickName: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Administrator;
};
