import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";

import { Client } from "../entities/client.entity";
import { AppError } from "../errors/AppError";

const ensureClientAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    firstEmail: req.body.firstEmail,
  });

  if (client) {
    throw new AppError("This email already exists", 409);
  }

  next();
};

export default ensureClientAlreadyExistsMiddleware;
