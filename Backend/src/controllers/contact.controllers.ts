import { Request, Response } from "express";
import { IContactRequest } from "../interfaces/contacts";
import createContactService from "../services/contacts/createContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import getContactService from "../services/contacts/getContact.service";
import listContactsService from "../services/contacts/listContact.service";
import updateContactService from "../services/contacts/updateContact.service";

const createContactController = async (req: Request, res: Response) => {
  const ContactData: IContactRequest = req.body;
  const newContact = await createContactService(ContactData);
  return res.status(201).json(newContact);
};

const listContactsController = async (req: Request, res: Response) => {
  const contacts = await listContactsService();

  return res.json(contacts);
};

const getContactController = async (req: Request, res: Response) => {
  const idContact = req.params.id;
  const Contacts = await getContactService(idContact);
  return res.json(Contacts);
};

const deleteContactController = async (req: Request, res: Response) => {
  const idContactDelete = req.params.id;
//   const idContact = req.Contact.id;
//   await deleteContactService(idContactDelete, idContact);
  return res.status(204).json({});
};

const updateContactController = async (req: Request, res: Response) => {
  // const ContactData: IContactUpdateRequest = req.body;
  // const ContactIdParams = req.params.id;
  // const ContactId = String(req.Contact.id);
//   const updateContact = await updateContactService(
  //   ContactIdParams,
  //   ContactData,
  //   ContactId
  // );
  // return res.json(updateContact);
};

export {
  createContactController,
  listContactsController,
  getContactController,
  deleteContactController,
  updateContactController,
};
