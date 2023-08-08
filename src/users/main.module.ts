import { ApplicationService } from "./application/Application.service";
import { ConfigAppService } from "./application/ConfigApp.service";
import { FetchService } from "./infraestructure/adapter/Fetch.service";
import { HttpCallService } from "./infraestructure/adapter/HttpCall.service";
import { UserRepository } from "./infraestructure/port/datasource/User.repository";
import { fromEvent, map } from 'rxjs';
import { UserCardComponent } from "./infraestructure/port/view/components/userCard/UserCard.component";
import { UserType } from "./domain/types/User.type";

async function main(){

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

  // init
  const response = await applicationService.getById(1);
  if(typeof response.data[0] === 'string'){

  }
  else{
    
    const userData: UserType = response.data[0];
    const userCardComponent = new UserCardComponent(userData);
    const $newUserCardComponent = userCardComponent.build('buttonA');
    const $oldUserCardComponent = document.getElementById('idUserData');

    $oldUserCardComponent?.parentNode?.replaceChild($newUserCardComponent,$oldUserCardComponent);    

  }
  

  // observables and observers
  const $buttonUserA = document.getElementById('idButtonUserA');
  const clickButtonUserA$ = fromEvent($buttonUserA!,'click');

  const $buttonUserB = document.getElementById('idButtonUserB');
  const clickButtonUserB$ = fromEvent($buttonUserB!,'click');

  clickButtonUserA$
    .pipe(
      map(async event => {
        return await applicationService.getById(1);
      })
    )
    .subscribe({
      next: async response$ => {

        const response = await response$;
        const userData: UserType = response.data[0] as UserType;
        const userCardComponent = new UserCardComponent(userData);
        const $newUserCardComponent = userCardComponent.build('buttonA');
        const $oldUserCardComponent = document.getElementById('idUserData');

        $oldUserCardComponent?.parentNode?.replaceChild($newUserCardComponent,$oldUserCardComponent);
      }
    })

  clickButtonUserB$
    .pipe(
      map(async event => {
        return await applicationService.getById(2);
      })
    )
    .subscribe({
      next: async response$ => {

        const response = await response$;
        const userData: UserType = response.data[0] as UserType;
        const userCardComponent = new UserCardComponent(userData);
        const $newUserCardComponent = userCardComponent.build('buttonB');
        const $oldUserCardComponent = document.getElementById('idUserData');

        $oldUserCardComponent?.parentNode?.replaceChild($newUserCardComponent,$oldUserCardComponent);
      }
    })


}

main();