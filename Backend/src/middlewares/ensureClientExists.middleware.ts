import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import validate from "uuid-validate";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors/AppError";

const ensureClientExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validate(req.params.id)) {
    throw new AppError("Client not exist", 404);
  }

  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    id: req.params.id,
  });

  if (!findClient) {
    throw new AppError("Client not exist", 404);
  }

  next();
};

export default ensureClientExistsMiddleware;
