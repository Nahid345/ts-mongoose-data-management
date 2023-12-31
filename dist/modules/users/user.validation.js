"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const userFullNameValidation = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const userAddressValidation = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const userOrderValidation = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
// user validation by zod
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    userName: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: userFullNameValidation,
    email: zod_1.z.string().email(),
    age: zod_1.z.number().int().positive(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: userAddressValidation,
    isActive: zod_1.z.boolean().default(true),
    orders: zod_1.z.array(userOrderValidation).default([]).optional(),
});
