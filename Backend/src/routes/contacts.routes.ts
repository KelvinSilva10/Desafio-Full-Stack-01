import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactController,
  listContactsController,
  updateContactController,
} from "../controllers/contact.controllers";

const contactRoutes = Router();

contactRoutes.post("", createContactController);
contactRoutes.get("", listContactsController);
contactRoutes.get("/:id", getContactController);
contactRoutes.patch("/:id", deleteContactController);
contactRoutes.delete("/:id", updateContactController);

export default contactRoutes;
