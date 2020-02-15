import {Component, Input, OnInit} from "@angular/core";
import {Events} from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  templateUrl: 'select.html',
  selector: 'select-component'
})

export class SelectComponent implements OnInit {

  public textArr: string[];

  @Input() public showPopover: boolean;

  messageSource: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public events: Events) {

  }

  ngOnInit() {
    this.listInitialize();
  }

  listInitialize() {
    this.textArr = [
      'some',
      'text',
      'one',
      'two',
      'three',
      'four'
    ]
  }

  openPopover(e: any) {
    this.showPopover = !this.showPopover;
  }

  closePopover(e: boolean) {
    this.showPopover = e;
  }

}
