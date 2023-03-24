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

  const client = await clientRepository
    .createQueryBuilder("client")
    .where("client.firstEmail = :email", { email: req.body.firstEmail })
    .orWhere("client.mainPhone = :phone", { phone: req.body.mainPhone })
    .getOne();

  if (client) {
    if (client.firstEmail === req.body.firstEmail) {
      throw new AppError("This email already exists", 409);
    } else if (client.mainPhone === req.body.mainPhone) {
      throw new AppError("This phone number already exists", 409);
    }
  }

  next();
};

export default ensureClientAlreadyExistsMiddleware;
