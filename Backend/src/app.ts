import "express-async-errors";
import "reflect-metadata";
import express from "express";
import contactRoutes from "./routes/contacts.routes";
import sessionRoutes from "./routes/session.routes";
import clientRoutes from "./routes/clients.routes";
import handleError from "./errors/handleError";

const app = express();
app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactRoutes);

app.use(handleError);

export default app;
