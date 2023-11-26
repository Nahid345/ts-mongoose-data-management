import { Schema, model, connect } from "mongoose";
import bcrypt from "bcrypt";
import { TAddress, TFullName, TOrder, TUser } from "./user.interface";
import config from "../../app/config";

const userFullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "firstName is require"],
    maxlength: [20, "first name is more than 20 characters"],
    validate: function (value: string) {
      const nameCapitalize = value.charAt(0).toUpperCase() + value.slice(1);
      return value === nameCapitalize;
    },
  },
  lastName: {
    type: String,
    required: [true, "lastName is require"],
  },
});

const userAddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userOrdersSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
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
    // required: [true, "isactive is require"],
    default: true,
  },
  orders: { type: [userOrdersSchema] },
});

// // creating middleware

// // before sending data to db
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const users = this;

  // Store hashing  password into DB.

  users.password = await bcrypt.hash(
    users.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

// after saved data that works {password = ""}
userSchema.post("save", function (document, next) {
  document.password = "";
  next();
});

// create model

export const userModel = model<TUser>("User-collection", userSchema);
