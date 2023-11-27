import { TOrder, TUpdateUser, TUser } from "./user.interface";
import { User } from "./user.model";

// create user
const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error("User already exists");
  }
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

// delete user

const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ userId: id });

  return result;
};

//update orders
const updateOrders = async (id: string, orderData: TOrder) => {
  const result = await User.updateOne(
    { userId: id },
    { $addToSet: { orders: orderData } }
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateOrders,
};
