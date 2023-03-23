import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  getClientController,
  listClientsController,
  updateClientController,
} from "../controllers/clients.controllers";
import ensureClientAlreadyExistsMiddleware from "../middlewares/ensureClientAlreadyExists.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { clientSerializer } from "../serializers/client.schemas";

const clientRoutes = Router();

clientRoutes.post(
  "",
  ensureDataIsValidMiddleware(clientSerializer),
  ensureClientAlreadyExistsMiddleware,
  createClientController
);
clientRoutes.get("", listClientsController);
clientRoutes.get("/:id", getClientController);
clientRoutes.patch("/:id", updateClientController);
clientRoutes.delete("/:id", deleteClientController);

export default clientRoutes;
