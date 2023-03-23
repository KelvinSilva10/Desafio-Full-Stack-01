import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
// import { User } from "../../entities/user.entity";
// import { AppError } from "../../errors/AppError";

const updateContactService = async (
  userIdParams: string,
  userData,
  userId: string
) => {
  const userRepository = AppDataSource.getRepository(Contact);

  //   if (userId !== userIdParams) {
  //     throw new AppError("You do not have permission to change other user", 403);
  //   }

  //   const findUser = await userRepository.findOneBy({
  //     id: userIdParams,
  //   });

  //   if (userId !== userIdParams) {
  //     throw new AppError("You do not have permission to change other user", 403);
  //   }

  //   const updateUser = userRepository.create({
  //     ...findUser,
  //     ...userData,
  //   });

  //   await userRepository.save(updateUser);

  //   const updatedUserWithoutPassword =
  //     await userWithoutPasswordSerializer.validate(updateUser, {
  //       stripUnknown: true,
  //     });

  //   return updatedUserWithoutPassword;
};

export default updateContactService;
