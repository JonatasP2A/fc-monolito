import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUsecase from "./find-client.usecase"

const client = new Client({
  id: new Id('1'),
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  document: "123456789",
  street: "Main St",
  number: "123",
  complement: "Apt 1",
  city: "Springfield",
  state: "NY",
  zipCode: "12345-678",
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client))
  }
}

describe("FindClientUsecase unit test", () => {
  it("should find a client", async () => {
    const repository = MockRepository()
    const usecase = new FindClientUsecase(repository)
    const input = {
      id: "1"
    }

    const result = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toBe(client.id.id)
    expect(result.name).toBe(client.name)
    expect(result.email).toBe(client.email)
    expect(result.document).toBe(client.document);
    expect(result.street).toBe(client.street);
    expect(result.number).toBe(client.number);
    expect(result.complement).toBe(client.complement);
    expect(result.city).toBe(client.city);
    expect(result.state).toBe(client.state);
    expect(result.zipCode).toBe(client.zipCode);
  })
})