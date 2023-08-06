import { FetchResponseType } from "../../../domain/types/FetchResponse.type";

export interface UserRepository{
  getById(id: number): Promise<FetchResponseType>;
}