import User from "./User";
import Role from "./Role";
import Project from "./Project";

export const defineAssociations = () => {
  Role.hasMany(User, { foreignKey: "roleId", as: "users" });

  User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
  User.hasMany(Project, { foreignKey: "ownedBy", as: "projects" });

  Project.belongsTo(User, { foreignKey: "ownedBy", as: "owner" });
};
