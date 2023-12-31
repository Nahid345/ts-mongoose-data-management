import { Model } from 'mongoose'

export type TFullName = {
  firstName: string
  lastName: string
}

export type TAddress = {
  street: string
  city: string
  country: string
}

export type TOrder = {
  productName: string
  price: number
  quantity: number
}

export type TUser = {
  userId: number
  userName: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  orders?: TOrder[]
}

// update user type

export type TUpdateUser = {
  userId: number
  userName: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  orders?: TOrder[]
}

// creating static

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number | string): Promise<TUser | null>
}
