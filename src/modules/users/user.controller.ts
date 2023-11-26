import { Request, Response } from "express";
import { userServices } from "./user.service";
import { userValidationSchema } from "./user.validation";
import { TUser } from "./user.interface";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    // will call service fn to send the data
    const validateData = userValidationSchema.parse(user);

    const result = await userServices.createUserIntoDB(validateData);
    res.status(200).json({
      success: true,
      message: "User create succesfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something wrong",
      error: err,
    });
  }
};

// getalluser

const getAllusers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something wrong",
    });
  }
};

//getSingleUser

const getSingUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUser(userId);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something wrong",
    });
  }
};

//update user

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const UpData: TUser = req.body;

    const result = await userServices.updateUser(userId, UpData);
    if (result?.matchedCount === 0) {
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something wrong",
    });
  }
};

export const userController = {
  createUser,
  getAllusers,
  getSingUser,
  updateUser,
};
