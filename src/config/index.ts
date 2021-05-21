import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  const dotenvConfigOutput = dotenv.config();

  if (dotenvConfigOutput.error != undefined) {
    throw dotenvConfigOutput.error;
  }
}

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  dbName: process.env.DB_NAME,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
};
