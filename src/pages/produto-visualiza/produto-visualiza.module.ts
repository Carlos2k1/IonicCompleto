import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoVisualizaPage } from './produto-visualiza';

@NgModule({
  declarations: [
    ProdutoVisualizaPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoVisualizaPage),
  ],
})
export class ProdutoVisualizaPageModule {}
