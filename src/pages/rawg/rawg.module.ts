import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RawgPage } from './rawg';

@NgModule({
  declarations: [
    RawgPage,
  ],
  imports: [
    IonicPageModule.forChild(RawgPage),
  ],
})
export class RawgPageModule {}
