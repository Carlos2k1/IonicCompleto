import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../model/produto';
import firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-produto-visualiza',
  templateUrl: 'produto-visualiza.html',
})
export class ProdutoVisualizaPage {

  formGroup : FormGroup;
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  produto = new Produto();

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public formBuilder : FormBuilder) {

    this.firestore.settings(this.settings);
      
    this.produto = this.navParams.get('produto');

    this.formGroup = this.formBuilder.group({
      nomeProduto : [this.produto.nomeProduto],
      preco : [this.produto.preco],
      categoria : [this.produto.categoria],
      descricao : [this.produto.descricao],
    })

  }

  atualizar(){
    let ref = this.firestore.collection('produto')
    ref.doc(this.produto.id).set(this.formGroup.value)
      .then(() =>{
        console.log('Atualizado com sucesso');
        this.navCtrl.push('ProdutoPage')
      }).catch(()=>{
        console.log('Erro ao Atualizar');
      })
}

}
