import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { Produto } from '../../model/produto';
import { FormGroup,FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  listaDeProdutos : Produto[] = [];

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public menu : MenuController,
  public formBuilder : FormBuilder) {

    this.firestore.settings(this.settings);


  }

  ionViewDidLoad() {
    this.menu.enable(true);
    this.getList();
  }

  getList() {

    var ref = firebase.firestore().collection("produto");
    ref.get().then(query => {
        query.forEach(doc => {
            let p = new Produto();
            p.setDados(doc.data());
            p.id = doc.id;
            this.listaDeProdutos.push(p);
        });
    });

  }

  novoProduto(){
    this.navCtrl.push('NovoProdutoPage');
  }

  remove(obj : Produto){
    var ref = firebase.firestore().collection("produto");
    ref.doc(obj.id).delete()
      .then(()=>{
        this.listaDeProdutos = [];
        this.getList();
      }).catch(()=>{
        console.log('Erro ao atualizar');
      })
  }

  atualizar(obj : Produto){
    this.navCtrl.push('ProdutoVisualizaPage',{'produto' : obj})
  }

}
