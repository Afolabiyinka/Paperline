"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "plainx738@gmail.com@gmail.com",
        pass: "future",
    },
});
const sendEmail = async () => {
    const info = await transporter.sendMail({
        from: "Paperline",
        to: "plainx738@gmail.com",
        subject: "You forgot password",
        text: "Hello bro, u forgot your password", // plain‑text body
        html: `<b>Hello bro, u forgot your password</b>`
    });
    console.log("Message sent:", info.messageId);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map