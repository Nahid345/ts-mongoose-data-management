import { TOrder, TUpdateUser, TUser } from './user.interface'
import { User } from './user.model'

// create user
const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists')
  }
  const result = await User.create(userData)
  return result
}

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
  ])
  return result
}

//getsingleuser

const getSingleUser = async (userId: number) => {
  const result = await User.isUserExists(userId)
  if (!result) {
    throw new Error('User not found!')
  }
  return result
}
//update user

const updateUser = async (userId: string, updateData: TUpdateUser) => {
  const result = await User.updateOne({ userId }, updateData)
  return result
}

// delete user

const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ userId: id })

  return result
}

//update orders
const updateOrders = async (id: string, orderData: TOrder) => {
  const result = await User.updateOne(
    { userId: id },
    { $addToSet: { orders: orderData } },
  )
  return result
}

// get order

const getUserOrders = async (userId: number) => {
  const isExist = await User.isUserExists(userId)
  if (!isExist) {
    throw new Error('User not found!')
  }
  const result = await User.findOne({ userId }).select('orders')
  return result
}

// calcualtor price
const calculateOrders = async (userId: number) => {
  const isExist = await User.isUserExists(userId)
  if (!isExist) {
    throw new Error('User not found!')
  }
  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: { totalPrice: 1, _id: 0 },
    },
  ])
  const totalPrice = result[0] ? result[0].totalPrice : 0
  const fixedTotalPrice = Number(totalPrice.toFixed(2))
  return fixedTotalPrice
}
export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateOrders,
  getUserOrders,
  calculateOrders,
}
