import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: ''
    };


    let firebaseConfig = {
      apiKey: "AIzaSyC9w9EMSf4sLuuWC_meLNzM-GQ1NHeSCNI",
      authDomain: "reactapp-2e4d7.firebaseapp.com",
      databaseURL: "https://reactapp-2e4d7.firebaseio.com",
      projectId: "reactapp-2e4d7",
      storageBucket: "reactapp-2e4d7.appspot.com",
      messagingSenderId: "836048674983",
      appId: "1:836048674983:web:1384e61fba790f4e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    /* Olheiro 
    firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });
    */

    firebase.database().ref('token').once('value').then((snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });

    firebase.database().ref('usuarios').child(1).on('value', (snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    });


  }

  render(){
    const { token, nome, idade } = this.state;
    return(
      <div>
        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>
      </div>
    );
  }
}