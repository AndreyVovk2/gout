import { Component } from '@angular/core';

/**
 * Generated class for the ModalInvateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-invate',
  templateUrl: 'modal-invate.html'
})
export class ModalInvateComponent {

  text: string;

  constructor() {
    console.log('Hello ModalInvateComponent Component');
    this.text = 'Hello World';
  }

}
