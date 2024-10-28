import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import Address from "../value-object/address";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoiceModel = await InvoiceModel.findOne({
      where: { id },
      include: 'items'
    });

    if (!invoiceModel) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      address: new Address({
        street: invoiceModel.street,
        number: invoiceModel.number,
        complement: invoiceModel.complement,
        city: invoiceModel.city,
        state: invoiceModel.state,
        zipCode: invoiceModel.zipCode,
      }),
      items: invoiceModel.items.map(item => new InvoiceItem({
        id: new Id(item.id),
        invoice_id: item.invoice_id,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoiceModel.createdAt,
      updatedAt: invoiceModel.updatedAt,
    });
  }
  async generate(invoice: Invoice): Promise<void> {
    const items = invoice.items.map(item => ({
      id: item.id.id,
      invoice_id: item.invoice_id,
      name: item.name,
      price: item.price,
    }))
    
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }, {
      include: [{ model: InvoiceItemModel }],
    });
  }
}