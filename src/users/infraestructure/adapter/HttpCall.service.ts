import { ConfigAppService } from "../../application/ConfigApp.service";
import { FetchPropertiesType } from "../../domain/types/FetchProperties.type";
import { FetchResponseType } from "../../domain/types/FetchResponse.type";
import { UserRepository } from "../port/datasource/User.repository";
import { FetchService } from "./Fetch.service";

export class HttpCallService implements UserRepository{

  constructor(
    private readonly configAppService: ConfigAppService,
    private readonly fetchService: FetchService){}
  
  async getById(id: number): Promise<FetchResponseType> {

    const url: string = this.configAppService.getUrlBackend()+`?id=${id}`;

    const fetchProperties: FetchPropertiesType = {
      url: url,
      properties: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };

    return await this.fetchService.get(fetchProperties);
    
  }
  
}