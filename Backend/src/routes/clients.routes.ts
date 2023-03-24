import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  getClientController,
  listClientsController,
  updateClientController,
} from "../controllers/clients.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureClientAlreadyExistsMiddleware from "../middlewares/ensureClientAlreadyExists.middleware";
import ensureClientExistsMiddleware from "../middlewares/ensureClientExists.middleware";
import ensureClientIsActiveMiddleware from "../middlewares/ensureClientIsActive.middleware";
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
clientRoutes.get("/:id", ensureClientExistsMiddleware, getClientController);
clientRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureClientExistsMiddleware,
  ensureClientIsActiveMiddleware,
  updateClientController
);
clientRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureClientExistsMiddleware,
  ensureClientIsActiveMiddleware,
  deleteClientController
);

export default clientRoutes;
