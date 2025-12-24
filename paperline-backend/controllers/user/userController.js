"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateProfile = void 0;
const User_1 = require("../../models/user/User");
const updateProfile = async (req, res) => {
    const { email, firstname, lastname, profilePic, id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const user = await User_1.User.findOne({ where: { id } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Update user
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update profile",
            error,
        });
    }
};
exports.updateProfile = updateProfile;
const deleteAccount = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const user = await User_1.User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        await user.destroy(); // add await here
        return res.status(200).json({
            message: "Account deleted successfully",
        });
    }
    catch (err) {
        console.log("Something went wrong", err);
        return res.status(500).json({
            message: "Failed to delete account",
        });
    }
};
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=userController.js.map