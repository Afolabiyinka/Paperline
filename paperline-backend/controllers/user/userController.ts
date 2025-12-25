import { User } from "../../models/user/User";
import { Request, Response } from "express";
import { updateProfilePayload } from "../../types/user";

const updateProfile = async (req: Request, res: Response) => {
  const { email, firstname, lastname, profilePic, id } =
    req.body as updateProfilePayload;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user details
    await user.update({
      firstname,
      lastname,
      profilePic,
      email,
      username: `${lastname} ${firstname}`,
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
      error,
    });
  }
};

const updateProfilePic = async (req: Request, res: Response) => {
  const {} = req.body;
};

const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy(); // add await here
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
