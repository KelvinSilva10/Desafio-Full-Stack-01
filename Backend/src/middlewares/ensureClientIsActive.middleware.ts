import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors/AppError";

const ensureClientIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepo = AppDataSource.getRepository(Client);
  const findClient = await clientRepo.findOneBy({ id: req.params.id });

  if (findClient.isActive === false) {
    throw new AppError("Client is not active", 404);
  }

  next();
};

export default ensureClientIsActiveMiddleware;
