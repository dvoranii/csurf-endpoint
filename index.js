import express from "express";
import routes from "./app.js";

const app = express();
const port = 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
