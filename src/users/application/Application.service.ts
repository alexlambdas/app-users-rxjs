import { FetchResponseType } from "../domain/types/FetchResponse.type";
import { UserRepository } from "../infraestructure/port/datasource/User.repository";

export class ApplicationService{

  constructor(private readonly userRepository: UserRepository){}

  async getById(id: number): Promise<FetchResponseType>{
    return await this.userRepository.getById(id);
  }
}