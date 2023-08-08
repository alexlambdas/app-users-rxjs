import { ObjectEntryType, PropertyEntryType } from "../../../../../domain/types/Common.type";
import { UserType } from "../../../../../domain/types/User.type";

export class UserCardComponent{

  private userData: ObjectEntryType;

  constructor(userData: UserType){
    const userEntry = Object.entries(userData);
    this.userData = userEntry.filter(prop => typeof prop[1] !== 'object') as ObjectEntryType;
  }

  build(clickType: string): HTMLElement{
    return this.createASingleCard(this.userData, clickType);
  }

  private createASingleCard(userData: ObjectEntryType, clickType: string): HTMLElement{

    const $newSection: HTMLElement = document.createElement('section');
    $newSection.setAttribute('id','idUserData');

    const $divCard: HTMLDivElement = document.createElement('div');
    $divCard.setAttribute('class','userCard');

    userData.map( property => {

      const $divRow: HTMLDivElement = this.createASingleRow(property);
      const $hrRow: HTMLHRElement = document.createElement('hr');

      $hrRow.setAttribute('class','userCardLineDivisor');
      $divCard.appendChild($divRow);
      $divCard.appendChild($hrRow);
    });

    if(clickType === 'buttonA') $divCard.classList.add('bgPinkColor');
    else $divCard.classList.add('bgPurpleColor');

    $newSection.appendChild($divCard);
    return $newSection;

  }
  
  private createASingleRow(property: PropertyEntryType): HTMLDivElement{

    const $divRow: HTMLDivElement = document.createElement('div');
    const $textKey: Text = document.createTextNode(property[0]);
    const $textValue: Text = document.createTextNode(property[1].toString());
    const $spanKey: HTMLSpanElement = document.createElement('span');
    const $spanValue: HTMLSpanElement = document.createElement('span');

    $spanKey.appendChild($textKey);
    $spanValue.appendChild($textValue);
    $divRow.appendChild($spanKey);
    $divRow.appendChild($spanValue);

    return $divRow;
  }
}