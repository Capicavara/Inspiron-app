import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaifuPage } from './waifu';

@NgModule({
  declarations: [
    WaifuPage,
  ],
  imports: [
    IonicPageModule.forChild(WaifuPage),
  ],
})
export class WaifuPageModule {}
