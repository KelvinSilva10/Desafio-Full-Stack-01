import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/AppError";

const deleteClientService = async (
  idClientDelete: string,
  idClient: string
) => {
  const clientRepository = AppDataSource.getRepository(Client);
  if (idClientDelete !== idClient) {
    throw new AppError("You dont have permission", 403);
  }
  const client = await clientRepository.findOneBy({ id: idClientDelete });
  client.isActive = false;
  await clientRepository.save(client);
};

export default deleteClientService;
