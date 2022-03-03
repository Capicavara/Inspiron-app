import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Facebook } from '@ionic-native/facebook'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  @ViewChild(Content) content: Content;
  //Variáveis
  mensagens: AngularFireList<any>;
  mensagem = "";
  usuario: any;
  public static user;
  historico: object;
  List: Observable<any[]>;
  name: string;
  appcode: string = "test";
  data;
  nome;
  stats;
  arduino;


constructor(private afDatabase: AngularFireDatabase, public facebook: Facebook, public http: HttpClient) {
  this.arduino = this.afDatabase.list('/arduino/');
}

public led(bool: boolean){
  if (bool == true){
    this.arduino.update("inspiron",{ LED: "1"});
  }
  else{
    this.arduino.update("inspiron",{ LED: "0"});
  }
}

public sendPostRequest() {

  this.http.get('http://garrysmod.com.br/php/rambo/getUser.php?name='+this.name+'&appcode='+this.appcode).subscribe(data => {
    this.data = data;
  });
  this.http.get('http://garrysmod.com.br/php/rambo/getSmallUser.php?name='+this.name+'&appcode='+this.appcode).subscribe(data => {
    this.nome = data;
    console.log(this.nome);
  });

  this.http.get('http://garrysmod.com.br/php/rambo/getStats.php?name='+this.name+'&appcode='+this.appcode).subscribe(data => {
    this.stats = data;
  });

}
}
