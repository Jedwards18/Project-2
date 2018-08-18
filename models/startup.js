module.exports = function(sequelize, DataTypes) {
  var Startup = sequelize.define("startup", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    main_category: DataTypes.STRING,
    currency: DataTypes.STRING,
    deadline: DataTypes.DATEONLY,
    goal: DataTypes.DECIMAL (13,2),
    launched: DataTypes.DATE,
    pledged: DataTypes.DECIMAL(13,2),
    state: DataTypes.STRING,
    backers: DataTypes.INTEGER,
    country: DataTypes.STRING,
    usd_pledged: DataTypes.DECIMAL(13,2),
    usd_pledged_real: DataTypes.DECIMAL(13,2),
    usd_goal_real: DataTypes.DECIMAL(13,2)
  });
  return Example;
};
