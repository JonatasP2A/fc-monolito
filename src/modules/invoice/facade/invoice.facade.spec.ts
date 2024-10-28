import { Sequelize } from "sequelize-typescript";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacade from "./invoice.facade";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceRepository from "../repository/invoice.repository";

describe('InvoiceFacade test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a new invoice", async () => {
    const repository = new InvoiceRepository();
    const generateUsecase = new GenerateInvoiceUsecase(repository);
    const findUsecase = new FindInvoiceUsecase(repository);

    const facade = new InvoiceFacade({
      generateUsecase,
      findUsecase
    });

    const input = {
      name: "John Doe",
      document: "12345678900",
      street: "Main Street",
      number: "123",
      complement: "Apartment 101",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100
        },
        {
          id: "2",
          name: "Product 2",
          price: 200
        }
      ]
    }

    const invoice = await facade.generate(input);

    expect(invoice).toBeDefined();
    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.zipCode).toBe(input.zipCode);
    expect(invoice.items).toHaveLength(2);
    expect(invoice.total).toBe(300);
  })

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "John Doe",
      document: "12345678900",
      street: "Main Street",
      number: "123",
      complement: "Apartment 101",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100
        },
        {
          id: "2",
          name: "Product 2",
          price: 200
        }
      ]
    }

    const createdInvoice = await facade.generate(input);

    const invoice = await facade.find({ id: createdInvoice.id });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.address.street).toBe(input.street);
    expect(invoice.address.number).toBe(input.number);
    expect(invoice.address.complement).toBe(input.complement);
    expect(invoice.address.city).toBe(input.city);
    expect(invoice.address.state).toBe(input.state);
    expect(invoice.address.zipCode).toBe(input.zipCode);
    expect(invoice.items).toHaveLength(2);
    expect(invoice.total).toBe(300);
    expect(invoice.items[0].id).toBe(input.items[0].id);
    expect(invoice.items[0].name).toBe(input.items[0].name);
    expect(invoice.items[0].price).toBe(input.items[0].price);
    expect(invoice.items[1].id).toBe(input.items[1].id);
    expect(invoice.items[1].name).toBe(input.items[1].name);
    expect(invoice.items[1].price).toBe(input.items[1].price);
  })
})