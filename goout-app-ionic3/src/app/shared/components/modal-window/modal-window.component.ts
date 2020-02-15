import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  templateUrl: 'modal-window.html',
  selector: 'modal-window'
})

export class ModalWindowComponent implements OnInit {
  @Output() closeModalStatus = new EventEmitter;

    constructor(){

  }

  ngOnInit(){

  }


  closeModal(event){
    let className = event.target.className;
    let isModalClass = className.indexOf('modal') !== -1;
    let isConfirmClass = className.indexOf('button-confirm') !== -1;

    if (isModalClass){
      this.closeModalStatus.emit(false);
    } else if (isConfirmClass){
      this.closeModalStatus.emit(true);
    }
  }




}
