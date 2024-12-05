import Role from "../models/Role";
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

/**
 * Finds a user by their phone number in the database.
 *
 * @param phone - The phone number of the user to find.
 * @param excludePassword - If true, the password field will be excluded from the returned user object.
 *                          Defaults to true.
 *
 * @returns A Promise that resolves to a User object if a user with the given phone number is found,
 *          or null if no user is found. If `excludePassword` is true, the password field will be excluded.
 *
 * @example
 * ```typescript
 * const user = await findUserByPhone("1234567890");
 * console.log(user?.phone); // "1234567890"
 * console.log(user?.password); // undefined
 * ```
 */
export const findUserByPhone = (
  phone: string,
  excludePassword: boolean = true
) =>
  User.findOne({
    where: { phone },
    attributes: {
      exclude: excludePassword ? ["password"] : [],
    },
  });

/**
 * Finds a user by their unique identifier (ID) in the database without including the user password. The returned user will also include the role of the user.
 *
 * @param userId - The unique identifier of the user to find.
 * */
export const findUserById = async (userId: number) =>
  await User.findByPk(userId, {
    attributes: {
      exclude: ["password", "roleId"],
    },
    include: [{ model: Role, as: "role" }],
  });

export const saveUser = (user: UserType) => {
  return User.create(user);
};
