import "express-async-errors";
import "reflect-metadata";
import express from "express";
import contactRoutes from "./routes/contacts.routes";
import sessionRoutes from "./routes/session.routes";
import clientRoutes from "./routes/clients.routes";
import handleError from "./errors/handleError";
import cors from "cors";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import swaggerDocs from "./swagger.json"



const app = express();

// const specs = swaggerJsdoc(swaggerSpecs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactRoutes);

app.use(handleError);

export default app;
