import User from "../models/User";
import UserType from "../types/User.interface";

/**
 * Finds a user by their email in the database.
 *
 * @param email - The email of the user to find.
 * @param excludePassword - If true, the password field will be excluded from the returned user object.
 *                          Defaults to true.
 *
 * @returns A Promise that resolves to a User object if a user with the given email is found,
 *          or null if no user is found. If `excludePassword` is true, the password field will be excluded.
 *
 * @example
 * ```typescript
 * const user = await findUserByEmail("john.doe@example.com");
 * console.log(user?.email); // "john.doe@example.com"
 * console.log(user?.password); // undefined
 * ```
 */
export const findUserByEmail = (
  email: string,
  excludePassword: boolean = true
) =>
  User.findOne({
    where: { email },
    attributes: {
      exclude: excludePassword ? ["password"] : [],
    },
  });

export const saveUser = (user: UserType) => {
  return User.create(user);
};
