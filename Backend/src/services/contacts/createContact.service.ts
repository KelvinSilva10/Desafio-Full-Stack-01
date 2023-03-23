import AppDataSource from "../../data-source";

import { Contact } from "../../entities/contact.entity";
import { IContactRequest, IContactResponse } from "../../interfaces/contacts";
import { clientWithoutPasswordSerializer } from "../../serializers/client.schemas";

const createContactService = async (
  clientData: IContactRequest
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const createdClient = contactRepository.create(clientData);
  await contactRepository.save(createdClient);

  return;
};

export default createContactService;
