import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";

const getClientService = async (idclient: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      id: idclient,
    },
  });

  const { password, ...clientNotPassWord } = client;

  return clientNotPassWord;
};

export default getClientService;
