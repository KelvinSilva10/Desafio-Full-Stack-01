import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const listContactsService = async (clientId: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find({
    where: {
      isActive: true,
      client: { id: clientId },
    },
  });

  return contacts;
};

export default listContactsService;
