import { TUser } from "./user.interface";
import { userModel } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const result = await userModel.create(user);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
