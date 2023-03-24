import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import validate from "uuid-validate";
import { ILike } from "typeorm";
import { IContactResponse } from "../../interfaces/contacts";

const getContactService = async (
  idOrName: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  let contact: Contact;

  if (validate(idOrName)) {
    // verifica se é um UUID válido
    contact = await contactRepository.findOne({
      where: {
        id: idOrName,
        isActive: true,
      },
      relations: ["client"],
    });
  } else {
    contact = await contactRepository.findOne({
      where: {
        name: ILike(`%${idOrName}%`),
        isActive: true,
      },
      relations: ["client"],
    });
  }

  if (!contact) {
    throw new Error("Contact not found");
  }

  const { client, ...contactWithoutClient } = contact;

  return contactWithoutClient;
};

export default getContactService;
