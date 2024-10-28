import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface InvoiceFacadeProps {
  generateUsecase: UseCaseInterface;
  findUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateUsecase: UseCaseInterface;
  private _findUsecase: UseCaseInterface;
  constructor(props: InvoiceFacadeProps) {
    this._generateUsecase = props.generateUsecase;
    this._findUsecase = props.findUsecase;
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUsecase.execute(input);
  }

  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateUsecase.execute(input);
  }
}