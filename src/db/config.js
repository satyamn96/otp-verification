import dotenv from "dotenv";

dotenv.config();

const config = {
  dbname: process.env.dbname || "otp_verifications",
  dbuser: process.env.user || "root",
  dbpassword: process.env.userpassword || "",
  dbhost: process.env.host || "localhost",
  dbport: process.env.dbport || "3310",
};

export default config;
