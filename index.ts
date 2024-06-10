import express from "express";
const app = express();
import { seedRouters } from "./routes/seed.routes";
import { AppDataSource } from "./data-source";
import { getRouters } from "./routes/get.routes";

// connectPgDb()
AppDataSource.initialize()
  .then(async () => {
    console.log("Data source had been initialised...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1/seed", seedRouters);
app.use("/api/v1/fetch", getRouters);

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
