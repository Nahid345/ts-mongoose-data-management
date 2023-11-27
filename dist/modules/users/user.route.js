"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.userController.createUser); // create user
router.get("/", user_controller_1.userController.getAllusers); // getalluser
router.get("/:userId", user_controller_1.userController.getSingUser); // getsingle user
router.delete("/:userId", user_controller_1.userController.deleteUser); // deleteuser
router.put("/:userId", user_controller_1.userController.updateUser); // update user
router.get("/userId/total-price", user_controller_1.userController.calculateOrders);
router.put("/:userId/orders", user_controller_1.userController.updateOrders); // update order
router.get("/:userId/orders", user_controller_1.userController.getUserOrders); // find order
exports.userRoutes = router;
