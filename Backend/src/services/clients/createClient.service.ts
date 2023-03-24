import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientRequest, IClientResponse } from "../../interfaces/clients";
import { clientWithoutPasswordSerializer } from "../../serializers/client.schemas";

const createClientService = async (
  clientData: IClientRequest
): Promise<IClientResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const createdClient = clientRepository.create(clientData);
  await clientRepository.save(createdClient);

  const clientWithoutPassord = await clientWithoutPasswordSerializer.validate(
    createdClient,
    {
      stripUnknown: true,
    }
  );

  return clientWithoutPassord;
};

export default createClientService;
