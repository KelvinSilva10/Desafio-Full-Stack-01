import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const getContactService = async (idContact: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  //   const user = await contactRepository.findOne({
  //     where: {
  //       id: idContact,
  //     },
  //   });

  //   const { password, ...userNotPassWord } = user;

  return;
};

export default getContactService;
