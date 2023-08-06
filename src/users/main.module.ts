import { ApplicationService } from "./application/Application.service";
import { ConfigAppService } from "./application/ConfigApp.service";
import { FetchService } from "./infraestructure/adapter/Fetch.service";
import { HttpCallService } from "./infraestructure/adapter/HttpCall.service";
import { UserRepository } from "./infraestructure/port/datasource/User.repository";
import { fromEvent, map } from 'rxjs';

function main(){

  //
  const configAppService: ConfigAppService = new ConfigAppService();
  const fetchService: FetchService = new FetchService();
  
  //
  const httpCallService: HttpCallService = new HttpCallService(
    configAppService,
    fetchService,
  );

  //
  const userRepository: UserRepository = httpCallService;

  const applicationService: ApplicationService = new ApplicationService(
    userRepository,
  );

  const $buttonUserA = document.getElementById('idButtonUserA');
  const clickButtonUserA$ = fromEvent($buttonUserA!,'click');

  clickButtonUserA$
    .pipe(
      map(async event => {
        return await applicationService.getById(1);
      })
    )
    .subscribe({
      next: async response$ => {
        console.log(await response$);
      }
    })


}

main();