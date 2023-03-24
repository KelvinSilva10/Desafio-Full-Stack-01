import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { Client } from "../../../entities/client.entity";
import AppDataSource from "../../../data-source";
import {
  mockedInvalidClientRequest,
  mockedValidClientRequest,
} from "../mocks/integration/client.mock";

describe("Create client service tests", () => {
  let connection: DataSource;
  const baseUrl: string = "/clients";
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  beforeEach(async () => {
    const clients = await clientRepo.find();
    await clientRepo.remove(clients);
  });

  afterAll(async () => {
    await connection.destroy;
  });

  it("Should be able to create client", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedValidClientRequest);

    const expectedResults = {
      status: 201,
    };
    expect(response.status).toBe(expectedResults.status);

    // expect(response.body).toEqual(
    //   expect.objectContaining({
    //     id: expect.any(String),
    //     name: expect.any(String),
    //     firstEmail: expect.any(String),
    //     secondaryEmail: expect.any(String || null),
    //     mainPhone: expect.any(String),
    //     secondaryPhone: expect.any(String || null),
    //     createdAt: expect.any(String),
    //     updatedAt: expect.any(String),
    //     isActive: expect.any(Boolean),
    //   })
    // );

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("firstEmail");
    expect(response.body).toHaveProperty("secondaryEmail");
    expect(response.body).toHaveProperty("mainPhone");
    expect(response.body).toHaveProperty("secondaryPhone");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");

    expect(response.body).not.toHaveProperty("password");

    expect(response.body.name).toEqual("Kelvin Oliveira Silva");
    expect(response.body.firstEmail).toEqual("teste@mail.com");
    expect(response.body.mainPhone).toEqual("(31) 92234-5559");
    expect(response.body.secondaryPhone).toEqual(null);
    expect(response.body.isActive).toEqual(true);

    const [client, amount] = await clientRepo.findAndCount();
    expect(amount).toBe(1);
  });

  it("Should not be able to create a client with invalid request body", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedInvalidClientRequest);

    const expectedResults = {
      status: 400,
    };

    expect(response.status).toBe(expectedResults.status);
    // expect(response.body.error).toEqual(
    //   expect.objectContaining({
    //     error: expect.arrayContaining([
    //       "name is a required field",
    //       // "password is a required field",
    //       "Invalid phone number",
    //     ]),
    //   })
    // );
    expect(response.body.error).toEqual(
      expect.arrayContaining([
        "name is a required field",
        "Invalid phone number",
      ])
    );

    const [client, amount] = await clientRepo.findAndCount();
    expect(amount).toBe(0);
  });

  it("Should not be able to create a client that already exists", async () => {
    const clientTest = clientRepo.create(mockedValidClientRequest);
    await clientRepo.save(clientTest);

    const response = await request(app)
      .post(baseUrl)
      .send(mockedValidClientRequest);

    const expectedResults = {
      status: 409,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({ message: "This email already exists" })
    );

    const [client, amount] = await clientRepo.findAndCount();
    expect(amount).toBe(1);
  });
});
