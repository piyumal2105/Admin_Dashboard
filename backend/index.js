import express from "express";
import "dotenv/config";
import cors from "cors";
import dbConnect from "./configs/dbconfigs.js";
import ProductRoutes from "./routes/product.routes.js";

const app = express();

const PORT = process.env.PORT || 6001;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json({ limit: "100mb" }));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} =====> URL: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Admin Dashboard!");
});

app.use("/product", ProductRoutes);

app.listen(PORT, () => {
  console.log(`🚀💀 Server is started on port ${PORT}!`);
  dbConnect();
});
