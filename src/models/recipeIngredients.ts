import Sequelize from "sequelize";
import sequelize from "../util/database";

const RecipeIngredients = sequelize.define("recipeIngredients", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default RecipeIngredients;
