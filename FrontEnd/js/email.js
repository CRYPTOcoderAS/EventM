

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "akshat0133@gmail.com",
      pass: "Password@akshat0133",
    },
  });
  


const sendRegistrationConfirmationEmail = (recipientEmail) => {
  const mailOptions = {
    from: "akshat0133@gmail.com",
    to: recipientEmail,
    subject: "Registration Confirmation",
    text: "Thank you for registering for our event! We look forward to seeing you there.",
 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  sendRegistrationConfirmationEmail,
};
