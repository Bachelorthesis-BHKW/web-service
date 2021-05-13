import dotenv from "dotenv";

const dotenvConfigOutput = dotenv.config();

if (dotenvConfigOutput.error != undefined) {
  throw dotenvConfigOutput.error;
}

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
};
