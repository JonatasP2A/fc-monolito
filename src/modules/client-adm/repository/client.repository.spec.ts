import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "123456789",
      street: "Main St",
      number: "123",
      complement: "Apt 1",
      city: "Springfield",
      state: "NY",
      zipCode: "12345-678",
    })

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: client.id.id } });

    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.document).toBe(client.document);
    expect(clientDb.street).toBe(client.street);
    expect(clientDb.number).toBe(client.number);
    expect(clientDb.complement).toBe(client.complement);
    expect(clientDb.city).toBe(client.city);
    expect(clientDb.state).toBe(client.state);
    expect(clientDb.zipCode).toBe(client.zipCode);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  })

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "123456789",
      street: "Main St",
      number: "123",
      complement: "Apt 1",
      city: "Springfield",
      state: "NY",
      zipCode: "12345-678",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toBe(client.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.document).toBe(client.document);
    expect(result.street).toBe(client.street);
    expect(result.number).toBe(client.number);
    expect(result.complement).toBe(client.complement);
    expect(result.city).toBe(client.city);
    expect(result.state).toBe(client.state);
    expect(result.zipCode).toBe(client.zipCode);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });    
})