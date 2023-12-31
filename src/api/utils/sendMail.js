import nodemailer from "nodemailer";

// Function to create and configure the transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.APP_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
    // DEVELOPMENT ENVIRONMENT ONLY
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const sendMail = async ({ name, email, message }) => {
  const transporter = createTransporter();

  const mailOptionsSelf = {
    from: process.env.APP_USER,
    to: process.env.APP_USER,
    subject: "New Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  const mailOptionsUser = {
    from: process.env.APP_USER,
    to: email,
    subject: "Thank you for your interest!",
    text: "We have received your form submission. Thanks.",
  };
  try {
    await transporter.sendMail(mailOptionsSelf);

    setTimeout(async () => {
      await transporter.sendMail(mailOptionsUser);
    }, 480000);

    return { success: true };
  } catch (error) {
    console.error("Error in sending email:", error);
    if (error.response && error.response.data) {
      console.error("OAuth2 Error Details:", error.response.data);
    }
    return { success: false, error: error.message, fullError: error };
  }
};

export default sendMail;
