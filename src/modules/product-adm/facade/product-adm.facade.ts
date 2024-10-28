import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface
  private _checkStockUseCase: UseCaseInterface

  constructor(usecaseProps: UseCaseProps) {
    this._addUseCase = usecaseProps.addUseCase;
    this._checkStockUseCase = usecaseProps.stockUseCase;
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for != do dto da facade, é necessário fazer a conversão
    return this._addUseCase.execute(input);
  }

  async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input);
  }
} 