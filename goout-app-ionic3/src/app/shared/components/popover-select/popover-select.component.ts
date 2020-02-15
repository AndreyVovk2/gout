import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Events} from "ionic-angular";
import {SelectComponent} from "../select/select.component";

@Component({
  templateUrl: 'popover-select.html',
  selector: 'popover-select'
})

export class PopoverSelectComponent implements OnInit {

  @Input() public textArray: any;
  @Output() public showPopover = new EventEmitter<boolean>();

  constructor(public events: Events,
              public parent: SelectComponent) {
  }

  ngOnInit() {
  }

  sendText(text) {
    this.parent.messageSource.next(text);
    this.showPopover.emit(false);
  }

}
