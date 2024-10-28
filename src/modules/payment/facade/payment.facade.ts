import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentInterface: UseCaseInterface) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this.processPaymentInterface.execute(input);
  }
  
}