import cookieParser from "cookie-parser";
import csrf from "csurf";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/form", csrfProtection, (req, res) => {
  res.send({ csrfToken: req.csrfToken() });
});

app.post("/process", parseForm, csrfProtection, (req, res) => {
  console.log(req.body);
  res.send("data is being processed");
});

export default app;
