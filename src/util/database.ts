import { Sequelize } from "sequelize";

const sequelize = new Sequelize("recipes", "root", "1010", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
