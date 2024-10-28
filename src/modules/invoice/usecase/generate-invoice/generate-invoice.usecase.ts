import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Address from "../../value-object/address";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice_id = new Id()
    const address = new Address({
      city: input.city,
      complement: input.complement,
      number: input.number,
      state: input.state,
      street: input.street,
      zipCode: input.zipCode,
    })
    const items = input.items.map(item => new InvoiceItem({
      id: new Id(item.id),
      invoice_id: invoice_id.id,
      name: item.name,
      price: item.price,
    }))
    const invoice = new Invoice({
      id: invoice_id,
      name: input.name,
      document: input.document,
      address,
      items,
    })

    try {
      await this.invoiceRepository.generate(invoice);
      return {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map(item => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        total: invoice.total,
      }
    } catch (error) {
      throw new Error("Error generating invoice");
    }
  }
  
}