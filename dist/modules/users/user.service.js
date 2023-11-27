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
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(user.userId)) {
        throw new Error("User already exists");
    }
    const result = yield user_model_1.User.create(user);
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
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.findOne({ userId: id }, {
        _id: 0,
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    });
    return res;
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
const getUserOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId: id });
    return result === null || result === void 0 ? void 0 : result.orders;
});
// calcualtor
const calculateOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findOne({ userId: id });
    const totalOrderPrice = ((_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((total, orders) => total + orders.price * orders.quantity, 0)) || 0;
    return totalOrderPrice;
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
