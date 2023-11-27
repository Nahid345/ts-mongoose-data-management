import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { TFullName, TUser, UserModel } from './user.interface'
import config from '../../app/config'

const userFullNameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: [true, 'firstName is require'],
      maxlength: [20, 'first name is more than 20 characters'],
      validate: function (value: string) {
        const nameCap = value.charAt(0).toUpperCase() + value.slice(1)
        return value === nameCap
      },
    },
    lastName: {
      type: String,
      required: [true, 'lastName is require'],
    },
  },
  { _id: false },
)

const userAddressSchema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
)

const userOrdersSchema = new Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
)

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String },
  fullName: userFullNameSchema,
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hobbies: {
    type: [String],
  },
  address: userAddressSchema,
  isActive: {
    type: Boolean,
    required: [true, 'isactive is require'],
    default: true,
  },
  orders: { type: [userOrdersSchema] },
})

// // creating middleware

// before sending data to db
userSchema.pre('save', async function (next) {
  //Unexpected aliasing of 'this' to local variable.eslint@typescript-eslint/no-this-alias
  const users = this

  // Store hashing  password into DB.

  users.password = await bcrypt.hash(
    users.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// after saved data
userSchema.post('save', function (document, next) {
  document.password = ''
  next()
})

// creating static method

userSchema.statics.isUserExists = async function (userId) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

// create model

export const User = model<TUser, UserModel>('User-collection', userSchema)
