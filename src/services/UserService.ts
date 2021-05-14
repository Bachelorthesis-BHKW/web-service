import { UserIN } from "../in_interfaces/User";
import { User } from "../models/User";

export async function createNewUser(user: UserIN): Promise<void> {
  await User.create({
    name: user.name,
    email: user.email,
    company: user.company,
    password: user.password,
  });
  return;
}
