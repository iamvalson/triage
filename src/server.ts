import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function start() {
  await mongoose.connect(config.mongodbUri);
  console.log("MongoDB connected");
  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}

start().catch(err => {
  console.error("Failed to start", err);
  process.exit(1);
});
