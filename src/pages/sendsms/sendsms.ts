import { Component } from '@angular/core';
import { NavController, NavParams,Platform  } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SMS } from '@ionic-native/sms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
/**
 * Generated class for the SendsmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sendsms',
  templateUrl: 'sendsms.html',
})
export class SendsmsPage {
  SMS:any;
  constructor(public navCtrl: NavController, private fb: FormBuilder,public platform:Platform,private sms: SMS,public androidPermissions: AndroidPermissions, public navParams: NavParams) {
  
}

  ionViewWillEnter()
{

this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
  success => console.log('Permission granted'),
err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
);

this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
}

/* ReadListSMS()
{

this.platform.ready().then((readySource) => {

let filter = {
       box : 'inbox', // 'inbox' (default), 'sent', 'draft'
       indexFrom : 0, // start from index 0
       maxCount : 10, // count of SMS to return each time
            };

       if(SMS) SMS.listSMS({},filter, (ListSms)=>{

           console.log("Sms",ListSms);
          },

          Error=>{
          console.log('error list sms: ' + Error);
          });
     
    });
}*/

  myForm: FormGroup;

 

  ngOnInit() {
    // build the form model
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      quantity: this.fb.control(123)
    })
  }

  submit() {
    console.log("Reactive Form submitted: ", this.myForm);
  }
}
