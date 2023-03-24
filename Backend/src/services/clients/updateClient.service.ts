import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/AppError";
import { IClientUpdateRequest } from "../../interfaces/clients";
import { clientWithoutPasswordSerializer } from "../../serializers/client.schemas";

const updateClientService = async (
  clientIdParams: string,
  clientData: IClientUpdateRequest,
  clientId: string
) => {
  const clientRepository = AppDataSource.getRepository(Client);
  if (clientId !== clientIdParams) {
    throw new AppError("You do not have permission to change other user", 403);
  }
  const findClient = await clientRepository.findOneBy({
    id: clientIdParams,
  });

  const updateClient = clientRepository.create({
    ...findClient,
    ...clientData,
  });
  await clientRepository.save(updateClient);
  const updatedClientWithoutPassword =
    await clientWithoutPasswordSerializer.validate(updateClient, {
      stripUnknown: true,
    });
  return updatedClientWithoutPassword;
};

export default updateClientService;
