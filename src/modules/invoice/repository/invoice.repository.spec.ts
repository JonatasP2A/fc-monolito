import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import InvoiceRepository from "./invoice.repository";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";

const invoiceId = new Id("1");

const address = new Address({
  street: "123 Main St",
  number: "123",
  complement: "Apt 123",
  city: "Springfield",
  state: "IL",
  zipCode: "12345",
})

const items = [
  new InvoiceItem({
    invoice_id: invoiceId.id,
    name: "Product 1",
    price: 100,
  }),
  new InvoiceItem({
    invoice_id: invoiceId.id,
    name: "Product 2",
    price: 50,
  }),
];

const invoice = new Invoice({
  id: invoiceId,
  name: "John Doe",
  document: "123.456.789-00",
  address,
  items,
});

describe("Invoice Repository test", () => {
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

  it("should generate an invoice", async () => {
    const repository = new InvoiceRepository();

    await repository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: ["items"],
    });

    expect(invoiceDb.id).toBe(invoice.id.id);
    expect(invoiceDb.name).toBe(invoice.name);
    expect(invoiceDb.document).toBe(invoice.document);
    expect(invoiceDb.street).toBe(invoice.address.street);
    expect(invoiceDb.number).toBe(invoice.address.number);
    expect(invoiceDb.complement).toBe(invoice.address.complement);
    expect(invoiceDb.city).toBe(invoice.address.city);
    expect(invoiceDb.state).toBe(invoice.address.state);
    expect(invoiceDb.zipCode).toBe(invoice.address.zipCode);
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt);
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt);
    expect(invoiceDb.items.length).toBe(2);
    expect(invoiceDb.items[0].name).toBe(items[0].name);
    expect(invoiceDb.items[0].price).toBe(items[0].price);
    expect(invoiceDb.items[1].name).toBe(items[1].name);
    expect(invoiceDb.items[1].price).toBe(items[1].price);
  })

  it("should find an invoice", async () => {

    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const result = await repository.find("1");

    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.createdAt).toStrictEqual(invoice.createdAt);
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
    expect(result.items.length).toBe(2);
    expect(result.items[0].name).toBe("Product 1");
    expect(result.items[0].price).toBe(100);
    expect(result.items[1].name).toBe("Product 2");
    expect(result.items[1].price).toBe(50);
  })
})