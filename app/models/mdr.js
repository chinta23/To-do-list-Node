'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mdr = sequelize.define('Mdr', {
    title: DataTypes.STRING,
    short_desc: DataTypes.STRING,
    long_desc: DataTypes.TEXT,
    type_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    mdr_type_id: DataTypes.INTEGER,
    view: DataTypes.INTEGER
  }, {});
  Mdr.associate = function(models) {
    // associations can be defined here
  };
  return Mdr;
};