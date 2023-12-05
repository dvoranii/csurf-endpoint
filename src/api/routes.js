import express from "express";
import sendMail from "./utils/sendMail.js";
import verifyRecaptcha from "./utils/verifyCaptcha.js";

const router = express.Router();

router.get("/csrf", (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});

router.post("/process", async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  try {
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return res
        .status(400)
        .send({ status: "failed", error: "reCAPTCHA verification failed" });
    }

    const mailResult = await sendMail({ name, email, message });

    if (mailResult.success) {
      res.status(200).send({ status: "success" });
    } else {
      res.status(500).send({ status: "failed", error: result.error });
    }
  } catch (error) {
    res.status(500).send({ status: "failed", error: error.message });
  }
});

export default router;
