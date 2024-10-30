import AddClientUseCase from "./add-client.usecase"
import { AddClientInputDto } from "./add-client.usecase.dto"

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('AddClientUsecase unit test', () => {
  it("should add a client", async () => {
    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)
    const input: AddClientInputDto = {
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

    const result = await usecase.execute(input)

    expect(repository.add).toBeCalledTimes(1)
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
  })
})