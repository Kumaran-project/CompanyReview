const {Sequelize,DataTypes}=require("sequelize");
const sequelize=new Sequelize(
  "company_reviews","root","root",{
    dialect:"mysql"
  }
);

sequelize.authenticate()
  .then(() => console.log("Connection successful"))
  .catch((error) => console.log("Unable to connect to the database:", error));

module.exports={sequelize,DataTypes};