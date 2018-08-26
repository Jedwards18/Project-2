module.exports = function(sequelize, DataTypes) {
  var Startup = sequelize.define("startups", {
    project_name: DataTypes.STRING,
    main_category: DataTypes.STRING,
    deadline: DataTypes.DATEONLY,
    goal: DataTypes.DECIMAL (13,2),
    launched: DataTypes.DATE,
    pledged: DataTypes.DECIMAL(13,2),
    state: DataTypes.STRING,
    backers: DataTypes.INTEGER,
    country: DataTypes.STRING,
  }, {
    timestamps: false
  });
  console.log(Startup);
  return Startup;
};