import Role from "../models/Role";

export const findRoles = async () => await Role.findAll();
