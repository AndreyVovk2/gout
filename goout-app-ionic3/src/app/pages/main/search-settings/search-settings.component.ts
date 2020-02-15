import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {NavController} from "ionic-angular";
import {BusinessProvider} from "../../../shared/providers/business.provider";
import {SubBusinessProvider} from "../../../shared/providers/sub-business.provider";
import {Geolocation} from '@ionic-native/geolocation';
import {AgesProvider} from "../../../shared/providers/ages.provider";
import {RegionProvider} from "../../../shared/providers/region.provider";
import {PostProvider} from "../../../shared/providers/post.provider";
import {MainEventComponent} from "../../../shared/components/main-event/main-event.component";
import {MainPage} from "../main";
import {NotificationProvider} from "../../../shared/providers/notification.provider";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: 'search-settings.html',
  selector: 'search-settings'
})

export class SearchSettingsComponent implements OnInit {

  @Output() public exit = new EventEmitter<string>();
  @Output() public searchResult = new EventEmitter<any>();

  public showPopover: boolean = false;
  public distance: number = 1;
  public maleArray: any = [];
  public femaleArray: any = [];
  public regions: any = [];
  public subBusinessCategory: any = [];
  public businessCategory: any = [];
  public filterForCategories: any = [];

  public selectCategory: any;
  public selectSubCategory: any;
  public selectMale: any;
  public selectFemale: any;


  public searchData: any = {};

  public popups: any = {};


  constructor(public navCtrl: NavController,
              public businessProvider: BusinessProvider,
              public subBusinessProvider: SubBusinessProvider,
              public agesProvider: AgesProvider,
              public regionProvider: RegionProvider,
              public postProvider: PostProvider,
              public geolocation: Geolocation,
              public notification: NotificationProvider,
              public translate: TranslateService) {
    this.initializeData();
    this.getBusinessCategory();
    this.getSubBusinessCategory();
    this.getAges();
    this.getLocation();
    this.getRegion();
  }

  ngOnInit() {
  }

  getPopupData(data: any, state: string) {
    switch (state) {
      case 'category':
        this.filterCat(data.id);
        this.selectCategory = data.name;
        this.selectSubCategory = '';
        this.searchData.business_category_id = data.id;
        this.popups.businessCategory = false;
        break;
      case 'subCategory':
        this.selectSubCategory = data.name;
        this.searchData.sub_business_category_id = data.id;
        this.popups.subBusinessCategory = false;
        break;
      case 'maleAge':
        this.selectMale = data.age;
        this.searchData.boy_age_id = data.id;
        this.popups.maleAge = false;
        break;
      case 'femaleAge':
        this.selectFemale = data.age;
        this.searchData.girl_age_id = data.id;
        this.popups.femaleAge = false;
        break;
    }
  }

  initializeData() {
    this.searchData = {
      business_category_id: null,
      sub_business_category_id: null,
      business_region_id: [],
      girl_age_id: null,
      boy_age_id: null,
      distance: null,
      latitude: null,
      longitude: null
    }
  }

  showPopup(state: string, event: any) {
    event.stopPropagation();
    if (this.popups.businessCategory || this.popups.subBusinessCategory || this.popups.maleAge || this.popups.femaleAge) {
      this.popups = {
        businessCategory: false,
        subBusinessCategory: false,
        maleAge: false,
        femaleAge: false
      };
    } else {
      switch (state) {
        case 'businessCategory':
          this.popups.businessCategory = true;
          break;
        case 'subBusinessCategory':
          this.popups.subBusinessCategory = true;
          break;
        case 'maleAge':
          this.popups.maleAge = true;
          break;
        case 'femaleAge':
          this.popups.femaleAge = true;
          break;
      }
    }
  }

  getRegion() {
    this.regionProvider.getAll()
      .subscribe(success => {
        this.regions = success;
        for (let i = 0; i < this.regions.length; i++) {
          this.regions[i].checked = false;
        }
      })
  }

  getLocation() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.searchData.latitude = resp.coords.latitude.toString();
        this.searchData.longitude = resp.coords.longitude.toString();
      })
      .catch((error) => {
      });
  }

  getAges() {
    this.agesProvider.getAges()
      .subscribe(success => {
        let ages = success['data'];
        console.log(ages);
        ages.filter(item => {
          if (item.gender === 'male') {
            this.maleArray.push(item)
          } else {
            this.femaleArray.push(item)
          }
        })
      })
  }

  getBusinessCategory() {
    this.businessProvider.getAll()
      .subscribe(success => {
        this.businessCategory = success;
      });
  }

  getSubBusinessCategory() {
    this.subBusinessProvider.getAll()
      .subscribe(success => {
        this.subBusinessCategory = success;
      }, err => {
      });
  }

  filterCat(event: any) {
    this.filterForCategories = [];
    this.subBusinessCategory.forEach(item => {
      if (item.business_category_id === event) {
        this.filterForCategories.push(item);
      }
    });
  }

  changeCategory() {
    // this.searchData.sub_business_category_id = null;
    // this.searchData.business_category_id = null;
    // if(this.selectCategory != undefined){
    //   this.searchData.business_category_id = +this.selectCategory;
    // }
    // if(this.selectSubCategory != undefined){
    //   this.searchData.sub_business_category_id = +this.selectSubCategory
    // }
    this.searchData.business_region_id = [];
    this.searchData.boy_age_id = +this.searchData.boy_age_id;
    this.searchData.girl_age_id = +this.searchData.girl_age_id;
    this.searchData.distance = this.distance;
    this.searchData.latitude = '45.546566';
    this.searchData.longitude = '57.4656878';
    this.regions.filter(item => {
      if (item.checked) {
        this.searchData.business_region_id.push(item.id);
      }
    })
  }

  searchPosts() {
    this.changeCategory();
    if (this.checkValidSearch(this.searchData)) {
      this.postProvider.filterPosts(this.searchData)
        .subscribe(success => {
          console.log(success);
          if (success['success']) {
            if (success['data'].length !== 0) {
              this.close();
              this.searchResult.emit(success['data']);
            } else this.notification.success(this.translate.instant('errors.search.empty'))
          }
        })
    }
  }

  checkValidSearch(data) {
    if (data.business_region_id.length === 0) {
      this.notification.success(this.translate.instant('errors.search.region'));
      return false;
    } else if (!data.business_category_id) {
      this.notification.success(this.translate.instant('errors.search.business'));
      return false;
    } else if (!data.sub_business_category_id) {
      this.notification.success(this.translate.instant('errors.search.sub_business'));
      return false;
    }
    return true;
  }

  close() {
    this.exit.emit('close')
  }

  closePop() {
    this.popups = {
      businessCategory: false,
      subBusinessCategory: false,
      maleAge: false,
      femaleAge: false
    };
    this.showPopover = false;
    console.log('close')
  }

}
