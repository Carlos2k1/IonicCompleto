import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoLivroPage } from './novo-livro';

@NgModule({
  declarations: [
    NovoLivroPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoLivroPage),
  ],
})
export class NovoLivroPageModule {}
