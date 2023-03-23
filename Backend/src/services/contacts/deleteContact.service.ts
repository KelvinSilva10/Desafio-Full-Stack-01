import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const deleteContactService = async (
  idContactDelete: string,
  idUser: string
) => {
  const userRepository = AppDataSource.getRepository(Contact);
  //   if (idContactDelete !== idUser) {
  //     throw new AppError("You dont have permission", 403);
  //   }
  //   const user = await userRepository.findOneBy({ id: idContactDelete });
  //   user.isActive = false;
  //   await userRepository.save(user);
};

export default deleteContactService;
