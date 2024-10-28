import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
})

describe("Add Product Usecase unit test", () => {
  it("should add a product", async () => {
    // repositorio
    const productRepository = MockRepository();
    // usecase
    const usecase = new AddProductUseCase(productRepository);
    // input
    const input = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 10,
      stock: 10,
    }
    // output
    const output = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.purchasePrice).toBe(input.purchasePrice);
    expect(output.stock).toBe(input.stock);
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  });
});