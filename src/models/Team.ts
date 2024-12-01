import { DataTypes } from "sequelize";
import database from "../lib/database";
import Team from "../types/models/Team.model.interface";

const Team = database.define<Team>("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Team;
