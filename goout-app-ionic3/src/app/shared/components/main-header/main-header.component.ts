import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  templateUrl: 'main-header.html',
  selector: 'main-header'
})

export class MainHeaderComponent implements OnInit {

  @Output() public event = new EventEmitter<string>();

  constructor(){

  }

  ngOnInit(){

  }

  pressButton(btn: string){
    this.event.emit(btn)
  }


}
