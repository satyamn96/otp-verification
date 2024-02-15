import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "./db/index.js";
import OTPRouter from "./routes/v2/otpVerification/routes/index.js";
import organizationRouter from "./routes/v2/organization/routes/index.js";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(cors("*"));

dotenv.config();

app.get("/", async (req, res) => {
  try {
    let welcome = fs.readFileSync('./src/index.html', 'utf-8');
    res.send(welcome);
  } catch (error) {
    let errorPage = fs.readFileSync('./src/error.html', 'utf-8');
    res.send(errorPage);
  }
});

app.use("/v2/otp", OTPRouter);
app.use("/v2/admin/uses/organization", organizationRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
