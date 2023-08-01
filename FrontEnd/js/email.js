

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "akshat0133@gmail.com",
      pass: "Password@akshat0133",
    },
  });
   


  const sendRegistrationConfirmationEmail = (recipientEmail, eventName, registrantName) => {
    const mailOptions = {
      from: "akshat0133@gmail.com",
      to: recipientEmail,
      subject: "Registration Confirmation",
      text: `Dear ${registrantName},\n\nThank you for registering for ${eventName}! We look forward to seeing you there.\n\nBest regards,\nThe Event Team`,
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
