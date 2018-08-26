module.exports = function(sequelize, DataTypes) {  

    var Search = sequelize.define("searches", {
      project_name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      min_goal: { type: DataTypes.INTEGER, allowNull: false },
      max_goal: { type: DataTypes.INTEGER, allowNull: false }
    });
  
    console.log(Search);
    return Search;
  };
  