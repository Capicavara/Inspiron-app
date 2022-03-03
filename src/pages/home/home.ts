import { Component, ViewChild } from '@angular/core';
import { NavController, Content, LoadingController, InfiniteScroll } from 'ionic-angular';
//imports
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { Facebook } from '@ionic-native/facebook'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
      //Variáveis
      mensagens: AngularFireList<any>;
      mensagem = "";
      usuario: any;
      public static user;
      historico: object;
      List: Observable<any[]>;
      ListTotal;
      loading: any;
      public static men;
      Total;
      Atual;
      public static nameUser;


  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public facebook: Facebook, public loadingController:LoadingController) {

  }

  ionViewDidLoad() {
    
    this.getMessage(10);
    console.log("Atual: " + this.Atual);

  }

  getMessage(num){
    this.afAuth.authState.subscribe(usr =>{
      
      this.usuario = usr;
      HomePage.user = usr;   
      this.mensagens = this.afDatabase.list('/mensagem', ref => ref.limitToLast(num));
      this.List = this.mensagens.valueChanges();
      console.log(JSON.stringify(this.List))
      this.ListTotal = this.afDatabase.database.ref('/mensagem').on("value", function(snapshot) {
        HomePage.men = snapshot.numChildren();
      });
      this.Total = HomePage.men;
      this.Atual = num;
      console.log(num);
      if (usr != null){
        HomePage.nameUser = this.usuario.displayName;
      }
      
  })
  }

  loginWithFacebook(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
        this.load(2000, "Logando");
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            //console.log("Firebase success: " + JSON.stringify(success));
            this.usuario = success; 
                  
          });

      }).catch((error) => { console.log(error) });
  }

  load(tempo, menssagem: string){
    this.loading = this.loadingController.create({ content: menssagem });
    this.loading.present();

    setInterval(() => {
    this.loading.dismissAll();
    }, tempo);
  }


  autenticar(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    .then(() => {
      this.afAuth.auth.getRedirectResult().then((result) => {
        this.usuario = result.user;
        alert(JSON.stringify(result));
      })
    })
    
  }

  sair(){
    this.afAuth.auth.signOut();
  }

  teste(){
    console.log("Teste");
  }
  
  aumentar(event){
    console.log('Begin async operation');
    this.load(2000, "Carregando");
    this.mensagens = this.afDatabase.list('/mensagem', ref => ref.limitToLast(this.Atual += 10));
    this.List = this.mensagens.valueChanges();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 2000);

  }

  

  enviarMensagem(msg : string){
    // console.log(msg);
    if (this.mensagem != ""){
      this.mensagens.push({ mensagem: msg, usuario: this.usuario.displayName })
      this.scrollToBottom();
    }
      this.mensagem = "";
      console.log(HomePage.men)
      
  }

  scrollToBottom(){
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);
}

}
