const {sequelize,DataTypes}=require("../config/db.js")

const reviews=sequelize.define(
  "review",
  {
    Company_name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    pros:{
      type:DataTypes.STRING,
      allowNull:false
    },
    cons:{
      type:DataTypes.STRING,
      allowNull:false
    },
    rating:{
      type:DataTypes.INTEGER,
      allowNull:false
    }

  }
);

module.exports=reviews;