import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactController,
  listContactsController,
  updateContactController,
} from "../controllers/contact.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  contactSerializer,
  contactUpdateSerializer,
} from "../serializers/contact.schemas";

const contactRoutes = Router();

contactRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(contactSerializer),
  createContactController
);
contactRoutes.get("", ensureAuthMiddleware, listContactsController);
contactRoutes.get("/:id", ensureAuthMiddleware, getContactController);
contactRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(contactUpdateSerializer),
  updateContactController
);
contactRoutes.delete("/:id",ensureAuthMiddleware, deleteContactController);

export default contactRoutes;
