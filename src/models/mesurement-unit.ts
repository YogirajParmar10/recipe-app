import Sequelize from "sequelize";
import sequelize from "../util/database";

const MesurementUnit = sequelize.define("mesurementUnit", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  unit: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default MesurementUnit;
