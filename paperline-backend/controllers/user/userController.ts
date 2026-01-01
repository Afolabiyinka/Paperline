import { User } from "../../models/user/User";
import { Request, Response } from "express";
import { profilePicPayload, updateProfilePayload } from "../../types/user";
import { AuthenticatedRequest } from "../../types/request/types";

const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user?.id;
  const { email, firstname, lastname, profilePic } =
    req.body as updateProfilePayload;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user details
    await user.update({
      firstname,
      lastname,
      profilePic,
      email,
      username:
        firstname && lastname
          ? `${lastname} ${firstname}`
          : user.getDataValue("username"),
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.getDataValue("username"),
        firstname: user.getDataValue("firstname"),
        lastname: user.getDataValue("lastname"),
        email: user.getDataValue("email"),
        id: user.getDataValue("id"),
        profilePic: user.getDataValue("profilePic"),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

const updateProfilePic = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user?.id;
  const { profilePic } = req.body as profilePicPayload;

  if (!id) {
    return res.status(404).json({
      message: "Id is required",
    });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ mesage: "User not found" });
  } catch (err) {
    console.log(err);
  }
};

const deleteAccount = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user?.id;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();
    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.log("Something went wrong", err);
    return res.status(500).json({
      message: "Failed to delete account",
    });
  }
};

export { updateProfile, deleteAccount, updateProfilePic };
