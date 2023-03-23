import AppDataSource from "../../data-source";

const deleteClientService = async (idUserDelete: string, idUser: string) => {
  //   const userRepository = AppDataSource.getRepository(User);
  //   if (idUserDelete !== idUser) {
  //     throw new AppError("You dont have permission", 403);
  //   }
  //   const user = await userRepository.findOneBy({ id: idUserDelete });
  //   user.isActive = false;
  //   await userRepository.save(user);
};

export default deleteClientService;
