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
      address: "123 Main St",
    })

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: client.id.id } });

    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.address).toBe(client.address);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  })

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      address: "123 Main St",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toBe(client.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });    
})