import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../value-object/address";
import FindInvoiceUsecase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id('1'),
  name: 'John Doe',
  document: '12345678900',
  address: new Address({
    city: 'New York',
    complement: 'Near the park',
    number: '10',
    state: 'NY',
    street: 'Central Park',
    zipCode: '12345678'
  }),
  items: [
    new InvoiceItem({
      id: new Id('1'),
      invoice_id: '1',
      name: 'Product 1',
      price: 100
    }),
    new InvoiceItem({
      id: new Id('2'),
      invoice_id: '1',
      name: 'Product 2',
      price: 50
    }),
  ],
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn()
  }
}

describe('FindInvoiceUseCase unit test', () => {
  it('should find an invoice', async () => {
    const repository = MockRepository()
    const findInvoiceUseCase = new FindInvoiceUsecase(repository)
    const invoice = await findInvoiceUseCase.execute({ id: '1' })

    expect(repository.find).toBeCalledTimes(1)
    expect(invoice.id).toBe('1')
    expect(invoice.name).toBe('John Doe')
    expect(invoice.document).toBe('12345678900')
    expect(invoice.address.city).toBe('New York')
    expect(invoice.address.complement).toBe('Near the park')
    expect(invoice.address.number).toBe('10')
    expect(invoice.address.state).toBe('NY')
    expect(invoice.address.street).toBe('Central Park')
    expect(invoice.address.zipCode).toBe('12345678')
    expect(invoice.items[0].id).toBe('1')
    expect(invoice.items[0].name).toBe('Product 1')
    expect(invoice.items[0].price).toBe(100)
    expect(invoice.items[1].id).toBe('2')
    expect(invoice.items[1].name).toBe('Product 2')
    expect(invoice.items[1].price).toBe(50)
    expect(invoice.total).toBe(150)
  })
})