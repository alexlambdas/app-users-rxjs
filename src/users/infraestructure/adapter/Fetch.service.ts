import { fnUserSchemaValidation } from "../../domain/schemas/User.schema";
import { FetchPropertiesType } from "../../domain/types/FetchProperties.type";
import { FetchResponseType } from "../../domain/types/FetchResponse.type";

export class FetchService{

  constructor(){}

  async get(fetchProperties: FetchPropertiesType): Promise<FetchResponseType>{

    try{

      const {url,properties} = fetchProperties;
      const response = await fetch(url,properties);

      const fetchResponse: FetchResponseType = {
        ok: response.ok,
        statusCode: response.status,
        statusText: response.statusText,
        data: await response.json()
      };

      if(!response.ok){
        throw(fetchResponse);
      }

      if(fetchResponse.data.length === 0){
        throw('No data');
      }

      if(fnUserSchemaValidation(fetchResponse.data[0])){
        throw('User Validation Error');
      }

      return fetchResponse;
    }
    catch(err: FetchResponseType | any){

      let fetchResponse: FetchResponseType;

      if(typeof err === 'object' && err.response.ok !== undefined){
        fetchResponse = err;
        return fetchResponse;
      }

      fetchResponse = {
        ok: false,
        statusCode: 500,
        statusText: 'Internal Server Error',
        data: String(err)
      };

      return fetchResponse;
    }
  }
}