import config from "./config";
import loaders from "./loaders";
import express from "express";
import { setupErrorHandling } from "./error";

async function startServer() {
  const app = express();

  await loaders(app);

  app
    .listen(config.port, () => {
      console.info(`Server is running on port ${config.port}!`);
    })
    .on("error", (err) => {
      console.error(err);
    });
}

setupErrorHandling();
startServer().then(() => console.log("Ready!"));
