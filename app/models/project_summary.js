'use strict';
module.exports = (sequelize, DataTypes) => {
  const project_summary = sequelize.define('project_summary', {
    cust_name: DataTypes.STRING,
    project_name: DataTypes.STRING,
    region: DataTypes.STRING,
    Country: DataTypes.STRING,
    project_manager: DataTypes.STRING,
    imp_engineer_email: DataTypes.STRING,
    project_status: DataTypes.STRING,
    mdr_type_id: DataTypes.INTEGER,
    planned_start_date:DataTypes.DATE,
    order: DataTypes.INTEGER
    
  }, {});
  project_summary.associate = function(models) {
    // associations can be defined here
  };
  return project_summary;
};