import { TUpdateUser, TUser } from "./user.interface";
import { User } from "./user.model";

// create user
const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// get all user
const getAllUsers = async () => {
  const result = await User.aggregate([
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

//getsingleuser

const getSingleUser = async (id: string) => {
  const res = await User.findOne(
    { userId: id },
    {
      _id: 0,
      userName: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    }
  );
  return res;
};

//update user

const updateUser = async (userId: string | number, updateData: TUpdateUser) => {
  const result = await User.updateOne({ userId }, updateData);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
};
