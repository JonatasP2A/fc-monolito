import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUsecase implements UseCaseInterface {
  constructor(private clientRepository: ClientGateway) {}
  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this.clientRepository.find(input.id);
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
  
}