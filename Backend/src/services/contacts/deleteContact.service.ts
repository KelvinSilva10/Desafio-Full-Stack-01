import validate from "uuid-validate";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";

const deleteContactService = async (
  clientId: string,
  contactId: string
): Promise<void> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  if (!validate(contactId)) {
    throw new AppError(
      "Contact not found for the given client ID and contact ID",
      404
    );
  }

  const contact = await contactRepository.findOne({
    where: {
      id: contactId,
      client: { id: clientId },
    },
  });

  console.log(contact);

  if (!contact) {
    throw new AppError(
      "Contact not found for the given client ID and contact ID",
      404
    );
  }

  contact.isActive = false;
  await contactRepository.save(contact);
};

export default deleteContactService;
