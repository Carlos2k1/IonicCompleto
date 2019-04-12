import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import firebase from 'firebase';
import { Livro } from '../../model/livro';

@IonicPage()
@Component({
  selector: 'page-novo-livro',
  templateUrl: 'novo-livro.html',
})
export class NovoLivroPage {

  formGroup : FormGroup;

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  livro = new Livro();

  imagem : string = "";

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public formBuilder : FormBuilder) {

    this.firestore.settings(this.settings);

    this.formGroup = this.formBuilder.group({
      titulo : [''],
      autor : [''],
      preco : [''],
      resumo : [''],

  })
}

cadastrarLivro(){
  let ref = this.firestore.collection('livro')
  ref.add(this.formGroup.value)
    .then(() =>{
      console.log('Cadastrado com sucesso');
      this.navCtrl.setRoot('LivroPage');
    }).catch(()=>{
      console.log('Erro ao cadastrar');
    })
}

enviaArquivo(event) {

  let imagem = event.srcElement.files[0];
  console.log(imagem.name);
  let ref = firebase.storage().ref().child(`livro/${this.livro.id}.jpg`);

  ref.put(imagem).then(()=>{
    console.log("Funfou");
    
  this.downloadFoto();
  }).catch(()=>{
    console.log("N Funfou");
  })
}

downloadFoto(){
  let ref = firebase.storage().ref().child(`livro/${this.livro.id}.jpg`);

  ref.getDownloadURL().then(url => {
    console.log(url);
    this.imagem = url;
  })
}

}

