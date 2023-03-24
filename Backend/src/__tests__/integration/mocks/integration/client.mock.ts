import { IClientRequest } from "../../../../interfaces/clients";

const mockedValidClientRequest: IClientRequest = {
  name: "Kelvin Oliveira Silva",
  firstEmail: "teste@mail.com",
  mainPhone: "(31) 92234-5559",
  password: "1234",
};

const mockedInvalidClientRequest: Omit<IClientRequest, "name"> = {
  firstEmail: "jane.doe@example.com",
  mainPhone: "5551987654321",
  password: "MySecretPassword123",
};

export { mockedValidClientRequest, mockedInvalidClientRequest };
