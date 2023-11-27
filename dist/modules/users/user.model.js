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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../app/config"));
const userFullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is require'],
        maxlength: [20, 'first name is more than 20 characters'],
        validate: function (value) {
            const nameCap = value.charAt(0).toUpperCase() + value.slice(1);
            return value === nameCap;
        },
    },
    lastName: {
        type: String,
        required: [true, 'lastName is require'],
    },
}, { _id: false });
const userAddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });
const userOrdersSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { _id: false });
const userSchema = new mongoose_1.Schema({
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
});
// // creating middleware
// before sending data to db
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Unexpected aliasing of 'this' to local variable.eslint@typescript-eslint/no-this-alias
        const users = this;
        // Store hashing  password into DB.
        users.password = yield bcrypt_1.default.hash(users.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
// after saved data
userSchema.post('save', function (document, next) {
    document.password = '';
    next();
});
// creating static method
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
// create model
exports.User = (0, mongoose_1.model)('User-collection', userSchema);
