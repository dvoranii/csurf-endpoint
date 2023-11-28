import express from "express";
import sendMail from "./utils/sendMail.js";

const router = express.Router();

router.get("/csrf", (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});

router.post("/process", async (req, res) => {
  const { name, email, message } = req.body;

  console.log(name, email, message);
  const result = await sendMail({ name, email, message });
  console.log(result);

  //   try {
  //     const result = await sendMail({ name, email, message });

  //     if (result.success) {
  //       res.status(200).send({ status: "success" });
  //     } else {
  //       res.status(500).send({ status: "failed", error: result.error });
  //     }
  //   } catch (error) {
  //     res.status(500).send({ status: "failed", error: error.message });
  //   }
});

export default router;
