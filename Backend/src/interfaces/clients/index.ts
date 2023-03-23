export interface IClientRequest {
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  password: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClientLogin {
  email: string;
  password: string;
}
