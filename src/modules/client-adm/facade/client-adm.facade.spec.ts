import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "./client-adm.facade.interface";

describe("Client Adm Facade test", () => {
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
    const repository = new ClientRepository();
    const addUsecase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase,
      findUsecase: undefined
    });

    const input: AddClientFacadeInputDto = {
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
    }

    await facade.add(input);
    
    const client = await ClientModel.findOne({ where: { id: input.id } });

    expect(client).toBeDefined();
    expect(client?.name).toBe(input.name);
    expect(client?.email).toBe(input.email);
    expect(client?.document).toBe(input.document);
    expect(client?.street).toBe(input.street);
    expect(client?.number).toBe(input.number);
    expect(client?.complement).toBe(input.complement);
    expect(client?.city).toBe(input.city);
    expect(client?.state).toBe(input.state);
    expect(client?.zipCode).toBe(input.zipCode);
  })

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input: AddClientFacadeInputDto = {
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
    }

    await facade.add(input);

    const client = await facade.find({ id: input.id });

    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.document).toBe(input.document);
    expect(client.street).toBe(input.street);
    expect(client.number).toBe(input.number);
    expect(client.complement).toBe(input.complement);
    expect(client.city).toBe(input.city);
    expect(client.state).toBe(input.state);
    expect(client.zipCode).toBe(input.zipCode);
  })
});