import { Request, Response } from "express";
import { IContactRequest, IContactUpdateRequest } from "../interfaces/contacts";
import createContactService from "../services/contacts/createContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import getContactService from "../services/contacts/getContact.service";
import listContactsService from "../services/contacts/listContact.service";
import updateContactService from "../services/contacts/updateContact.service";

const createContactController = async (req: Request, res: Response) => {
  const contactData: IContactRequest = req.body;
  const clientId = String(req.client.id);
  const newContact = await createContactService(contactData, clientId);
  return res.status(201).json(newContact);
};

const listContactsController = async (req: Request, res: Response) => {
  const clientId = String(req.client.id);
  const contacts = await listContactsService(clientId);

  return res.json(contacts);
};

const getContactController = async (req: Request, res: Response) => {
  const idContact = req.params.id;
  const Contacts = await getContactService(idContact);
  return res.json(Contacts);
};

const deleteContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  const clientId = String(req.client.id);
  await deleteContactService(clientId, contactId);
  return res.status(204).json({});
};

const updateContactController = async (req: Request, res: Response) => {
  const contactData: IContactUpdateRequest = req.body;
  const clientId = String(req.client.id);
  const contactId = req.params.id;
  const updateContact = await updateContactService(
    contactData,
    clientId,
    contactId
  );
  return res.json(updateContact);
};

export {
  createContactController,
  listContactsController,
  getContactController,
  deleteContactController,
  updateContactController,
};
