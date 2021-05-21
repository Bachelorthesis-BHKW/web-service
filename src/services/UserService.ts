import { User, UserCreateAttributes } from "../models/User";
import ExpressError, { ErrorCode } from "../error";
import bcrypt from "bcrypt";

export async function createNewUser(user: UserCreateAttributes): Promise<User> {
  user.password = await bcrypt.hash(user.password, 10);
  return User.create(user);
}

export async function getUserById(userId: number): Promise<User> {
  const user = await User.findByPk(userId);
  if (!user) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return user;
}

async function getUserByEmail(email: string): Promise<User> {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return user;
}

export async function patchUserById(
  userId: number,
  user: UserCreateAttributes
): Promise<void> {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  const [updateCount] = await User.update(user, { where: { userId } });
  if (!updateCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}

export async function deleteUserById(userId: number): Promise<void> {
  const deleteCount = await User.destroy({ where: { userId } });
  if (!deleteCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}

export async function getJWTForUser(
  email: string,
  password: string
): Promise<string> {
  const user = await getUserByEmail(email);
  if (!(await bcrypt.compare(password, user.password)))
    throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
  return "";
}
