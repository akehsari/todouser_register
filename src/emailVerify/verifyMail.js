import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const verifyMail = (token, email , userName) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mail,
      pass: process.env.pass,
    },
  });

  const mailConfigurations = {
    from: process.env.mail,
    to: email,
    subject: "Email Verification!!!!!!!!!!!!!!!!!!!!",
    text: `Hello ${userName}, Kindly Verify ${token} `
//     text:`Hi! There, You have recently visited
//            our website and entered your email.
//            Please follow the given link to verify your email
//            http://localhost:5173/user/verify/${token}
//            Thanks`
   
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      throw new Error(error);
    }
    console.log("Email Sent Successfully");
    console.log(info);
  });
};