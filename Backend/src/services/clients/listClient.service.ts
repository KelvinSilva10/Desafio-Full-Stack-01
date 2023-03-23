import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientResponse } from "../../interfaces/clients";

const listClientsService = async () => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.find({
    where: {
      isActive: true,
    },
  });

  const clientsNotPassword = clients.map((client) => {
    const { password, ...notPassWord } = client;
    return notPassWord;
  });

  return clientsNotPassword;
};

export default listClientsService;

// : Promise<IClientResponse[]>
