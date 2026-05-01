import express from "express";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/common/swagger/init.swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Main router
app.use("/api", rootRouter);

// Redirect root to swagger
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

const PORT = process.env.PORT || 3069;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
