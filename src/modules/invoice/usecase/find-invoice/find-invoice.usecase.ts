import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}
  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        city: invoice.address.city,
        complement: invoice.address.complement,
        number: invoice.address.number,
        state: invoice.address.state,
        street: invoice.address.street,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
      createdAt: invoice.createdAt,
    }
  }
  
}