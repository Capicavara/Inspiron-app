
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Facebook } from '@ionic-native/facebook';
import { JogosPage } from '../pages/jogos/jogos';
import { ArduinoPage } from '../pages/arduino/arduino';
import { WaifuPage } from '../pages/waifu/waifu';
import { RawgPage } from '../pages/rawg/rawg';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  mensagens: AngularFireList<any>;
  mensagem = "";
  usuario: any;
  historico: object;
  List: Observable<any[]>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public facebook: Facebook) {
    this.initializeApp();
    this.afAuth.authState.subscribe(usr =>{
      this.usuario = usr;
      this.mensagens = this.afDatabase.list('/mensagem', ref => ref.limitToLast(10));
      this.List = this.mensagens.valueChanges();
      if (this.usuario == null){
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Waifu', component: WaifuPage },
          { title: 'RAWG', component: RawgPage }
        ];
      }
      else{
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Jogos', component: JogosPage },
          { title: 'Waifu', component: WaifuPage },
          { title: 'Arduino', component: ArduinoPage },
          { title: 'RAWG', component: RawgPage }

        ];
      }
    })

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sair(){
    this.afAuth.auth.signOut();
    this.nav.setRoot(HomePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
