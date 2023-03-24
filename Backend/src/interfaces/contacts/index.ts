import { IClientResponse } from "../clients";

export interface IContactRequest {
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
}

export interface IContactResponse {
  id: string;
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  client?: IClientResponse;
}

export interface IContactUpdateRequest {
  name?: string;
  firstEmail?: string;
  secondaryEmail?: string;
  mainPhone?: string;
  secondaryPhone?: string;
}
