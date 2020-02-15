import {Component, OnInit} from "@angular/core";
import {Events} from "ionic-angular";
import {SelectComponent} from "../select/select.component";

@Component({
  templateUrl: 'input-select.html',
  selector: 'input-select'
})

export class InputSelectComponent implements OnInit {

  public selectedText: any;

  constructor(public events: Events,
              public parent: SelectComponent) {

  }

  ngOnInit() {
    this.textInitialize();
  }

  textInitialize() {
    this.parent.messageSource.subscribe((text: string) => {
      this.selectedText = text;
    })
  }

}
