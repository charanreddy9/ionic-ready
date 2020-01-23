import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { InsertServiceProvider } from '../../providers/insert-service/insert-service';
import { Camera } from '@ionic-native/camera';
import { AboutPage } from '../about/about';
import { Geolocation } from '@ionic-native/geolocation';
import { MediaCapture, MediaFile, CaptureError, } from '@ionic-native/media-capture';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 latitu:any;long:any;
 data:any;result:any;location:any;encodeData : string ;encodedData:any={};scanedData:any={};
audio:any;image:any; checked : boolean = true;mynumber:any;mymessage:any;
cricket: any;base64audio:any;marked:false;intrests:false;options:	BarcodeScannerOptions;base64video:any;
  constructor(public navCtrl: NavController,private sms: SMS,private androidFingerprintAuth: AndroidFingerprintAuth,private barcodeScanner: BarcodeScanner,private mediaCapture: MediaCapture, public geolocation: Geolocation,private camera: Camera,public toastCtrl:ToastController,public insertServiceProvider:InsertServiceProvider) {

  }
sendSms(){
  this.sms.send(this.mynumber, this.mymessage);
  
}

finger(){
this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
        .then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
           } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));
}
  scan(){
    this.options={
      prompt:"Scan Your Barcode"
    };
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      this.scanedData=barcodeData.text;
      alert( this.scanedData);
      }).catch(err => {
          console.log('Error', err);
      });
  }
  encodeText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

        console.log(encodedData);
        this.encodedData = encodedData;

    }, (err) => {
        console.log("Error occured : " + err);
    });                 
}
captureAudio(){
this.mediaCapture.captureAudio()
  .then(
    (audiodata: MediaFile[]) => {
      this.base64audio = "data:image/mp3;base64," + audiodata;
      
    },
    (err: CaptureError) => console.error(err)
  )}
  captureVideo(options){
this.mediaCapture.captureVideo()
  .then(
    (videodata: MediaFile[]) => {
      this.base64video = "data:video/mp4;base64," + videodata;
      alert(this.base64video);
    },
    (err: CaptureError) => console.error(err)
  )}
        
changeprofileimg()
  {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
      targetHeight:100,
      targetWidth:100,
      correctOrientation:true
    }).then(imageData => {
      this.image = 'data:image/png;base64,'+imageData;   
     
  });     
  }
locationAt(){
    this.geolocation.getCurrentPosition().then(res=>{
    this.location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
    this.latitu =res.coords.latitude;
    this.long =res.coords.longitude;
    let toast = this.toastCtrl.create({
    message: this.location,
    duration: 3000
    });
    toast.present();
});
}
 postinputs(addinputs:NgForm){
  
    let username = addinputs.value.username;
    let email = addinputs.value.email;
    let password = addinputs.value.password;
    let mobile = addinputs.value.mobile;
    // let intrest = addinputs.value.checked;
    let games = addinputs.value.games;
    let gender = addinputs.value.gender;
    let date = addinputs.value.date;
    let range = addinputs.value.range;
    let textarea = addinputs.value.textarea;
    let uploadimage = this.image;
    let latitude=this.latitu;
    let longitude=this.long;
    let voicerecord = this.base64audio;
    let scaned = this.scanedData;
    let videodata = this.base64video;
    let connection= navigator.onLine;
    if(connection) {
      this.insertServiceProvider.postinputs(username,email,password,mobile,games,gender,date,range,textarea,uploadimage,latitude,
      longitude,voicerecord,scaned,videodata)
      .subscribe(
        results => {
        this.data = results;
        this.toastCtrl.create({
          message: `Data Inserted successfully`,
          duration: 3000,
          position: 'top',
          cssClass: "adhoctoast",
        }).present();
            this.navCtrl.setRoot(AboutPage);
        
      },
      errors => {
        this.data = errors;
      }) 
  }else {
     this.toastCtrl.create({
      message: `please check your connection`,
      duration: 3000,
      position: 'top',
      cssClass: "error-toast",
    }).present();
  }
 }

 /* updateInterests(e:any){
   this.marked=e;
   console.log(this.marked)
   

    // console.log(isChecked);//undefined
  if(obj.value === true) {
      add to array this.intersts
   } else {
      splice array -> remove from array
   }
   
    console.log('Cucumbers new state:' + this.cricket);
  }

}*/

}