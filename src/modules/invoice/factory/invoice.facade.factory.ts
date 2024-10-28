import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUsecase = new FindInvoiceUsecase(repository);
    const generateUsecase = new GenerateInvoiceUsecase(repository);
    const facade = new InvoiceFacade({
      generateUsecase,
      findUsecase
    });
    return facade;
  }
}