import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUsecase from "./find-product.usecase";

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
})

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
  }
}

describe('FindProductUsecase unit test', () => {
  it("should return a product", async () => {
    const productRepository = MockRepository();
    const findProductUsecase = new FindProductUsecase(productRepository);

    const input = { id: '1' };
    const output = await findProductUsecase.execute(input);

    expect(productRepository.find).toHaveBeenCalled();
    expect(output.id).toBe('1');
    expect(output.name).toBe('Product 1');
    expect(output.description).toBe('Description 1');
    expect(output.salesPrice).toBe(100);
  })
});