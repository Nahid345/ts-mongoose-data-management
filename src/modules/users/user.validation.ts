import { z } from "zod";

const userFullNameValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const userAddressValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userOrderValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// user validation by zod

export const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  userName: z.string(),
  password: z.string(),
  fullName: userFullNameValidation,
  email: z.string().email(),
  age: z.number().int().positive(),
  hobbies: z.array(z.string()),
  address: userAddressValidation,
  isActive: z.boolean().default(true),
  orders: z.array(userOrderValidation).default([]).optional(),
});
