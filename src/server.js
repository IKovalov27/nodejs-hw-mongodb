import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import session from "cookie-session";
import morgan from "morgan";
import { env } from "./utils/env.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

dotenv.config();

const PORT = Number(env("PORT", "3000"));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ["application/json", "application/vnd.api+json"],
      limit: "100kb",
    })
  );
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );
  app.use(cors());
  app.use(helmet());

  app.use(morgan("combined"));

  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );

  app.get("/", (req, res) => {
    res.send(`
      <p>Hello World! <br /> Go to <a href="/contacts">contacts list</a></p>
    `);
  });

  app.use(rootRouter);

  app.use("*", notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
