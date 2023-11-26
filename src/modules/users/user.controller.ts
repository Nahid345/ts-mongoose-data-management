import { Request, Response } from "express";
import { userServices } from "./user.service";
import { userValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    // will call service fn to send the data
    // const validateData = userValidationSchema.parse(user);

    const result = await userServices.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: "User create succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  createUser,
};
