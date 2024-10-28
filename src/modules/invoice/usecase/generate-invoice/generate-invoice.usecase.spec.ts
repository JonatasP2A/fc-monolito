import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../value-object/address";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.usecase.dto";

const invoice = new Invoice({
  id: new Id(),
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
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe('GenerateInvoiceUsecase unit test', () => {
  it('should generate an invoice', async () => {
    const repository = MockRepository()
    const usecase = new GenerateInvoiceUsecase(repository)
    const input: GenerateInvoiceUseCaseInputDto = {
      name: 'John Doe',
      document: '12345678900',
      street: 'Central Park',
      number: '10',
      complement: 'Near the park',
      city: 'New York',
      state: 'NY',
      zipCode: '12345678',
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 100
        },
        {
          id: '2',
          name: 'Product 2',
          price: 50
        }
      ]
    }
    const invoice = await usecase.execute(input)

    expect(repository.generate).toBeCalledTimes(1)
    expect(invoice.id).toBeDefined()
    expect(invoice.name).toBe('John Doe')
    expect(invoice.document).toBe('12345678900')
    expect(invoice.city).toBe('New York')
    expect(invoice.complement).toBe('Near the park')
    expect(invoice.number).toBe('10')
    expect(invoice.state).toBe('NY')
    expect(invoice.street).toBe('Central Park')
    expect(invoice.zipCode).toBe('12345678')
    expect(invoice.items).toHaveLength(2)
    expect(invoice.items[0].id).toBe('1')
    expect(invoice.items[0].name).toBe('Product 1')
    expect(invoice.items[0].price).toBe(100)
    expect(invoice.items[1].id).toBe('2')
    expect(invoice.items[1].name).toBe('Product 2')
    expect(invoice.items[1].price).toBe(50)
    expect(invoice.total).toBe(150)
  })
})