import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Livro } from '../../model/livro';
import firebase from 'firebase';
import { FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-livro',
  templateUrl: 'livro.html',
})
export class LivroPage {

  listaDeLivros: Livro[] = [];

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.firestore.settings(this.settings);

  }

  ionViewDidLoad() {
    this.getList();
  }

  getList() {

    var ref = firebase.firestore().collection("livro");
    ref.get().then(query => {
      query.forEach(doc => {
        let l = new Livro();
        l.setDados(doc.data());
        l.id = doc.id;
        this.listaDeLivros.push(l);
      });
    });
  }

  novoLivro(){
    this.navCtrl.push('NovoLivroPage');
  }

  remover(obj : Livro){
    var ref = firebase.firestore().collection("livro");
    ref.doc(obj.id).delete()
      .then(()=>{
        this.listaDeLivros = [];
        this.getList();
      }).catch(()=>{
        console.log('Erro ao atualizar');
      })
  }

  atualizar(obj : Livro){
    this.navCtrl.push('AtualizaLivroPage',{'livro' : obj})
  }
}
