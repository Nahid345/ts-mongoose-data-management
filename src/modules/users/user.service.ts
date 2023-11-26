import { TUser } from "./user.interface";
import { userModel } from "./user.model";

// create user
const createUserIntoDB = async (user: TUser) => {
  const result = await userModel.create(user);
  return result;
};

// get all user
const getAllUsers = async () => {
  const result = await userModel.aggregate([
    {
      $project: {
        _id: 0,
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
};
