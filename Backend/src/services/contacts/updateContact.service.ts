import validate from "uuid-validate";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import {
  IContactResponse,
  IContactUpdateRequest,
} from "../../interfaces/contacts";
// import { User } from "../../entities/user.entity";
// import { AppError } from "../../errors/AppError";

const updateContactService = async (
  contactData: IContactUpdateRequest,
  clientId: string,
  contactId: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  if (!validate(contactId)) {
    throw new AppError(
      "Contact not found for the given client ID and contact ID",
      404
    );
  }

  // find the contact by ID and the client by ID
  const findContact = await contactRepository.findOne({
    where: {
      id: contactId,
      client: { id: clientId },
    },
  });

  console.log(clientId);

  if (!findContact) {
    throw new AppError(
      "Contact not found for the given client ID and contact ID",
      404
    );
  }

  const updateContact = contactRepository.create({
    ...findContact,
    ...contactData,
  });

  await contactRepository.save(updateContact);

  // Removendo o campo "client" da resposta
  const { client, ...contactWithoutClient } = updateContact;

  return contactWithoutClient;
};

export default updateContactService;
