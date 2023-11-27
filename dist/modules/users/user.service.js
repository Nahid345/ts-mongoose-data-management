"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
// create user
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error('User already exists');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
// get all user
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
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
});
//getsingleuser
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.isUserExists(userId);
    if (!result) {
        throw new Error('User not found!');
    }
    return result;
});
//update user
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, updateData);
    return result;
});
// delete user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.deleteOne({ userId: id });
    return result;
});
//update orders
const updateOrders = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId: id }, { $addToSet: { orders: orderData } });
    return result;
});
// get order
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.isUserExists(userId);
    if (!isExist) {
        throw new Error('User not found!');
    }
    const result = yield user_model_1.User.findOne({ userId }).select('orders');
    return result;
});
// calcualtor price
const calculateOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.isUserExists(userId);
    if (!isExist) {
        throw new Error('User not found!');
    }
    const result = yield user_model_1.User.aggregate([
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
    ]);
    const totalPrice = result[0] ? result[0].totalPrice : 0;
    const fixedTotalPrice = Number(totalPrice.toFixed(2));
    return fixedTotalPrice;
});
exports.userServices = {
    createUserIntoDB,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    updateOrders,
    getUserOrders,
    calculateOrders,
};
