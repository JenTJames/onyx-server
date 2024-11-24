import User from "./User";
import Role from "./Role";

export const defineAssociations = () => {
  Role.hasMany(User, { foreignKey: "roleId", as: "users" });

  User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
};
