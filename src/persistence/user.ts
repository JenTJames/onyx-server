import User from "../models/User";
import UserType from "../types/User.interface";

export const findUserByEmail = (email: string) =>
  User.findOne({ where: { email } });

export const saveUser = (user: UserType) => {
  return User.create(user);
};
