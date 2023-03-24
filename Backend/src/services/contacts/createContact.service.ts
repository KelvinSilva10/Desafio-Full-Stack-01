import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";

import { Contact } from "../../entities/contact.entity";
import { IContactRequest, IContactResponse } from "../../interfaces/contacts";
import { clientWithoutPasswordSerializer } from "../../serializers/client.schemas";
import { contactResponseSerializer } from "../../serializers/contact.schemas";

const createContactService = async (
  contactData: IContactRequest,
  clientId: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id: clientId });

  const contact = contactRepository.create({
    ...contactData,
    client: client, // associa o contato ao cliente informado
  });

  const newContact = await contactRepository.save(contact);

  const responseNewContact = await contactResponseSerializer.validate(
    newContact,
    {
      stripUnknown: true,
    }
  );

  return responseNewContact;
};

export default createContactService;
