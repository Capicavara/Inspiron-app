import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//imports

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook } from '@ionic-native/facebook'
import { AuthProvider } from '../providers/auth/auth';
import { JogosPage } from '../pages/jogos/jogos';
import { ArduinoPage } from '../pages/arduino/arduino';
import { WaifuPage } from '../pages/waifu/waifu';
import { Camera } from '@ionic-native/camera/';
import { FilePath } from '@ionic-native/file-path/';
import { File } from '@ionic-native/file/';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { RawgPage } from '../pages/rawg/rawg';
 
export const firebaseConfig = {
  apiKey: "AIzaSyCkZEeXCiCrfrVwjwuvPkBxCqPd50V6WZ0",
  authDomain: "inspiron-c6e2f.firebaseapp.com",
  databaseURL: "https://inspiron-c6e2f.firebaseio.com",
  projectId: "inspiron-c6e2f",
  storageBucket: "inspiron-c6e2f.appspot.com",
  messagingSenderId: "64839018389",
  appId: "1:64839018389:web:429d066259942bfe"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    JogosPage,
    ArduinoPage,
    WaifuPage,
    RawgPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //NG declarações
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    JogosPage,
    ArduinoPage,
    WaifuPage,
    RawgPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //Providers
    AngularFireDatabase,
    AngularFireAuthModule,
    AngularFireAuth,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    HttpClientModule,
    Camera,
    FilePath,
    File,
    FileTransfer,
    FileTransferObject
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
