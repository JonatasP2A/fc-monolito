import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import ProductGateway from "../../gateway/product.gateway"
import { AddProductInputDto, AddProductOutputDto } from "./add-product.usecase.dto"

export default class AddProductUseCase {
  constructor(private productRepository: ProductGateway) {}

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    }

    const product = new Product(props)
    
    this.productRepository.add(product)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}