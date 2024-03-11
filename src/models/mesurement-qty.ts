import Sequelize from "sequelize";
import sequelize from "../util/database";

const MesurementQty = sequelize.define("mesurementQty", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default MesurementQty;
