import Sequelize from "sequelize";
import sequelize from "../util/database";

const Ingredient = sequelize.define("ingredients", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Ingredient;
