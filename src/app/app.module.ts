import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core'            // @agm/core
import { AgmDirectionModule } from 'agm-direction'   // agm-direction
import { MediaCapture, } from '@ionic-native/media-capture';
import { SMS } from '@ionic-native/sms';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { edit } from '../pages/about/about';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InsertServiceProvider } from '../providers/insert-service/insert-service';
import { AndroidPermissions} from '@ionic-native/android-permissions';
import { SendsmsPage } from '../pages/Sendsms/Sendsms';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,edit,SendsmsPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyCnK4fuP_TslDXqacSH-OhbmoC9_6ZrGng',
    }),
    AgmDirectionModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,edit,SendsmsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,FileTransfer,File,Camera,Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InsertServiceProvider,MediaCapture,BarcodeScanner,AndroidFingerprintAuth,SMS,AndroidPermissions
  ]
})
export class AppModule {}
