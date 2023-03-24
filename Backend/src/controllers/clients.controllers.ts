import { Request, Response } from "express";
import { IClientRequest, IClientUpdateRequest } from "../interfaces/clients";
import createClientService from "../services/clients/createClient.service";
import deleteClientService from "../services/clients/deleteClient.service";
import getClientService from "../services/clients/getClient.service";
import listClientsService from "../services/clients/listClient.service";
import updateClientService from "../services/clients/updateClient.service";

const createClientController = async (req: Request, res: Response) => {
  const clientData: IClientRequest = req.body;
  const newUser = await createClientService(clientData);
  return res.status(201).json(newUser);
};

const listClientsController = async (req: Request, res: Response) => {
  const clients = await listClientsService();

  return res.json(clients);
};

const getClientController = async (req: Request, res: Response) => {
  const idClient = req.params.id;
  const clients = await getClientService(idClient);
  return res.json(clients);
};

const deleteClientController = async (req: Request, res: Response) => {
  const idClientDelete = req.params.id;
  const idClient = String(req.client.id);
  await deleteClientService(idClientDelete, idClient);
  return res.status(204).json({});
};

const updateClientController = async (req: Request, res: Response) => {
  const clientData: IClientUpdateRequest = req.body;
  const clientIdParams = req.params.id;
  const clientId = String(req.client.id);
  const updateClient = await updateClientService(
    clientIdParams,
    clientData,
    clientId
  );
  return res.json(updateClient);
};

export {
  createClientController,
  listClientsController,
  getClientController,
  deleteClientController,
  updateClientController,
};
