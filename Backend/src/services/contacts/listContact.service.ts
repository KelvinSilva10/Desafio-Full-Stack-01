import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const listContactsService = async () => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find({
    where: {
      isActive: true,
    },
  });

  return;
};

export default listContactsService;
