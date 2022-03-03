import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the RawgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rawg',
  templateUrl: 'rawg.html',
})
export class RawgPage {
  @ViewChild(Slides) slides: Slides;
  data;
  resultado;
  quantidade;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient

    ) {
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  post(pesquisa){
    this.http.get('https://api.rawg.io/api/games?page_size='+ this.quantidade + '&search=' + pesquisa).subscribe(data => {
      this.data = data;
      this.resultado = this.data;
      console.log(this.resultado);
      console.log(this.resultado.results[0].name)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RawgPage');
  }

}
