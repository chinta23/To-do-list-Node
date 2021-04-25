'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define('Faq', {
    question: DataTypes.STRING,
    answer: DataTypes.TEXT,
    mdr_type_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {});
  Faq.associate = function(models) {
    // associations can be defined here
  };
  return Faq;
};