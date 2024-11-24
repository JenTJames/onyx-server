import { DataTypes } from "sequelize";
import database from "../lib/database";
import Role from "../types/models/Role.model.interface";

const Role = database.define<Role>(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default Role;
