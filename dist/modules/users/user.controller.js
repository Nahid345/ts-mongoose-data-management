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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        // will call service fn to send the data
        const validateData = user_validation_1.userValidationSchema.parse(user);
        const result = yield user_service_1.userServices.createUserIntoDB(validateData);
        res.status(200).json({
            success: true,
            message: "User create succesfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something wrong",
            error: err,
        });
    }
});
// getalluser
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something wrong",
        });
    }
});
//getSingleUser
const getSingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getSingleUser(userId);
        if (result === null) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something wrong",
        });
    }
});
//update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const UpData = req.body;
        const result = yield user_service_1.userServices.updateUser(userId, UpData);
        if ((result === null || result === void 0 ? void 0 : result.matchedCount) === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const updateUserData = {
            userId: UpData.userId,
            userName: UpData.userName,
            fullName: UpData.fullName,
            age: UpData.age,
            email: UpData.email,
            hobbies: UpData.hobbies,
            isActive: UpData.isActive,
            address: UpData.address,
        };
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            result: updateUserData,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something wrong",
        });
    }
});
// deleteuser
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.deleteUser(userId);
        if ((result === null || result === void 0 ? void 0 : result.deletedCount) === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "user deleted successfully",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something wrong",
        });
    }
});
//update orders
const updateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const ordrData = req.body;
        const result = yield user_service_1.userServices.updateOrders(userId, ordrData);
        if ((result === null || result === void 0 ? void 0 : result.matchedCount) === 0) {
            res.status(404).json({
                success: false,
                message: "User is not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders create Successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something wrong",
        });
    }
});
// get user orders
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getUserOrders(userId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
            res.status(200).json({
                success: true,
                message: "Order fetched successfully",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something wrong",
        });
    }
});
// calculation
const calculateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.calculateOrders(userId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            totalPrice: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
exports.userController = {
    createUser,
    getAllusers,
    getSingUser,
    updateUser,
    deleteUser,
    updateOrders,
    getUserOrders,
    calculateOrders,
};
