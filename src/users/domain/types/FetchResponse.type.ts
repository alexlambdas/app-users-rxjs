import { UserType } from "./User.type";

export type FetchResponseType = {
  ok: boolean;
  statusCode: number;
  statusText: string;
  data: UserType[] | string; 
}