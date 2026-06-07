import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testuser@gmail.com",
    pass: "password",
  },
});

export const sendEmail = async () => {
  const info = await transporter.sendMail({
    from: "Paperline",
    to: "plainx738@gmail.com",
    subject: "You forgot password",
    text: "Hello bro, u forgot your password",
    html: `<b>Hello bro, u forgot your password</b>`
  });


  console.log("Message sent:", info.messageId);

};
