import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  templateUrl: 'search-bar.html',
  selector: 'search-bar'
})

export class SearchBarComponent implements OnInit {

  @Output() public settingsSearch = new EventEmitter<boolean>();
  @Output() public postSearch = new EventEmitter<any>();
  @Output() public activeSearch = new EventEmitter<boolean>();
  @Input() public searchPosts: any = [];
  @Input() public serchInFields: any = [];

  public searchField: string = '';

  constructor(){

  }

  ngOnInit(){

  }

  onInput(ev: any){
    console.log(ev);
    console.log(this.searchPosts);
    if(ev.target .value != ''){
      const val = ev.target.value;
      if (val && val.trim() != '') {
        let posts = this.searchPosts.filter((item) => {
          let title = item.business.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
          let line = item.line.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
          let pair = item.creator.name + ' ' + item.creator.lastname;
          let creator = pair.toLowerCase().indexOf(val.toLowerCase()) > -1;
          console.log(creator);
          return title || line || creator;
        });
        this.postSearch.emit(posts);
        this.activeSearch.emit(true);
      }
    }else if(ev.target.value === ''){
      this.postSearch.emit(this.searchPosts);
      this.activeSearch.emit(false);
    }
  }

  search(){
    console.log('search')
  }

  searchWithSettings(){
    this.settingsSearch.emit(true);

  }

}
