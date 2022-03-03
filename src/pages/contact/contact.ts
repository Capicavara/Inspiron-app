
import { Component, ViewChild } from '@angular/core';
import { NavController, Content, LoadingController } from 'ionic-angular';
import { HomePage } from './../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild(Content) content: Content;
  data;
  stats;
  nick;
  level;
  kill;
  death;
  KD;
  loading: any;
  nomeusuario;

  constructor(public navCtrl: NavController,public provider: AuthProvider,public loadingController:LoadingController) {

    
  }

  ionViewDidLoad() {
    this.nomeusuario = HomePage.nameUser;
    if (this.nomeusuario = "Lucas Mota"){
    this.provider.name = "Chupa_pinto";
    }
    console.log(HomePage.user);
    this.provider.sendPostRequest()
      this.loading =  this.loadingController.create({ content: "Carregando" });
      this.loading.present();
  
      setInterval(() => {

      this.loading.dismissAll();
      this.request();
      }, 6000);
  }

  public request(){
    
    this.data = this.provider.data.players;
    this.stats = this.provider.stats.players;
    // console.log(this.data);
    const dados = Object.keys(this.data).map(i => this.data[i]);
    const stats = Object.keys(this.stats).map(i => this.stats[i]);
    this.nick = dados[0].nickname;
    this.level = dados[0].level;
    this.kill = stats[0].casualpvp_kills;
    this.death = stats[0].casualpvp_death;
    this.KD = this.kill/this.death;
    this.KD = this.KD.toFixed(2);
  }

}
