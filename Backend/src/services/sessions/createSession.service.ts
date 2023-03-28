import AppDataSource from "../../data-source";
import { ISessionRequest } from "../../interfaces/sessions";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import "dotenv/config";
import { compare } from "bcryptjs";

import { Client } from "../../entities/client.entity";

const createSessionService = async ({
  firstEmail,
  password,
}: ISessionRequest): Promise<object> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    firstEmail: firstEmail,
  });

  if (!client) {
    throw new AppError("Client or password invalid", 403);
  }

  if (client.isActive === false) {
    throw new AppError("Client is not active", 400);
  }

  const passwordMatch = await compare(password, client.password);

  if (!passwordMatch) {
    throw new AppError("Client or password invalid", 403);
  }

  const token = jwt.sign(
    {
      isActive: client.isActive,
    },
    process.env.SECRET_KEY,
    {
      subject: client.id,
      expiresIn: "24h",
    }
  );

  const { password: clientPassword, ...clientWithoutPassword } = client;

  const response = {
    accessToken: token,
    user: clientWithoutPassword,
  };

  return response;
};

export default createSessionService;
