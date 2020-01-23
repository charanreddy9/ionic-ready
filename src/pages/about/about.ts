import { Component } from '@angular/core';
import { NavController,ToastController,ModalController,NavParams } from 'ionic-angular';
import { InsertServiceProvider } from '../../providers/insert-service/insert-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
result:any;mapElement: any;lat: any;long: any;editArray: Array <any> = []; google:any;profile:any; map: any;edituser:any= {};
  mapInitialised: boolean = false;records:any;user:any;recordid:any;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public toastCtrl:ToastController,
              public geolocation: Geolocation,public insertServiceProvider:InsertServiceProvider,public sanitizer: DomSanitizer)
     {
         this.getrecords();
     }
  
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: this.google.maps.MapTypeId.ROADMAP
        }
        this.map = new this.google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
      });
 
    });
 
  }

  getrecords(){
   
    this.insertServiceProvider.getrecords()
    .subscribe(
      data =>{
        this.result=data;
       // console.log(this.result);
      }
    )
  }
  
   editdata(id) {
   
    this.insertServiceProvider.getRecordsbyid(id)
      .subscribe(
        res => {
        let recordid = res; 
        console.log(recordid);
   let profileModal = this.modalCtrl.create(edit,recordid);  
   profileModal.present();

      },
      errors => {
        this.recordid = errors;
      }) 
      
   }
  deleterecord(id){
     this.insertServiceProvider.deleteRecords(id)
      .subscribe(
        results => {
        this.records = results;
        this.navCtrl.setRoot(AboutPage);
       this.toastCtrl.create({
          message: `Record Deleted successfully`,
          duration: 3000,
          position: 'top',
          cssClass: "adhoctoast",
        }).present();    
      },
      errors => {
        this.records = errors;
      }) 
  }
 
}
@Component({
  selector: 'edit',
  templateUrl: 'edit.html'
})
export class edit {
  records:any;
  id: string = this.navParams.get('id');
  username: string = this.navParams.get('username');
  mobile: string = this.navParams.get('mobile');
  email:string=this.navParams.get('email');

 constructor(public insertServiceProvider:InsertServiceProvider,public navCtrl: NavController,private navParams: NavParams) {

 }
 editUser(editrecord: NgForm,id){  
      const username = editrecord.value.username;
      const mobile =editrecord.value.mobile;
      const email =editrecord.value.email;
      this.insertServiceProvider.updateRecords(id,username,mobile,email)
      .subscribe(
        results => {
        this.records = results; 
        this.navCtrl.setRoot(AboutPage);
      },
      errors => {
        this.records = errors;
      }) 
  }
}