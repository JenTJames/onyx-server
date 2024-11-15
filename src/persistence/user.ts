import User from "../models/User";

export const findUserByEmail = (email: string) =>
  User.findOne({ where: { email } });
