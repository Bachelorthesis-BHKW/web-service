import { UserIN } from "../in_interfaces/User";
import { User } from "../models/User";
import ExpressError, { ErrorCode } from "../error";

export async function createNewUser(user: UserIN): Promise<User> {
  return User.create({
    name: user.name,
    email: user.email,
    company: user.company,
    password: user.password,
  });
}

export async function getUserById(userId: number): Promise<User> {
  const user = await User.findByPk(userId);
  if (!user) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return user;
}

export async function patchUserById(
  userId: number,
  user: UserIN
): Promise<void> {
  const [updateCount] = await User.update(user, { where: { userId } });
  if (!updateCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}

export async function deleteUserById(userId: number): Promise<void> {
  const deleteCount = await User.destroy({ where: { userId } });
  if (!deleteCount) throw new ExpressError(ErrorCode.NOT_FOUND_404);
  return;
}
