import { DataTypes } from "sequelize";
import database from "../lib/database";
import Status from "../types/models/Status.model.interface";

const Status = database.define<Status>("statuses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["CREATED", "ASSIGNED", "IN_PROGRESS", "COMPLETED"]],
    },
  },
});

export default Status;
