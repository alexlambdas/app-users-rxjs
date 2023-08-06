import { URL_BACKEND } from "./Environment.service";

export class ConfigAppService{

  private urlBackend: string;

  constructor(){
    this.urlBackend = URL_BACKEND;
  }

  public getUrlBackend(): string {
    return this.urlBackend;
  } 

  public setUrlBackend(urlBackend: string): void {
      this.urlBackend = urlBackend;
  }
}