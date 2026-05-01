import express from "express";
import rootRouter from "./src/routers/root.router.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/common/swagger/init.swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger Docs
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css";
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: CSS_URL,
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js",
    ],
  })
);

// Main router
app.use("/api", rootRouter);

// Redirect root to swagger
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3069;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
